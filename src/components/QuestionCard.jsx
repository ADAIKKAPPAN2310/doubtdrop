function QuestionCard({ question, onViewDiscussion }) {
  const preview =
    question.description.length > 120
      ? `${question.description.slice(0, 120).trim()}...`
      : question.description

  return (
    <article className="card question-card">
      <h3>{question.title}</h3>
      <p>{preview}</p>
      <div className="card-footer">
        <span>{question.answers.length} Answers</span>
        <button
          className="button button-primary"
          type="button"
          onClick={() => onViewDiscussion(question.id)}
        >
          View Discussion
        </button>
      </div>
    </article>
  )
}

export default QuestionCard
