// Importing Link to use instead of 'a': hyperlink tag so the page doesn't need to refresh
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div>
        <h4>Version 1.0.0</h4>
        <Link to="/">Go Back</Link>
    </div>
  )
}

export default About