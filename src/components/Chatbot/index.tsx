'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Flex, Space } from 'antd'
import { FaCloudDownloadAlt, FaFilePdf } from 'react-icons/fa'
import { BotMessage, Hook, Response } from '../../lib/types'
import ThinkingHint from '../ThinkingHint'
import { submit } from '@/lib/submit'
import { useChat } from './useChat'
import Message from '../BotMessage'
// import { generateReport } from './utils'
import './styles.scss'

export default function Chatbot() {
  // const handleDownload = (anamnesis: any) => {
  //   console.log('anamnesis', anamnesis)
  //   generateReport(anamnesis.id, anamnesis.created, anamnesis.recommendation, JSON.parse(anamnesis.responses))
  // }

  const addMessageHook: Hook = {
    name: 'before add message',
    cb: async (message: BotMessage, _messages: BotMessage[], responses: Response[]) => {
      console.log('before add message', message.step)
      if (message.step === 'reportDownload') {
        console.log('Building report file...')

        const anamnesis = await submit(responses)

        return (
          <Link href={`/report/${anamnesis.id}`} target="_blank">
            <Flex gap={5} align="center">
              <FaCloudDownloadAlt size={20}/>
              <>ЗАКЛЮЧЕНИЕ</>
              <div className="icon-wrapper">
                <FaFilePdf color="#f40f02" size={20}/>
              </div>
            </Flex>
          </Link>
          // <Button type="text" onClick={() => handleDownload(anamnesis)} style={{ color: 'white' }}>
          //   <Flex gap={5} align="center">
          //     <FaCloudDownloadAlt size={20}/>
          //     <>ЗАКЛЮЧЕНИЕ</>
          //     <div className="icon-wrapper">
          //       <FaFilePdf color="#f40f02" size={20}/>
          //     </div>
          //   </Flex>
          // </Button>
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
