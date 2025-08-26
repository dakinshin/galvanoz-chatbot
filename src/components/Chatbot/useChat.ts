import { useEffect, useState } from 'react'
import { BotMessage, Response, ResponseStatus, StepId } from '@/lib/types'
import { nextIdGenerator } from '@/lib/nextId'
import { graph } from '@/lib/graph'

class ChatbotException extends Error {}
class ChatbotGraphItemNotFound extends ChatbotException {}
class ChatbotUnexpectedResponse extends ChatbotException {}

const THINKING_TIMEOUT = 1000

const nextMessageId = nextIdGenerator()

export const useChat = () => {
  const [responses, setResponses] = useState<Response[]>([])
  const [thinking, setThinking] = useState<boolean>(false)
  const [messages, setMessages] = useState<BotMessage[]>([])

  useEffect(() => {
    const getGraphItem = (stepId: StepId, referencedMessageId?: StepId) => {
      const nextMessage = graph.find(item => item.step === stepId)
      if (nextMessage === undefined) {
        const location = referencedMessageId ? `mentioned in destination of item ${referencedMessageId} ` : ''
        throw new ChatbotGraphItemNotFound(`Graph item ${stepId} ${location}is not found in the conversation graph`)
      }
      return nextMessage
    }

    const addMessage = (allMessages: BotMessage[], message: BotMessage) => {
      setThinking(true)
      setTimeout(
        () => {
          const newMessage = { ...message, id: nextMessageId.next().value }
          const newAllMessages = [...allMessages, newMessage]
          console.log('Adding new message', newMessage)
          setMessages(newAllMessages)
          setThinking(false)

          // Если тип сообщения не prompt а message - сразу переходим к следующей команде
          if (message.type === 'message' && message.destinations && message.destinations?.length > 0) {
            console.log('Self-repeating addMessage')
            const nextStep = message.destinations![0].nextStep

            const nextMessage = getGraphItem(nextStep, message.step)
            addMessage(newAllMessages, nextMessage)
          }
        },
        THINKING_TIMEOUT
      )
    }

    const lastResponse = responses.length > 0 ? responses[responses.length - 1] : undefined

    console.log('lastResponse', lastResponse)

    if (lastResponse) {
      if (messages.length > 0 && messages[messages.length - 1].step === lastResponse.step) {
        console.log('useChat: looking for new message')
        const step = getGraphItem(lastResponse.step)

        const destination = step?.destinations?.find(item => item.formula(lastResponse.response))
        if (destination === undefined) {
          throw new ChatbotUnexpectedResponse(`Response ${lastResponse.response} has no acceptable next steps`)
        }

        const newMessage = getGraphItem(destination?.nextStep, lastResponse.response)

        addMessage(messages, newMessage)
      } else {
        console.log('useChat: not looking for new message', messages.length, messages[messages.length - 1].step, lastResponse.step)
      }
    } else if (messages.length === 0) {
      addMessage(messages, graph[0])
    }
  }, [responses, messages])

  useEffect(() => {
    const promoteResponseStatus = (stepId: StepId) => {
      const index = responses.findIndex(item => item.step === stepId)
      const response = responses[index]

      let newStatus: ResponseStatus | undefined = undefined
      switch (response.status) {
        case 'sent':
          newStatus = 'delivered'
          break

        case 'delivered':
          newStatus = 'seen'
          break
      }

      if (newStatus) {
        setTimeout(
          () => {
            setResponses([
              ...responses.slice(0, index),
              {
                ...response,
                status: newStatus
              },
              ...responses.slice(index + 1)])
          },
          500
        )
      }
    }

    responses
      .filter(item => item.status !== 'seen')
      .forEach(item => promoteResponseStatus(item.step))
  }, [responses])

  return { thinking, messages, responses, setResponses }
}
