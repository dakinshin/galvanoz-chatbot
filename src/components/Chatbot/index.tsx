'use client'

import React, { useState } from 'react'
import { Response } from '../../lib/types'
import Message from '../BotMessage'
import { useChat } from './useChat'
import { Space } from 'antd'
import ThinkingHint from '../ThinkingHint'
import './styles.scss'

export default function Chatbot() {
  const { thinking, messages, responses, setResponses } = useChat()

  const handleResponse = (value: Response) => setResponses([...responses, value])
  
  return (
    <div className="chatbot">
      <Space size="large" direction="vertical" className="thread">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            response={responses.find(item => item.step === message.id)}
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
