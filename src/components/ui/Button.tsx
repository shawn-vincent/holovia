"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ variant = 'primary', className = '', ...rest }: Props) {
  return <button className={`button ${variant} ${className}`.trim()} {...rest} />
}

