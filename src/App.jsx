import { useEffect, useMemo, useState } from 'react'
import './App.css'
import AddQuestionForm from './components/AddQuestionForm'
import QuestionDetail from './components/QuestionDetail'
import QuestionList from './components/QuestionList'
import ResourceSection from './components/ResourceSection'

const STORAGE_KEY = 'doubtdrop-data-v1'

const EMPTY_DATA = {
  questions: [],
  resources: [],
}

function parseStoredData(rawValue) {
  if (!rawValue) {
    return EMPTY_DATA
  }

  try {
    const parsed = JSON.parse(rawValue)
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      resources: Array.isArray(parsed.resources) ? parsed.resources : [],
    }
  } catch {
    return EMPTY_DATA
  }
}

function sortLatestFirst(items) {
  return [...items].sort((firstItem, secondItem) => {
    return new Date(secondItem.createdAt) - new Date(firstItem.createdAt)
  })
}

function isValidUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function App() {
  const [data, setData] = useState(() => parseStoredData(localStorage.getItem(STORAGE_KEY)))
  const [currentView, setCurrentView] = useState('questions')
  const [selectedQuestionId, setSelectedQuestionId] = useState(() => {
    const savedData = parseStoredData(localStorage.getItem(STORAGE_KEY))
    if (savedData.questions.length > 0) {
      const latestQuestion = sortLatestFirst(savedData.questions)[0]
      return latestQuestion.id
    }
    return null
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (!notification) {
      return
    }

    const timer = setTimeout(() => {
      setNotification('')
    }, 2500)

    return () => clearTimeout(timer)
  }, [notification])

  const sortedQuestions = useMemo(() => sortLatestFirst(data.questions), [data.questions])

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return sortedQuestions
    }

    return sortedQuestions.filter((question) =>
      question.title.toLowerCase().includes(normalizedQuery),
    )
  }, [searchQuery, sortedQuestions])

  const selectedQuestion = useMemo(() => {
    return data.questions.find((question) => question.id === selectedQuestionId) ?? null
  }, [data.questions, selectedQuestionId])

  const handleAddQuestion = ({ title, description }) => {
    const cleanedTitle = title.trim()
    const cleanedDescription = description.trim()

    if (!cleanedTitle || !cleanedDescription) {
      setNotification('Please fill in both question fields.')
      return false
    }

    const newQuestion = {
      id: String(Date.now()),
      title: cleanedTitle,
      description: cleanedDescription,
      createdAt: new Date().toISOString(),
      answers: [],
    }

    setData((previousData) => ({
      ...previousData,
      questions: sortLatestFirst([newQuestion, ...previousData.questions]),
    }))

    setSelectedQuestionId(newQuestion.id)
    setCurrentView('detail')
    setNotification('Question added successfully.')
    return true
  }

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestionId(questionId)
    setCurrentView('detail')
  }

  const handleAddAnswer = (questionId, answerText) => {
    const cleanedAnswer = answerText.trim()

    if (!cleanedAnswer) {
      setNotification('Answer cannot be empty.')
      return false
    }

    const newAnswer = {
      id: String(Date.now()),
      text: cleanedAnswer,
      votes: 0,
      createdAt: new Date().toISOString(),
    }

    setData((previousData) => ({
      ...previousData,
      questions: previousData.questions.map((question) => {
        if (question.id !== questionId) {
          return question
        }

        return {
          ...question,
          answers: [...question.answers, newAnswer],
        }
      }),
    }))

    setNotification('Answer added successfully.')
    return true
  }

  const handleUpvoteAnswer = (questionId, answerId) => {
    setData((previousData) => ({
      ...previousData,
      questions: previousData.questions.map((question) => {
        if (question.id !== questionId) {
          return question
        }

        return {
          ...question,
          answers: question.answers.map((answer) => {
            if (answer.id !== answerId) {
              return answer
            }

            return {
              ...answer,
              votes: answer.votes + 1,
            }
          }),
        }
      }),
    }))
  }

  const handleAddResource = ({ title, link }) => {
    const cleanedTitle = title.trim()
    const cleanedLink = link.trim()

    if (!cleanedTitle || !cleanedLink) {
      setNotification('Resource title and link are required.')
      return false
    }

    if (!isValidUrl(cleanedLink)) {
      setNotification('Please provide a valid URL (http/https).')
      return false
    }

    const newResource = {
      id: String(Date.now()),
      title: cleanedTitle,
      link: cleanedLink,
    }

    setData((previousData) => ({
      ...previousData,
      resources: [newResource, ...previousData.resources],
    }))

    setNotification('Resource added successfully.')
    return true
  }

  const isQuestionSectionActive = currentView === 'questions' || currentView === 'detail'

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-inner">
          <button className="brand nav-link" type="button" onClick={() => setCurrentView('questions')}>
            DoubtDrop
          </button>

          <nav className="nav-menu" aria-label="Primary">
            <button
              className={`nav-link ${isQuestionSectionActive ? 'active' : ''}`}
              type="button"
              onClick={() => setCurrentView('questions')}
            >
              Questions
            </button>
            <button
              className={`nav-link ${currentView === 'resources' ? 'active' : ''}`}
              type="button"
              onClick={() => setCurrentView('resources')}
            >
              Resources
            </button>
            <button className="nav-link nav-link-cta" type="button" onClick={() => setCurrentView('questions')}>
              Add Question
            </button>
          </nav>
        </div>
      </header>

      <main className="content">
        {notification ? <p className="notification">{notification}</p> : null}

        {currentView === 'questions' ? (
          <section className="main-layout">
            <QuestionList
              questions={filteredQuestions}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onViewDiscussion={handleSelectQuestion}
            />
            <AddQuestionForm onAddQuestion={handleAddQuestion} />
          </section>
        ) : null}

        {currentView === 'detail' ? (
          <QuestionDetail
            question={selectedQuestion}
            onBackToQuestions={() => setCurrentView('questions')}
            onAddAnswer={handleAddAnswer}
            onUpvoteAnswer={handleUpvoteAnswer}
          />
        ) : null}

        {currentView === 'resources' ? (
          <ResourceSection resources={data.resources} onAddResource={handleAddResource} />
        ) : null}
      </main>
    </div>
  )
}

export default App
