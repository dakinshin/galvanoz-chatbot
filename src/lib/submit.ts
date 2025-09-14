'use server'

import { graph } from './graph'
import { Response } from './types'
import prisma from './prisma'

class UnrecognizedRecommendation extends Error {}

export async function submit(responses: Response[]) {
  const answers = responses.map(({ step, response }) => ({ question: step, answer: response }))
  console.log('Submitting responses and generating report...', answers)

  const lastAnswer = answers[answers.length - 1]

  const recommendation = graph.find(item => item.step === lastAnswer.question)?.destinations?.find(item => item.formula(lastAnswer.answer))?.nextStep
  
  console.log('Recommendation', recommendation)

  switch (recommendation) {
    case undefined:
      throw new UnrecognizedRecommendation(`Failed to get recommendation message basing on last question "${lastAnswer.question}" answer "${lastAnswer.answer}"`)

    case 'recommendSurgeonAdvise':
      break
  }

  const anamnesis = await prisma.anamnesis.create({
    data: {
      uid: 0,
      responses: JSON.stringify(answers),
      recommendation
    }
  })

  console.log('anamnesis id', anamnesis.id)

  return anamnesis
}

export async function load(id: number) {
  return await prisma.anamnesis.findFirstOrThrow({
    where: {
      id
    }
  })
}