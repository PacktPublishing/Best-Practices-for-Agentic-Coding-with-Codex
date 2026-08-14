import styles from './TaskNote.module.css'

export default function TaskNote({ task }) {
  return (
    <p className={styles.note}>
      <span className={styles.text}>{task.note}</span>
    </p>
  )
}
