import QuestionCard from './QuestionCard'

function QuestionList({ questions, searchQuery, onSearchChange, onViewDiscussion }) {
  return (
    <div className="question-list">
      <h2>Latest Questions</h2>

      <div className="card search-card">
        <label htmlFor="search-questions">Search Questions</label>
        <input
          id="search-questions"
          type="text"
          value={searchQuery}
          placeholder="Search by title"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      {questions.length === 0 ? (
        <article className="card empty-card">
          <p>No questions found. Add your first one.</p>
        </article>
      ) : (
        questions.map((question) => (
          <QuestionCard key={question.id} question={question} onViewDiscussion={onViewDiscussion} />
        ))
      )}
    </div>
  )
}

export default QuestionList
