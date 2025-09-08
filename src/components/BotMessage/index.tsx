import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BotMessage, Response, Option as OptionType } from '@/lib/types'
import { Avatar, Button, Flex, Form, Input, InputRef, Space } from 'antd'
import Option from './Option'
import Image from 'next/image'
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { graph } from '@/lib/graph'
import { nextIdGenerator } from '@/lib/nextId'
import { LiaCheckSolid } from 'react-icons/lia'
import { LuCheckCheck } from 'react-icons/lu'
import bot from '@/assets/chatbot.png'
import './styles.scss'
import TextArea from 'antd/es/input/TextArea'

type MessageProps = {
  message: BotMessage
  response: Response | undefined
  onResponse: (value: Response) => void
}

const nextResponseId = nextIdGenerator()

export default function Message(props: MessageProps) {
  const [rawInput, setRawInput] = useState<string>('')
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  const responseText = useMemo(
    () => {
      if (props.response === undefined) {
        return undefined
      }

      const record = graph.find(item => item.step === props.response?.step)

      if (record?.allowInput) {
        return props.response.response
      }

      return record?.options?.find(item => item.id === props.response?.response)?.text
    },
    [props.response]
  )

  const sendResponse = (response: string) => {
    props.onResponse({
      id: nextResponseId.next().value,
      messageId: props.message.id!,
      step: props.message.step,
      response,
      status: 'sent'
    })
  }

  const handleOptionSelect = (option: OptionType) => sendResponse(option.id)
  const handleRawSend = () => sendResponse(rawInput)

  const handleRawInputKey = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleRawSend()
    }
  }

  return (
    <div className={`bot-message ${props.message.final ? 'final' : ''} ${props.message.accent ? 'accent' : ''}`}>
      <Flex className="top-container">
        <div className="avatar-holder">
          <Avatar icon={<Image src={bot} alt="Bot icon"/>} style={{ backgroundColor: 'white' }} size="large"/>
        </div>

        <div className="content">
          <div className="prompt">
            {props.message.prompt}

            {props.message.payload && (
              <div className="payload">
                {typeof props.message.payload === 'string'
                  ? <>{props.message.payload}</>
                  : props.message.payload}
              </div>
            )}
          </div>

          {props.message.type === 'prompt' && (
            <div className="input">
              <Flex justify="end" className="input-container">
                <div className="controls">
                  {props.response === undefined && (
                    <>
                      {props.message.options && (
                        <Space className="options" wrap style={{ justifyContent: 'flex-end' }}>
                          {!props.message.allowInput && (
                            <div className="prompt-hint">Выберите вариант ответа:</div>
                          )}
                          
                          <Space>
                            {props.message.options?.map(option => (
                              <Option
                                option={option} key={option.id}
                                onSelect={() => handleOptionSelect(option)}
                              />
                            ))}
                          </Space>
                        </Space>
                      )}
                      {props.message.allowInput && (
                        <Space>
                          <Form.Item noStyle>
                            {props.message.allowInput === 'oneliner' && (
                              <Input
                                value={rawInput}
                                ref={inputRef}
                                placeholder="Введите ответ"
                                size="large"
                                onChange={e => setRawInput(e.target.value)}
                                onKeyDown={e => handleRawInputKey(e)}
                              />
                            )}
                            {props.message.allowInput === 'long text' && (
                              <TextArea
                                value={rawInput}
                                ref={inputRef}
                                placeholder="Введите ответ"
                                size="large"
                                onChange={e => setRawInput(e.target.value)}
                              />
                            )}
                          </Form.Item>

                          <Button
                            onClick={handleRawSend}
                            type="primary"
                            size="large"
                            disabled={rawInput.length === 0}
                          ><SendOutlined /></Button>
                        </Space>
                      )}
                    </>
                  )}
                  {props.response && (
                    <div className="response">
                      {responseText}
                      <div className="status">
                        {props.response.status === 'sent' && (<LiaCheckSolid color="gray"/>)}
                        {props.response.status === 'delivered' && (<LuCheckCheck color="gray"/>)}
                        {props.response.status === 'seen' && (<LuCheckCheck color="#6b75df"/>)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="avatar-holder user-avatar">
                  <Avatar icon={<UserOutlined/>} size="large" style={{ backgroundColor: 'gray' }}/>
                </div>
              </Flex>
            </div>
          )}
        </div>
      </Flex>
    </div>
  )
}
