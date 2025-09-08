import { ReactNode } from "react"

type OptionId = string

export type Option = {
  id: string
  text: string
}

export type StepId = string
type Input = string

type Destination = {
  formula: (input: Input) => boolean
  nextStep: StepId
}

export type BotMessage = {
  id?: number
  step: StepId
  type: 'prompt' | 'message'
  prompt: string
  payload?: string | ReactNode
  accent?: boolean
  options?: Option[]
  allowInput?: false | 'oneliner' | 'long text'
  destinations?: Destination[]
  final?: true
  answer?: string
}

export type ResponseStatus = 'sent' | 'delivered' | 'seen'

export type Response = {
  id: number
  messageId: number
  step: StepId
  response: OptionId
  status: ResponseStatus
}

export type Hook = {
  name: string
  cb: (message: BotMessage, messages: BotMessage[], responses: Response[]) => Promise<string | ReactNode | undefined>
}
