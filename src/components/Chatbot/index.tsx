'use client'

import React, { useEffect, useRef } from 'react'
import { BotMessage, Hook, Response } from '../../lib/types'
import Message from '../BotMessage'
import { useChat } from './useChat'
import { Button, Flex, Space } from 'antd'
import ThinkingHint from '../ThinkingHint'
import { FaCloudDownloadAlt, FaFilePdf } from 'react-icons/fa'
import { submit } from '@/lib/submit'
import './styles.scss'
import { generateReport } from './utils'

export default function Chatbot() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = (anamnesis: any) => {
    console.log('anamnesis', anamnesis)
    generateReport(anamnesis.id, anamnesis.created, anamnesis.recommendation, JSON.parse(anamnesis.responses))
  }

  const addMessageHook: Hook = {
    name: 'before add message',
    cb: async (message: BotMessage, _messages: BotMessage[], responses: Response[]) => {
      console.log('before add message', message.step)
      if (message.step === 'reportDownload') {
        console.log('Building report file...')

        const anamnesis = await submit(responses)

        return (
          <Button type="text" onClick={() => handleDownload(anamnesis)} style={{ color: 'white' }}>
            <Flex gap={5} align="center">
              <FaCloudDownloadAlt size={20}/>
              <>ЗАКЛЮЧЕНИЕ</>
              <div className="icon-wrapper">
                <FaFilePdf color="#f40f02" size={20}/>
              </div>
            </Flex>
          </Button>
        )
      }
      return undefined
    }
  }

  const { thinking, messages, responses, setResponses } = useChat([addMessageHook])
  const ref = useRef<HTMLDivElement>(null)

  const handleResponse = (value: Response) => setResponses([...responses, value])

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, responses, thinking])
  
  return (
    <div className="chatbot" ref={ref}>
      <Space size="large" direction="vertical" className="thread">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            response={responses.find(item => item.messageId === message.id)}
            onResponse={handleResponse}
          />
        ))}

        {thinking && (
          <ThinkingHint/>
        )}
      </Space>
    </div>
  )
}
