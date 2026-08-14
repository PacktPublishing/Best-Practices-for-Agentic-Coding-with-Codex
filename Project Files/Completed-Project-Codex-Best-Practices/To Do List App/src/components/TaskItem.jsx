import { useEffect, useRef, useState } from 'react'
import styles from './TaskItem.module.css'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)
  const inputRef = useRef(null)
  const ignoreBlurRef = useRef(false)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const startEditing = () => {
    ignoreBlurRef.current = false
    setDraft(task.text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    const nextText = draft.trim()
    if (nextText) {
      onEdit(task.id, nextText)
    }
    setIsEditing(false)
  }

  const cancelEdit = () => {
    ignoreBlurRef.current = true
    setDraft(task.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveEdit()
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      cancelEdit()
    }
  }

  const handleBlur = () => {
    if (ignoreBlurRef.current) {
      ignoreBlurRef.current = false
      return
    }

    saveEdit()
  }

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'complete'}`}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          aria-label={`Edit "${task.text}"`}
        />
      ) : (
        <span className={styles.text} onDoubleClick={startEditing}>
          {task.text}
        </span>
      )}
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.text}"`}
      >
        ✕
      </button>
    </li>
  )
}

/*
Optional due-date reference (inactive):

const dueDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDueDate(dueDate) {
  return dueDateFormatter.format(new Date(`${dueDate}T00:00:00Z`))
}

<span className={styles.details}>
  <span className={styles.text}>{task.text}</span>
  {task.dueDate && (
    <time className={styles.dueDate} dateTime={task.dueDate}>
      Due: {formatDueDate(task.dueDate)}
    </time>
  )}
</span>
*/
