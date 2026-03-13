export interface ActivityRow {
  id: string
  user: string
  action: string
  time: string
  status: 'success' | 'warning' | 'error'
}

export interface RecentActivityProps {
  rows: ActivityRow[]
  filter?: string
  onRowClick?: (row: ActivityRow) => void
}

const statusLabel: Record<ActivityRow['status'], string> = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
}

export default function RecentActivity({ rows, filter, onRowClick }: RecentActivityProps) {
  const normalizedFilter = (filter ?? '').trim().toLowerCase()
  const filteredRows = normalizedFilter
    ? rows.filter((row) =>
        [row.user, row.action, row.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedFilter),
      )
    : rows

  return (
    <div className="activity" data-testid="recent-activity">
      <div className="activity__header">
        <h2>Recent activity</h2>
      </div>
      <div className="activity__tableWrapper">
        <table className="activity__table" data-testid="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                data-testid={`activity-row-${row.id}`}
                onClick={() => onRowClick?.(row)}
              >
                <td>{row.user}</td>
                <td>{row.action}</td>
                <td>{row.time}</td>
                <td>
                  <span
                    className={`activity__status activity__status--${row.status}`}
                    data-testid={`activity-status-${row.id}`}
                  >
                    {statusLabel[row.status]}
                  </span>
                </td>
              </tr>
            ))}
            {filteredRows.length === 0 ? (
              <tr data-testid="activity-empty">
                <td colSpan={4} style={{ textAlign: 'center', padding: '18px 0' }}>
                  No matching activity.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
