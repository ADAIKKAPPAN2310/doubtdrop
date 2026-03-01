function UpvoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l7 10h-5v6H10v-6H5l7-10z" />
    </svg>
  )
}

function AnswerCard({ answer, onUpvote }) {
  return (
    <article className="card answer-card">
      <p>{answer.text}</p>
      <div className="vote-row">
        <button className="button upvote" type="button" onClick={onUpvote}>
          <UpvoteIcon />
          Upvote
        </button>
        <span>{answer.votes} votes</span>
      </div>
    </article>
  )
}

export default AnswerCard
