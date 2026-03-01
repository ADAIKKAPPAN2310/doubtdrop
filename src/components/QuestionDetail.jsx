import { useMemo } from 'react'
import AddAnswerForm from './AddAnswerForm'
import AnswerCard from './AnswerCard'

function QuestionDetail({ question, onBackToQuestions, onAddAnswer, onUpvoteAnswer, onDownvoteAnswer }) {
  const sortedAnswers = useMemo(() => {
    if (!question) {
      return []
    }

    return [...question.answers].sort((firstAnswer, secondAnswer) => secondAnswer.votes - firstAnswer.votes)
  }, [question])

  if (!question) {
    return (
      <section className="detail-section">
        <article className="card empty-card">
          <p>Select a question to view discussion.</p>
          <button className="button button-primary" type="button" onClick={onBackToQuestions}>
            Back to Questions
          </button>
        </article>
      </section>
    )
  }

  return (
    <section className="detail-section">
      <button className="button button-secondary" type="button" onClick={onBackToQuestions}>
        Back to Questions
      </button>

      <article className="card detail-question">
        <h2>{question.title}</h2>
        <p>{question.description}</p>
      </article>

      <div className="answer-block">
        <h3>Answers</h3>
        <div className="answer-list">
          {sortedAnswers.length === 0 ? (
            <article className="card empty-card">
              <p>No answers yet. Be the first to help!</p>
            </article>
          ) : (
            sortedAnswers.map((answer) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                onUpvote={() => onUpvoteAnswer(question.id, answer.id)}
                onDownvote={() => onDownvoteAnswer(question.id, answer.id)}
              />
            ))
          )}
        </div>

        <AddAnswerForm onSubmit={(answerText) => onAddAnswer(question.id, answerText)} />
      </div>
    </section>
  )
}

export default QuestionDetail
