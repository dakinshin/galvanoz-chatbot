import { Option as OptionType } from '@/lib/types'
import { Button } from 'antd'
import React from 'react'

type OptionProps = {
  option: OptionType
  onSelect: () => void
}

export default function Option(props: OptionProps) {
  return (
    <div className="option">
      <Button size="large" onClick={props.onSelect}>{props.option.text}</Button>
    </div>
  )
}
