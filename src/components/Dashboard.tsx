import { useState } from 'react'
import './Dashboard.css'

interface FormEntry {
  id: string
  name: string
  email: string
  age: number
  birthdate: string
  amount: number
  imageName: string
}

interface FormErrors {
  name?: string
  email?: string
  age?: string
  birthdate?: string
  amount?: string
  image?: string
}

function formatNumber(value: number | '') {
  return value === '' ? '' : value.toString()
}

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '' as number | '',
    birthdate: '',
    amount: '' as number | '',
    image: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissions, setSubmissions] = useState<FormEntry[]>([])

  const validate = () => {
    const next: FormErrors = {}

    if (!formData.name.trim()) next.name = 'Name is required.'

    if (!formData.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Email must be a valid address.'
    }

    if (formData.age === '' || Number.isNaN(formData.age)) {
      next.age = 'Age is required and must be a number.'
    } else if (formData.age <= 0) {
      next.age = 'Age must be greater than 0.'
    }

    if (!formData.birthdate) {
      next.birthdate = 'Date of birth is required.'
    }

    if (formData.amount === '' || Number.isNaN(formData.amount)) {
      next.amount = 'Amount is required and must be a number.'
    } else if (formData.amount < 0) {
      next.amount = 'Amount must be 0 or higher.'
    }

    if (!formData.image) {
      next.image = 'An image is required.'
    } else if (!formData.image.type.startsWith('image/')) {
      next.image = 'File must be an image.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!validate()) return

    const entry: FormEntry = {
      id: `entry-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: formData.age as number,
      birthdate: formData.birthdate,
      amount: formData.amount as number,
      imageName: formData.image?.name ?? 'unknown',
    }

    setSubmissions((prev) => [entry, ...prev])

    setFormData({
      name: '',
      email: '',
      age: '',
      birthdate: '',
      amount: '',
      image: null,
    })

    setImagePreview(null)
    setErrors({})
  }

  return (
    <main className="dashboard" role="main" data-testid="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Data Entry Form</h1>
          <p className="dashboard__subtitle">
            Enter values in the correct type and submit to see them recorded below.
          </p>
        </div>
      </header>

      <section className="dashboard__form" aria-label="Data entry form">
        <form onSubmit={handleSubmit} data-testid="data-entry-form" noValidate>
          <div className="dashboard__formRow">
            <label htmlFor="name" className="dashboard__formLabel">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="dashboard__formInput"
              data-testid="field-name"
            />
            {errors.name ? (
              <p className="dashboard__formError" data-testid="error-name">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="dashboard__formRow">
            <label htmlFor="email" className="dashboard__formLabel">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="dashboard__formInput"
              data-testid="field-email"
            />
            {errors.email ? (
              <p className="dashboard__formError" data-testid="error-email">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="dashboard__formRow">
            <label htmlFor="age" className="dashboard__formLabel">
              Age <span aria-hidden="true">*</span>
            </label>
            <input
              id="age"
              type="number"
              value={formatNumber(formData.age)}
              min={0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  age: e.target.value === '' ? '' : Number(e.target.value),
                }))
              }
              className="dashboard__formInput"
              data-testid="field-age"
            />
            {errors.age ? (
              <p className="dashboard__formError" data-testid="error-age">
                {errors.age}
              </p>
            ) : null}
          </div>

          <div className="dashboard__formRow">
            <label htmlFor="birthdate" className="dashboard__formLabel">
              Birthdate <span aria-hidden="true">*</span>
            </label>
            <input
              id="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, birthdate: e.target.value }))
              }
              className="dashboard__formInput"
              data-testid="field-birthdate"
            />
            {errors.birthdate ? (
              <p className="dashboard__formError" data-testid="error-birthdate">
                {errors.birthdate}
              </p>
            ) : null}
          </div>

          <div className="dashboard__formRow">
            <label htmlFor="amount" className="dashboard__formLabel">
              Amount <span aria-hidden="true">*</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={formatNumber(formData.amount)}
              min={0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: e.target.value === '' ? '' : Number(e.target.value),
                }))
              }
              className="dashboard__formInput"
              data-testid="field-amount"
            />
            {errors.amount ? (
              <p className="dashboard__formError" data-testid="error-amount">
                {errors.amount}
              </p>
            ) : null}
          </div>

          <div className="dashboard__formRow">
            <label htmlFor="image" className="dashboard__formLabel">
              Image <span aria-hidden="true">*</span>
            </label>
            <div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="dashboard__formInput"
                data-testid="field-image"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  setFormData((prev) => ({ ...prev, image: file }))
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setImagePreview(url)
                  } else {
                    setImagePreview(null)
                  }
                }}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="dashboard__imagePreview"
                  data-testid="image-preview"
                />
              ) : null}
              {errors.image ? (
                <p className="dashboard__formError" data-testid="error-image">
                  {errors.image}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="dashboard__submit"
            data-testid="submit-entry"
          >
            Submit entry
          </button>
        </form>
      </section>

      <section className="dashboard__submissions" aria-label="Submitted entries">
        <h2>Submitted entries</h2>
        {submissions.length === 0 ? (
          <p data-testid="no-submissions">No submissions yet.</p>
        ) : (
          <table className="dashboard__submissionTable" data-testid="submissions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Birthdate</th>
                <th>Amount</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((entry) => (
                <tr key={entry.id} data-testid={`submission-${entry.id}`}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.age}</td>
                  <td>{entry.birthdate}</td>
                  <td>{entry.amount.toFixed(2)}</td>
                  <td>{entry.imageName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
