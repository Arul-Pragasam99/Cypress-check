import { useMemo, useState } from 'react'
import StatCard from './StatCard'
import RecentActivity from './RecentActivity'
import type { ActivityRow } from './RecentActivity'
import './Dashboard.css'

const stats = [
  { title: 'Active users', value: 4238, delta: '+4.7%', icon: '👥' },
  { title: 'Revenue', value: '$18.2K', delta: '+8.1%', icon: '💰' },
  { title: 'New signups', value: 124, delta: '+1.9%', icon: '🆕' },
  { title: 'Errors', value: 3, delta: '-14%', icon: '🐞' },
]

const initialActivityData: ActivityRow[] = [
  {
    id: 'a1',
    user: 'melanie@glow.com',
    action: 'Updated billing info',
    time: '3m ago',
    status: 'success',
  },
  {
    id: 'a2',
    user: 'rmartin@acme.co',
    action: 'Failed login attempt',
    time: '12m ago',
    status: 'warning',
  },
  {
    id: 'a3',
    user: 'support@hee.app',
    action: 'Opened new ticket',
    time: '30m ago',
    status: 'success',
  },
  {
    id: 'a4',
    user: 'team@rocket.io',
    action: 'Deployment completed',
    time: '1h ago',
    status: 'success',
  },
  {
    id: 'a5',
    user: 'ops@lonely.dev',
    action: 'Error report submitted',
    time: '2h ago',
    status: 'error',
  },
]

const sparklineData = [12, 22, 27, 34, 41, 32, 49, 62, 54, 48, 60, 68]

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Dashboard() {
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [activityRows, setActivityRows] = useState<ActivityRow[]>(initialActivityData)
  const [filterText, setFilterText] = useState('')

  const sparkline = useMemo(() => {
    const max = Math.max(...sparklineData)
    return sparklineData.map((value, idx) => ({
      value,
      height: (value / max) * 100,
      key: `bar-${idx}`,
    }))
  }, [])

  const handleAddActivity = () => {
    const id = `a${activityRows.length + 1}`
    setActivityRows((prev) => [
      {
        id,
        user: 'qa@cypress.test',
        action: 'Triggered Cypress test',
        time: 'just now',
        status: 'success',
      },
      ...prev,
    ])
  }

  const handleRowClick = (row: ActivityRow) => {
    // used by Cypress to assert row click behavior
    // no-op in this demo
    console.log('clicked row', row.id)
  }

  return (
    <main className="dashboard" role="main" data-testid="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Test Dashboard</h1>
          <p className="dashboard__subtitle">
            A simple React dashboard for experimentation and quick UI checks.
          </p>
        </div>
        <div className="dashboard__meta">
          <div className="dashboard__metaItem">
            <span className="dashboard__metaLabel">Last refreshed</span>
            <span className="dashboard__metaValue" data-testid="last-refreshed">
              {formatDate(lastRefreshed)}
            </span>
          </div>
          <button
            className="dashboard__refresh"
            type="button"
            data-testid="refresh-button"
            onClick={() => setLastRefreshed(new Date())}
          >
            Refresh
          </button>
        </div>
      </header>

      <section className="dashboard__stats" aria-label="Summary statistics">
        {stats.map((datum) => (
          <StatCard
            key={datum.title}
            title={datum.title}
            value={datum.value}
            delta={datum.delta}
            icon={datum.icon}
            data-testid={`statcard-${datum.title.replace(/\s+/g, '-').toLowerCase()}`}
          />
        ))}
      </section>

      <section className="dashboard__content">
        <div className="dashboard__chart">
          <div className="dashboard__chartHeader">
            <h2>Active sessions</h2>
            <p className="dashboard__chartSub">
              Session counts for the past 12 hours
            </p>
          </div>
          <div className="sparkline" role="img" aria-label="Sparkline chart">
            {sparkline.map((bar) => (
              <div
                key={bar.key}
                className="sparkline__bar"
                style={{ height: `${bar.height}%` }}
                title={`${bar.value} sessions`}
                data-testid={`sparkline-bar-${bar.key}`}
              />
            ))}
          </div>
        </div>

        <div className="dashboard__activityPanel">
          <div className="dashboard__activityToolbar">
            <label htmlFor="activity-filter" className="dashboard__filterLabel">
              Filter
            </label>
            <input
              id="activity-filter"
              className="dashboard__filterInput"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search user, action, status"
              data-testid="activity-filter"
            />
            <button
              className="dashboard__actionButton"
              type="button"
              onClick={handleAddActivity}
              data-testid="add-activity"
            >
              Add activity
            </button>
          </div>
          <RecentActivity
            rows={activityRows}
            filter={filterText}
            onRowClick={handleRowClick}
          />
        </div>
      </section>
    </main>
  )
}
