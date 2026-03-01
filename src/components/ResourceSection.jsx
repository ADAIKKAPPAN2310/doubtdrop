import { useState } from 'react'

function ResourceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
      <path d="M19 19H5V5h6V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6h-2v6z" />
    </svg>
  )
}

function LinkTypeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.59 13.41a1.996 1.996 0 0 0 2.82 0l3.59-3.59a2 2 0 1 0-2.82-2.82l-1.29 1.29-1.41-1.41 1.29-1.29a4 4 0 1 1 5.66 5.66l-3.59 3.59a4 4 0 0 1-5.66 0l-.29-.29 1.41-1.41.29.29z" />
      <path d="M13.41 10.59a1.996 1.996 0 0 0-2.82 0L7 14.18A2 2 0 1 0 9.82 17l1.29-1.29 1.41 1.41-1.29 1.29a4 4 0 1 1-5.66-5.66l3.59-3.59a4 4 0 0 1 5.66 0l.29.29-1.41 1.41-.29-.29z" />
    </svg>
  )
}

function PdfTypeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 2.5L17.5 8H14V4.5z" />
      <path d="M8 15h8v2H8v-2z" />
    </svg>
  )
}

function ImageTypeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2 13H5v-2.5l3.5-4.5 2.5 3 3.5-4.5L19 15.5V18z" />
      <circle cx="8" cy="8" r="1.5" />
    </svg>
  )
}

function VideoTypeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5l4 4v-11l-4 4z" />
    </svg>
  )
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) {
    return '0 KB'
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getTypeLabel(fileType) {
  if (fileType?.includes('pdf')) {
    return 'PDF'
  }

  if (fileType?.includes('image')) {
    return 'Image'
  }

  if (fileType?.includes('video')) {
    return 'Video'
  }

  return 'File'
}

function getResourceTypeIcon(resource) {
  if (resource.type === 'link') {
    return <LinkTypeIcon />
  }

  if (resource.fileType?.includes('pdf')) {
    return <PdfTypeIcon />
  }

  if (resource.fileType?.includes('image')) {
    return <ImageTypeIcon />
  }

  if (resource.fileType?.includes('video')) {
    return <VideoTypeIcon />
  }

  return <ResourceIcon />
}

function ResourceSection({ resources, onAddResource }) {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [resourceMode, setResourceMode] = useState('link')
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileData, setFileData] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isReadingFile, setIsReadingFile] = useState(false)
  const [fileError, setFileError] = useState('')

  const resetFileState = ({ keepError = false } = {}) => {
    setSelectedFile(null)
    setFileData('')
    setUploadProgress(0)
    setIsReadingFile(false)

    if (!keepError) {
      setFileError('')
    }
  }

  const handleModeChange = (mode) => {
    setResourceMode(mode)
    setFileError('')

    if (mode === 'link') {
      resetFileState()
    } else {
      setLink('')
    }
  }

  const handleFileChange = (event) => {
    const [file] = event.target.files ?? []

    if (!file) {
      resetFileState()
      return
    }

    const maxFileSizeInBytes = 5 * 1024 * 1024

    if (file.size > maxFileSizeInBytes) {
      setFileError('File size exceeds 5MB limit.')
      resetFileState({ keepError: true })
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'video/mp4']

    if (!allowedTypes.includes(file.type)) {
      setFileError('Unsupported file type. Please upload PDF, image, or MP4 video.')
      resetFileState({ keepError: true })
      return
    }

    const reader = new FileReader()
    setSelectedFile(file)
    setFileData('')
    setUploadProgress(0)
    setFileError('')
    setIsReadingFile(true)

    reader.onprogress = (progressEvent) => {
      if (!progressEvent.lengthComputable) {
        return
      }

      const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      setUploadProgress(percentage)
    }

    reader.onload = () => {
      setFileData(typeof reader.result === 'string' ? reader.result : '')
      setUploadProgress(100)
      setIsReadingFile(false)
    }

    reader.onerror = () => {
      setFileError('Failed to read file. Please try again.')
      setIsReadingFile(false)
      setUploadProgress(0)
      setFileData('')
      setSelectedFile(null)
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (resourceMode === 'file' && !fileData) {
      setFileError('Please upload a file before submitting.')
      return
    }

    const payload =
      resourceMode === 'link'
        ? {
            title,
            type: 'link',
            link,
          }
        : {
            title,
            type: 'file',
            fileData,
            fileName: selectedFile?.name ?? '',
            fileType: selectedFile?.type ?? '',
            fileSize: selectedFile?.size ?? 0,
          }

    const wasAdded = onAddResource(payload)

    if (wasAdded) {
      setTitle('')
      setLink('')
      resetFileState()
      setResourceMode('link')
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

        <div className="resource-mode-toggle" role="group" aria-label="Resource mode">
          <button
            className={`mode-button ${resourceMode === 'link' ? 'active' : ''}`}
            type="button"
            onClick={() => handleModeChange('link')}
          >
            Add Link
          </button>
          <button
            className={`mode-button ${resourceMode === 'file' ? 'active' : ''}`}
            type="button"
            onClick={() => handleModeChange('file')}
          >
            Upload File
          </button>
        </div>

        {resourceMode === 'link' ? (
          <>
            <label htmlFor="resource-link">Resource URL</label>
            <input
              id="resource-link"
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(event) => setLink(event.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="resource-file">Upload File</label>
            <input
              id="resource-file"
              type="file"
              accept=".pdf,image/jpeg,image/png,image/webp,video/mp4"
              onChange={handleFileChange}
            />

            {isReadingFile ? (
              <div className="upload-progress" aria-live="polite">
                <div className="upload-progress-track">
                  <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span>{uploadProgress}%</span>
              </div>
            ) : null}

            {selectedFile ? (
              <div className="selected-file-meta">
                <span>{selectedFile.name}</span>
                <span>{formatFileSize(selectedFile.size)}</span>
              </div>
            ) : null}

            {fileError ? <p className="resource-error">{fileError}</p> : null}

            {selectedFile?.type?.includes('image') && fileData ? (
              <img className="resource-preview-image" src={fileData} alt={selectedFile.name} />
            ) : null}

            {selectedFile?.type?.includes('video') && fileData ? (
              <video className="resource-preview-video" controls src={fileData}>
                <track kind="captions" />
              </video>
            ) : null}
          </>
        )}

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
              <div className="resource-card-head">
                <span className="resource-type-icon" aria-hidden="true">
                  {getResourceTypeIcon(resource)}
                </span>
                <div>
                  <h3>{resource.title}</h3>
                  {resource.type === 'file' ? (
                    <p className="resource-file-meta">
                      {getTypeLabel(resource.fileType)} • {formatFileSize(resource.fileSize)}
                    </p>
                  ) : (
                    <p className="resource-file-meta">Link</p>
                  )}
                </div>
              </div>

              {resource.type === 'link' ? (
                <a className="button resource-btn" href={resource.link} target="_blank" rel="noreferrer">
                  <ResourceIcon />
                  Open Link
                </a>
              ) : null}

              {resource.type === 'file' && resource.fileType?.includes('image') ? (
                <img className="resource-preview-image" src={resource.fileData} alt={resource.fileName || resource.title} />
              ) : null}

              {resource.type === 'file' && resource.fileType?.includes('video') ? (
                <video className="resource-preview-video" controls src={resource.fileData}>
                  <track kind="captions" />
                </video>
              ) : null}

              {resource.type === 'file' && resource.fileType?.includes('pdf') ? (
                <div className="pdf-actions">
                  <a className="button resource-btn" href={resource.fileData} target="_blank" rel="noreferrer">
                    View PDF
                  </a>
                  <iframe
                    className="resource-preview-pdf"
                    src={resource.fileData}
                    title={resource.fileName || resource.title}
                  />
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ResourceSection
