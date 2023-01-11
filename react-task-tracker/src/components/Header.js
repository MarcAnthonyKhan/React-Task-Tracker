
import { useLocation } from 'react-router-dom'
// Proptypes for type checking
import PropTypes from 'prop-types'
// Import button componenet for use
import Button from './Buttons'

// Props passed for use
const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
    return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname === '/' && <Button 
            // Dynamic styling based of value of showAdd which is if the button is true or false
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'Close' : 'Add'} 
            // Inverts value of button on user click
            onClick={onAdd}
        /> }
    </header>
    )
}

// Default prop if no values as passed
Header.defaultProps = {
    title: 'Task Tracker',
}

// Requires correct type being passed
Header.propTypes = {
    title: PropTypes.string.isRequired, 
}

// CSS in JS

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black',
// }

export default Header