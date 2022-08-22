import { useReducer, useState } from 'react';
import clsx from 'clsx';
import { useInterval } from '../hooks/useInterval';
import styles from './Timer.module.css';

type Times = {
  startedAtEpoch: number;
  updatedAtEpoch: number;
}

type ElapsedTimeReducerAction = {
  type: 'start'
} | {
  type: 'update';
  epoch: number;
}

function elapsedTimeReducer(state: Times, action: ElapsedTimeReducerAction): Times {
  switch(action.type) {
    case 'start':
      const now = Date.now();
      return {
        startedAtEpoch: now,
        updatedAtEpoch: now,
      };
    case 'update':
      return {
        startedAtEpoch: state.startedAtEpoch,
        updatedAtEpoch: Date.now(),
      };
  }
}

const maxDurationSec = 30;

export const Timer = () => {
  const [{ startedAtEpoch: startedAtMs, updatedAtEpoch: updatedAtMs }, dispatch] = useReducer(elapsedTimeReducer, { startedAtEpoch: Date.now(), updatedAtEpoch: Date.now() });
  const [durationSec, setDurationSec] = useState(maxDurationSec / 2);
  useInterval(() => dispatch({
    type: 'update',
    epoch: Date.now(),
  }), 100);

  const elapsedSec = Math.min((updatedAtMs - startedAtMs) / 1000, durationSec);

  const handleResetButton = () => {
    dispatch({ type: 'start' });
  }

  return (
    <article className={clsx('card', styles.container)}>
      <label
        className={styles.elapsedLabel}
        htmlFor='elapsed-progress'
      >
        Elapsed Time:
      </label>
      <progress
        id='elapsed-progress'
        className={styles.elapsedProgress}
        max={durationSec}
        value={elapsedSec}
      />
      <span className={styles.elapsedSeconds}>
        {elapsedSec.toFixed(1)}s
      </span>
      <label
        className={styles.durationLabel}
        htmlFor='duration-slider'
      >
        Duration:
      </label>
      <input
        className={styles.durationInput}
        id='duration-slider'
        type='range'
        min={0}
        max={maxDurationSec}
        step={0.1}
        value={durationSec}
        onChange={(e) => setDurationSec(e.currentTarget.valueAsNumber)}
      />
      <button
        className={styles.resetButton}
        onClick={handleResetButton}
      >
        Reset Timer
      </button>
    </article>
  )
}