// Importing hook for use
import { useState } from 'react'

// Prop being passed in for use
const AddTask = ( { onAdd } ) => {

  // Variables with set functions for use with default states
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  //
  const onSubmit = (e) => {
    // Preventing default action for event, in this case 'submit'
    e.preventDefault()

    // Alerts user that the text field must have a value in order
    // for a task to be added
    if(!text) {
        alert('Please add a task')
        return
    }

    // Call 'onAdd' function to add task to tasks array
    onAdd({ text, day, reminder })

    // Reset variable fields to default values
    setText('')
    setDay('')
    setReminder(false)
  }
  
  return (
    // Form called 'onSubmit' function on user clicking 'Save Task'
    <form className="form" onSubmit={onSubmit} >
        <div className="form-control">
            {/* Field name */}
            <label>
                Task
            </label>
            {/* Input field */}
            <input 
                // Field properties
                type="text" 
                placeholder="Add Task"
                value={text}    
                // Arrow function to change field of task
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label>
                Day & Time
            </label>
            <input 
                type="text" 
                placeholder="Add Day & Time"
                value={day}    
                onChange={(e) => setDay(e.target.value)}
            />
        </div>
        <div className="form-control form-control-check">
            <label>
                Set reminder?
            </label>
            <input 
                type="checkbox"
                checked={reminder}
                value={reminder}    
                onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>
        {/* Submit button for user to add task */}
        <input type="submit" value='Save Task' className="btn btn-block" />
    </form>
  )
}

export default AddTask