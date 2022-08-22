import './App.css'
import { Counter } from './counter/Counter'
import { FlightBooker } from './flight-booker/FlightBooker'
import { TempConverter } from './temp-converter/TempConverter'
import { Timer } from './timer/Timer'

function App() {
  return (
    <div className='app'>
      <Counter />
      <TempConverter />
      <FlightBooker />
      <Timer />
    </div>
  )
}

export default App
