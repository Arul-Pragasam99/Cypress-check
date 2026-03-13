import React from 'react'

export interface StatCardProps {
  title: string
  value: string | number
  delta?: string
  icon?: React.ReactNode
}

export default function StatCard({ title, value, delta, icon }: StatCardProps) {
  return (
    <div className="statCard" data-testid={`statcard-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="statCard__header">
        <div className="statCard__title">{title}</div>
        {icon ? <div className="statCard__icon">{icon}</div> : null}
      </div>
      <div className="statCard__value">{value}</div>
      {delta ? <div className="statCard__delta">{delta}</div> : null}
    </div>
  )
}
