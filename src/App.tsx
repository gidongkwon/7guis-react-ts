import './App.css'
import { Counter } from './counter/Counter'
import { FlightBooker } from './flight-booker/FlightBooker'
import { TempConverter } from './temp-converter/TempConverter'

function App() {
  return (
    <div className='app'>
      <Counter />
      <TempConverter />
      <FlightBooker />
    </div>
  )
}

export default App
