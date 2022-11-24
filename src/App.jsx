//Bootstrap
import {
  Container
} from 'react-bootstrap'

//Components
import Calendar from './components/Calendar'

//CSS
import './assets/css/default.css'

function App() {
  return (
    <Container id="wrapper" fluid className="g-0">
      <Calendar {...{ locale: "sv-SE" }} />
    </Container>
  )
}

export default App
