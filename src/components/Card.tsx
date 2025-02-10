import { ReactNode } from 'react'

const CardBase = (children: ReactNode) => {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  )
}