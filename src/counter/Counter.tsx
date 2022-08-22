import { useState } from 'react';
import classes from './Counter.module.css';
import clsx from 'clsx';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <article className={clsx('card', classes.container)}>
      {count}
      <button onClick={() => setCount(count + 1)}>
        Count
      </button>
    </article>
  )
}