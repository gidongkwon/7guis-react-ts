import { ChangeEventHandler, useReducer } from 'react';
import './TempConverter.css';

type Temperatures = {
  fahrenheit: string | undefined;
  celcius: string | undefined;
}

type TemperaturesReducerAction = {
  type: 'celcius';
  celciusString: string;
} | {
  type: 'fahrenheit';
  fahrenheitString: string;
}

function isEmpty(inputValue: string | undefined) {
  return inputValue?.trim().length === 0;
}

function isNumeric(inputValue: string | undefined) {
  return !isEmpty(inputValue) && !isNaN(Number(inputValue));
}

function isInputInvalidAndFilled(inputValue: string | undefined) {
  return !isNumeric(inputValue) && !isEmpty(inputValue);
}

function isUpdateBlocked(inputValue: string | undefined, other: string | undefined) {
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
  const [{ fahrenheit, celcius }, dispatch] = useReducer(temperaturesReducer, { celcius: undefined, fahrenheit: undefined });

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
    <div className='temperature card temperature-container'>
      <section>
        <input
          id='celcius'
          onChange={handleCelciusChange}
          value={celcius}
          aria-invalid={isInputInvalidAndFilled(celcius)}
          data-update-blocked={isUpdateBlocked(fahrenheit, celcius)}
        />
        <label htmlFor='celcius'>Celcius</label>
      </section>
      <span>=</span>
      <section>
        <input
          id='fahrenheit'
          onChange={handleFahrenheitChange}
          value={fahrenheit}
          aria-invalid={isInputInvalidAndFilled(fahrenheit)}
          data-update-blocked={isUpdateBlocked(celcius, fahrenheit)}
        />
        <label htmlFor='fahrenheit'>Fahrenheit</label>
      </section>
    </div>
  )
}