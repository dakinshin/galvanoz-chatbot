'use client'

import { generateReport3 } from "@/components/Chatbot/utils"
import { load } from "@/lib/submit"
import { useQuery } from '@tanstack/react-query'
import { Flex, Spin } from "antd"
import { useEffect, useState } from "react"

export default function Page(params: { id: number }) {
  const [url, setUrl] = useState<string>()

  const { data: retreivedUrl } = useQuery({
    queryKey: ['report', params.id],
    queryFn: () => (
      new Promise<string>(resolve => {
        load(params.id)
          .then(anamnesis => {
            generateReport3(
              anamnesis.id,
              anamnesis.created,
              anamnesis.recommendation,
              JSON.parse(anamnesis.responses)
            )
            .then(url => resolve(url))
          })
      })
    )
  })

  useEffect(() => {
    if (retreivedUrl) {
      setUrl(retreivedUrl)
    }
  }, [retreivedUrl])

  if (url === undefined) {
    return (
      <Flex align="center" justify="space-around" style={{ width: '100vw', height: '100vh' }}>
        <Spin size="large"/>
      </Flex>
    )
  }

  return (
    <iframe src={url} style={{ width: '100vw', height: '100vh' }}></iframe>
  )
}