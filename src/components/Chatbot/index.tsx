'use client'

import React, { useEffect, useRef } from 'react'
import { Response } from '../../lib/types'
import Message from '../BotMessage'
import { useChat } from './useChat'
import { Space } from 'antd'
import ThinkingHint from '../ThinkingHint'
import './styles.scss'

export default function Chatbot() {
  const { thinking, messages, responses, setResponses } = useChat()
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
