import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

beforeEach(() => {
  localStorage.clear()
})

describe('Todo App', () => {
  // PASSING: the app should render with a visible heading.
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Todo' })).toBeInTheDocument()
  })

  // FAILING: this test documents a missing feature.
  //
  // The app currently adds a task even when the input is empty.
  // Your job: open TaskInput.jsx and add a guard in handleAdd() so that
  // clicking "Add Task" with a blank field does nothing.
  // Once you do, this test will go green.
  it('does not add a task when the input is empty', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }))

    const items = screen.queryAllByRole('listitem')
    expect(items).toHaveLength(0)
  })
})
