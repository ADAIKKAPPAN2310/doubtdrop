function UpvoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l7 10h-5v6H10v-6H5l7-10z" />
    </svg>
  )
}

function DownvoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20L5 10h5V4h4v6h5l-7 10z" />
    </svg>
  )
}

function AnswerCard({ answer, onUpvote, onDownvote }) {
  return (
    <article className="card answer-card">
      <p>{answer.text}</p>
      <div className="vote-row">
        <div className="vote-actions">
          <button className="button upvote" type="button" onClick={onUpvote}>
            <UpvoteIcon />
            Upvote
          </button>
          <button className="button downvote" type="button" onClick={onDownvote}>
            <DownvoteIcon />
            Downvote
          </button>
        </div>
        <span>{answer.votes} votes</span>
      </div>
    </article>
  )
}

export default AnswerCard
