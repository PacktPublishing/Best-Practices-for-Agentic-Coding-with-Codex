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

  it('saves an edited task when Enter is pressed', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Buy milk' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }))
    fireEvent.doubleClick(screen.getByText('Buy milk'))

    const editInput = screen.getByLabelText('Edit "Buy milk"')
    fireEvent.change(editInput, { target: { value: 'Buy oat milk' } })
    fireEvent.keyDown(editInput, { key: 'Enter' })

    expect(screen.getByText('Buy oat milk')).toBeInTheDocument()
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })

  it('saves an edited task when the input loses focus', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Read docs' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }))
    fireEvent.doubleClick(screen.getByText('Read docs'))

    const editInput = screen.getByLabelText('Edit "Read docs"')
    fireEvent.change(editInput, { target: { value: 'Read React docs' } })
    fireEvent.blur(editInput)

    expect(screen.getByText('Read React docs')).toBeInTheDocument()
    expect(screen.queryByText('Read docs')).not.toBeInTheDocument()
  })

  it('cancels an edited task when Escape is pressed', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Walk home' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }))
    fireEvent.doubleClick(screen.getByText('Walk home'))

    const editInput = screen.getByLabelText('Edit "Walk home"')
    fireEvent.change(editInput, { target: { value: 'Drive home' } })
    fireEvent.keyDown(editInput, { key: 'Escape' })

    expect(screen.getByText('Walk home')).toBeInTheDocument()
    expect(screen.queryByText('Drive home')).not.toBeInTheDocument()
  })
})

/*
Optional due-date reference (inactive):

it('adds and displays an optional due date', () => {
  render(<App />)

  fireEvent.change(screen.getByLabelText('New task'), {
    target: { value: 'Submit project' },
  })
  fireEvent.change(screen.getByLabelText('Due date'), {
    target: { value: '2026-07-24' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Add Task' }))

  expect(screen.getByText('Submit project')).toBeInTheDocument()
  expect(screen.getByText('Due: 24 Jul 2026')).toBeInTheDocument()
})
*/
