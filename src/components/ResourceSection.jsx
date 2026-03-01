import { useState } from 'react'

function ResourceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
      <path d="M19 19H5V5h6V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6h-2v6z" />
    </svg>
  )
}

function ResourceSection({ resources, onAddResource }) {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const wasAdded = onAddResource({ title, link })

    if (wasAdded) {
      setTitle('')
      setLink('')
    }
  }

  return (
    <section className="resources-section">
      <h2>Study Resources</h2>

      <form className="card resource-form" onSubmit={handleSubmit}>
        <label htmlFor="resource-title">Resource Title</label>
        <input
          id="resource-title"
          type="text"
          placeholder="e.g. Linear Algebra Notes"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="resource-link">Resource URL</label>
        <input
          id="resource-link"
          type="url"
          placeholder="https://example.com"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />

        <button className="button button-primary" type="submit">
          Add Resource
        </button>
      </form>

      <div className="resource-grid">
        {resources.length === 0 ? (
          <article className="card empty-card">
            <p>No resources added yet.</p>
          </article>
        ) : (
          resources.map((resource) => (
            <article className="card resource-card" key={resource.id}>
              <h3>{resource.title}</h3>
              <a className="button resource-btn" href={resource.link} target="_blank" rel="noreferrer">
                <ResourceIcon />
                Open Link
              </a>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ResourceSection
