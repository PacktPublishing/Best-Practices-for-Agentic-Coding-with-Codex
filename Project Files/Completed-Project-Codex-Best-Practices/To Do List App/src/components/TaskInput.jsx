import { useState } from 'react'
import styles from './TaskInput.module.css'

const MAX_LENGTH = 100

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    const nextText = text.trim()
    if (!nextText) return

    onAdd(nextText)
    setText('')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="What needs to be done?"
          maxLength={MAX_LENGTH}
          aria-label="New task"
        />
        <button className={styles.button} onClick={handleAdd}>
          Add Task
        </button>
      </div>
      <p className={`${styles.counter} ${text.length >= MAX_LENGTH ? styles.atLimit : ''}`}>
        {text.length} / {MAX_LENGTH}
      </p>
    </div>
  )
}

/*
Optional due-date reference (inactive):

const [dueDate, setDueDate] = useState('')

const handleAdd = () => {
  const trimmedText = text.trim()

  if (!trimmedText) return

  onAdd(trimmedText, dueDate || null)
  setText('')
  setDueDate('')
}

<input
  className={styles.dateInput}
  type="date"
  value={dueDate}
  onChange={e => setDueDate(e.target.value)}
  aria-label="Due date"
/>
*/
