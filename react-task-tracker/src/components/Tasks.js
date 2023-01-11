// Importing task component for use
import Task from './Task'

// Props passed in for use
const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        // Fractal brackets
        <>
            {/* Displays each task and passes functions to Task */}
            {tasks.map((task) => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onDelete={onDelete} 
                    onToggle={onToggle} 
                />
            ))}
        </>
    )
}

export default Tasks