import { useState } from 'react';
import './Counter.css';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className='card counter-container'>
      {count}
      <button onClick={() => setCount(count + 1)}>
        Count
      </button>
    </div>
  )
}