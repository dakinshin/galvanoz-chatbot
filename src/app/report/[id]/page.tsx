'use client'

import { generateReport3 } from "@/components/Chatbot/utils"
import { load } from "@/lib/submit"
import { useQuery } from '@tanstack/react-query'
import { Flex, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'

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
    if (retreivedUrl && url === undefined) {
      console.log('retreivedUrl', retreivedUrl)
      setUrl(retreivedUrl)

      GlobalWorkerOptions.workerSrc =
        '/chatbot/workers/pdf.worker.mjs';

      const loadingTask = getDocument(retreivedUrl)

      loadingTask.promise.then(pdf => {
        pdf.getPage(1)
        .then(page => {
          const scale = 1.5
          const viewport = page.getViewport({ scale })
          const outputScale = window.devicePixelRatio || 1

          const canvas = document.getElementById('the-canvas') as HTMLCanvasElement

          if (canvas) {
            const context = canvas!.getContext("2d")

            canvas.width = Math.floor(viewport.width * outputScale)
            canvas.height = Math.floor(viewport.height * outputScale)
            canvas.style.width = Math.floor(viewport.width) + "px"
            canvas.style.height = Math.floor(viewport.height) + "px"

            const transform = outputScale !== 1
              ? [outputScale, 0, 0, outputScale, 0, 0]
              : null;

            const renderContext = {
              canvas,
              canvasContext: context == null ? undefined : context,
              transform: transform === null ? undefined : transform,
              viewport,
            }

            page.render(renderContext)
          }
        })
      })
    }
  }, [retreivedUrl, url])

  return (
    <canvas id="the-canvas"></canvas>
  )

  if (url === undefined) {
    return (
      <Flex align="center" justify="space-around" style={{ width: '100vw', height: '100vh' }}>
        <Spin size="large"/>
      </Flex>
    )
  }

  return (
    <Space direction="vertical">
      <>{url}</>
      <iframe src={url} style={{ width: '100vw', height: '100vh' }} allow-same-origin></iframe>
    </Space>
  )
}