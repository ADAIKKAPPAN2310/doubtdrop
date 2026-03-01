import { useState } from 'react'

function AddQuestionForm({ onAddQuestion }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const wasAdded = onAddQuestion({ title, description })

    if (wasAdded) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <aside className="card add-question">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question-title">Question Title</label>
        <input
          id="question-title"
          type="text"
          placeholder="Enter your question title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="question-description">Description</label>
        <textarea
          id="question-description"
          rows="6"
          placeholder="Add details to help others answer clearly"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button className="button button-primary" type="submit">
          Submit Question
        </button>
      </form>
    </aside>
  )
}

export default AddQuestionForm
