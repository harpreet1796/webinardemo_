'use client'

import { useState } from 'react'

type Webinar = {
  id: string
  title: string
  description: string
  date: string
  time: string
  status: string
  attendees: number
}

type FormState = {
  title: string
  description: string
  date: string
  time: string
  status: string
}

const initialWebinars: Webinar[] = [
  {
    id: '1',
    title: 'Grow Your Audience',
    description: 'Learn simple steps to scale your webinar attendance and keep people engaged from start to finish.',
    date: 'Jul 3, 2026',
    time: '5:00 PM',
    status: 'Scheduled',
    attendees: 125,
  },
  {
    id: '2',
    title: 'Convert Leads Faster',
    description: 'Best practices for turning webinar visitors into buyers with offers that feel natural.',
    date: 'Jul 10, 2026',
    time: '7:00 PM',
    status: 'Scheduled',
    attendees: 89,
  },
  {
    id: '3',
    title: 'Webinar Tech Setup',
    description: 'A practical guide to setting up Zoom, recording, and automating your webinar workflow.',
    date: 'Jul 17, 2026',
    time: '3:00 PM',
    status: 'Draft',
    attendees: 42,
  },
]

const initialForm: FormState = {
  title: '',
  description: '',
  date: '',
  time: '',
  status: 'Scheduled',
}

const Webinars = () => {
  const [webinars, setWebinars] = useState<Webinar[]>(initialWebinars)
  const [form, setForm] = useState<FormState>(initialForm)

  const handleDelete = (id: string) => {
    const webinar = webinars.find((item) => item.id === id)
    if (!webinar) return

    const confirmed = window.confirm(`Delete "${webinar.title}"? This cannot be undone.`)
    if (!confirmed) return

    setWebinars((current) => current.filter((item) => item.id !== id))
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleAdd = () => {
    if (!form.title.trim()) return

    const newWebinar: Webinar = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      title: form.title.trim(),
      description: form.description.trim() || 'No description provided.',
      date: form.date,
      time: form.time,
      status: form.status,
      attendees: 0,
    }

    setWebinars((current) => [newWebinar, ...current])
    setForm(initialForm)
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-ring">
          <p className="text-3xl font-semibold tracking-tight">Your Webinars</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Add, manage, and remove webinars from your list.
          </p>
        </div>

        <section className="mb-10 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-ring">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Create a new webinar</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the form below to add a webinar to the list.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!form.title.trim()}
            >
              Add Webinar
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Title</span>
              <input
                value={form.title}
                onChange={(event) => handleChange('title', event.target.value)}
                className="w-full rounded-2xl border border-border bg-popover px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Webinar title"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Date</span>
              <input
                type="date"
                value={form.date}
                onChange={(event) => handleChange('date', event.target.value)}
                className="w-full rounded-2xl border border-border bg-popover px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Time</span>
              <input
                type="time"
                value={form.time}
                onChange={(event) => handleChange('time', event.target.value)}
                className="w-full rounded-2xl border border-border bg-popover px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Status</span>
              <select
                value={form.status}
                onChange={(event) => handleChange('status', event.target.value)}
                className="w-full rounded-2xl border border-border bg-popover px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option>Scheduled</option>
                <option>Draft</option>
                <option>Live</option>
                <option>Ended</option>
                <option>Cancelled</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              rows={4}
              className="min-h-30 w-full rounded-3xl border border-border bg-popover px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Enter a short description"
            />
          </label>
        </section>

        {webinars.length === 0 ? (
          <div className="rounded-3xl bg-card p-8 text-center shadow-sm ring-1 ring-ring">
            <p className="text-xl font-semibold">No webinars found</p>
            <p className="mt-2 text-sm text-muted-foreground">Add new webinars to see them listed here.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {webinars.map((webinar) => (
              <div key={webinar.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{webinar.status}</p>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">{webinar.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(webinar.id)}
                    className="rounded-full border border-border bg-destructive px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-destructive/90"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">{webinar.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-secondary p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{webinar.date}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Time</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{webinar.time}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Attendees</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{webinar.attendees}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{webinar.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Webinars