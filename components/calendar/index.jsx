import { useState } from 'react';
import { Calendar } from './calendar';
import classes from './calendar.module.css';
import { LocaleContext } from './locale-contxt';
const
  today = new Date;

export default function DemoCalendar() {
  const
    [locale, setLocale] = useState('ru');

  return <>
    <label>
      locale:
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        {['ru', 'en', 'ar', 'zh', 'ko', 'ja']
          .map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
    <br/>
    Цель: <input type='date'/>
    <LocaleContext value={locale}>
      <div className={classes.flex}>
        
        <Demo1 />
        <Demo2 />
      </div>
    </LocaleContext>
  </>;
}

function Demo1() {
  return <fieldset>
    <legend>Demo1</legend>
    <Calendar date={today} />
  </fieldset>
}

function Demo2() {
  const date = new Date(0);
  return <fieldset>
    <legend>Demo2</legend>
    <LocaleContext value='fr'>
      <Calendar date={date} className={classes.custom}/>
    </LocaleContext>
  </fieldset>
}