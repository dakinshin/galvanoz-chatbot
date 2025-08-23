import React from 'react'
import { Avatar, Flex, Spin } from 'antd'
import Image from 'next/image'
import bot from '@/assets/chatbot.png'

export default function ThinkingHint() {
  return (
    <Flex gap={50}>
      <div className="avatar-holder">
        <Avatar icon={<Image src={bot} alt="Bot icon"/>} style={{ backgroundColor: 'white' }} size="large"/>
      </div>

      <div style={{ paddingTop: 10 }}>
        <Spin/>
      </div>
    </Flex>
  )
}
