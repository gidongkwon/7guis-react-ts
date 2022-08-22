import clsx from 'clsx';
import { ChangeEventHandler, useReducer } from 'react';
import styles from './TempConverter.module.css';

type Temperatures = {
  fahrenheit: string;
  celcius: string;
}

type TemperaturesReducerAction = {
  type: 'celcius';
  celciusString: string;
} | {
  type: 'fahrenheit';
  fahrenheitString: string;
}

function isEmpty(inputValue: string) {
  return inputValue.trim().length === 0;
}

function isNumeric(inputValue: string) {
  return !isEmpty(inputValue) && !isNaN(Number(inputValue));
}

function isInputInvalidAndFilled(inputValue: string) {
  return !isNumeric(inputValue) && !isEmpty(inputValue);
}

function isUpdateBlocked(inputValue: string, other: string) {
  return !isEmpty(other) && (!isNumeric(inputValue) || isEmpty(inputValue));
}

function round(value: number, precision: number) {
  return Math.round(value * (10 ** precision)) / (10 ** precision);
}

function temperaturesReducer(state: Temperatures, action: TemperaturesReducerAction): Temperatures {
  switch (action.type) {
    case 'celcius': {
      const { fahrenheit: fahrenheitBefore } = state;
      const { celciusString } = action;

      const fahrenheit = isNumeric(celciusString)
        ? String(round(Number(celciusString) * (9 / 5) + 32, 3))
        : fahrenheitBefore;
      return {
        celcius: celciusString,
        fahrenheit,
      }
    }
    case 'fahrenheit': {
      const { celcius: celciusBefore } = state;
      const { fahrenheitString } = action;

      const celcius = isNumeric(fahrenheitString)
        ? String(round((Number(fahrenheitString) - 32) * (5 / 9), 3))
        : celciusBefore;
      return {
        celcius,
        fahrenheit: fahrenheitString,
      }
    }
    default:
      return state;
  }
}

export const TempConverter = () => {
  const [{ fahrenheit, celcius }, dispatch] = useReducer(temperaturesReducer, { celcius: '', fahrenheit: '' });

  const handleCelciusChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: 'celcius',
      celciusString: e.target.value,
    });
  }

  const handleFahrenheitChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: 'fahrenheit',
      fahrenheitString: e.target.value,
    });
  }

  return (
    <article className={clsx('card', styles.container)}>
      <section>
        <input
          id='celcius'
          inputMode='decimal'
          value={celcius}
          aria-invalid={isInputInvalidAndFilled(celcius)}
          data-update-blocked={isUpdateBlocked(fahrenheit, celcius)}
          onChange={handleCelciusChange}
        />
        <label htmlFor='celcius'>Celcius</label>
      </section>
      <span>=</span>
      <section>
        <input
          id='fahrenheit'
          inputMode='decimal'
          value={fahrenheit}
          aria-invalid={isInputInvalidAndFilled(fahrenheit)}
          data-update-blocked={isUpdateBlocked(celcius, fahrenheit)}
          onChange={handleFahrenheitChange}
        />
        <label htmlFor='fahrenheit'>Fahrenheit</label>
      </section>
    </article>
  )
}