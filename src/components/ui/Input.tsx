"use client"
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: Props) {
  return <input className="input" {...props} />
}

