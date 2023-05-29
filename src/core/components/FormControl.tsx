import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  label?: string
  message?: string
}

export function FormControl({ children, label, message }: Props) {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      {children}
      {message && (
        <label className="label">
          <span className="label-text-alt">{message}</span>
        </label>
      )}
    </div>
  )
}
