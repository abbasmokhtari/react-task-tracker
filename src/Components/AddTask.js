import React from 'react'
import { useState } from 'react'

function AddTask({ onAdd }) {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // we don't want to submit new data to page e.preventDefault does that
    // we need to do validation for form first we need to make sure what's typed in text section is text
    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    //we want to clear the form
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
        {/* e.currentTarget.checked gives us a true or false value */}
      </div>
      <input
        type="submit"
        value="Save Task"
        className="btn btn-block"
        onClick={onAdd}
      />
    </form>
  )
}

export default AddTask
