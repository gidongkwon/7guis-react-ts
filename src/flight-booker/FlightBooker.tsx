import clsx from 'clsx';
import { FormEventHandler, useState } from 'react';
import styles from './FlightBooker.module.css';
import { isBefore, isValid } from 'date-fns';

// day.month.year
const dateRegexp = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;

function isValidDateString(dateString: string): boolean {
  return isValid(parseDate(dateString));
}

function parseDate(dateString: string): Date | undefined {
  const matchResult = dateString.match(dateRegexp);
  if (matchResult == null) {
    return undefined;
  }

  const [, day, month, year] = matchResult;

  return new Date(`${year}-${month}-${day}`);
}

type FlightType = 'oneway' | 'return';

export const FlightBooker = () => {
  const currentDate = new Date();
  const defaultDateString = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`

  const [startDateString, setStartDateString] = useState(defaultDateString);
  const [returnDateString, setReturnDateString] = useState(defaultDateString);
  const [flightType, setFlightType] = useState<FlightType>('oneway');
  
  const startDate = parseDate(startDateString);
  const returnDate = parseDate(returnDateString);

  const isStartDateValid = isValidDateString(startDateString);
  const isReturnDateValid = isValidDateString(returnDateString);
  const isSubmitDisabled = !isStartDateValid || !isReturnDateValid || isBefore(returnDate!, startDate!)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    switch(flightType) {
      case 'oneway':
        alert(`You have booked a one-way flight for ${startDateString}`);
        break;
      case 'return':
        alert(`You have booked a return flight from ${startDateString} to ${returnDateString}`);
        break;
    }
  }

  return (
    <article className={clsx('card', styles.container)}>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setFlightType(e.currentTarget.value as FlightType)}>
          <option value='oneway'>one-way flight</option>
          <option value='return'>return flight</option>
        </select>
        <input
          value={startDateString}
          aria-invalid={!isStartDateValid}
          onChange={(e) => setStartDateString(e.target.value)}
        />
        <input
          value={returnDateString}
          aria-invalid={!isReturnDateValid}
          disabled={flightType === 'oneway'}
          onChange={(e) => setReturnDateString(e.target.value)}
        />
        <button type='submit' disabled={isSubmitDisabled}>Book</button>
      </form>
    </article>
  )
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should validate date', () => {
    expect(isValidDateString('22.08.2022')).toBe(true);
    expect(isValidDateString('22.22.2022')).toBe(false);
    expect(isValidDateString('2222.2222.2222')).toBe(false);
    expect(isValidDateString('a.b.2222')).toBe(false);
  });

  it('should parse date', () => {
    expect(parseDate('22.08.2022')?.toDateString()).toBe(new Date('2022-08-22').toDateString());
  });
}