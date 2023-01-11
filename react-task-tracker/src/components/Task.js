// Importing 'X' icon for react icons
import { FaTimes } from 'react-icons/fa'

// Props being passed in for use
const Task = ({ task, onDelete, onToggle }) => {
  return (
    // Dynamic class name for css styling partly based on value of reminder
    // If user double clicks task, onToggle function inverts reminder value of that task
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {/* 'text' key value displayed */}
            {task.text} 
            {/* 'X' icon with styling and function if user clicks icon */}
            <FaTimes 
                style={{color:'red', cursor: 'pointer'}} 
                onClick={() => onDelete(task.id)}
                
            />
        </h3>
        {/* Displays 'date' key value */}
        <p>
            {task.day}
        </p>
    </div>
  )
}

export default Task