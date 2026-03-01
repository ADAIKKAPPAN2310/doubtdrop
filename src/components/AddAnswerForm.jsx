import { useState } from 'react'

function AddAnswerForm({ onSubmit }) {
  const [answerText, setAnswerText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const wasAdded = onSubmit(answerText)

    if (wasAdded) {
      setAnswerText('')
    }
  }

  return (
    <form className="card add-answer" onSubmit={handleSubmit}>
      <h4>Add Answer</h4>
      <textarea
        rows="4"
        placeholder="Write your answer here"
        value={answerText}
        onChange={(event) => setAnswerText(event.target.value)}
      />
      <button className="button button-primary" type="submit">
        Post Answer
      </button>
    </form>
  )
}

export default AddAnswerForm
