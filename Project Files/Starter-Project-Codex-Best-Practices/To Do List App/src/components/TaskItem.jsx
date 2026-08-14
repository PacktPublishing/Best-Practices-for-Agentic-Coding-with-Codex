import styles from './TaskItem.module.css'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'complete'}`}
      />
      <span className={styles.text}>{task.text}</span>
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
