import { useState } from 'react';
import { Calendar } from './calendar';
import classes from './calendar.module.css';
import { LocaleContext } from './locale-contxt';
import { useDateInput } from './useDateInputHook';
import { PopupWindow } from '../popup-window';
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
    <br />
    Цель: <input type='date' />
    <LocaleContext value={locale}>
      <div className={classes.flex}>

        <Demo1 />
        <Demo2 />
        <DemoPopUp />
        {/* <DemoAsSelector /> */}
        <DemoSelectDay/>
        <DemoResult />
      </div>
    </LocaleContext>
  </>;
}


// function DateToYYYYMM(date) {
//   return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
// }

// function YYYYMMToDate(str) {
//   const [year, month] = str.split('-');
//   return new Date(year, month - 1, 1);
// }

function Demo1() {
  const
    { ref, date } = useDateInput(new Date('2001-02-03'));
  return <fieldset>
    <input type="month" ref={ref} />
    <legend>1)as indicator</legend>
    <Calendar date={date} />
  </fieldset>
}

function Demo2() {
  const date = new Date(0);
  return <fieldset>
    <legend>2) custom</legend>
    <LocaleContext value='fr'>
      <Calendar date={date} className={classes.custom} />
    </LocaleContext>
  </fieldset>
}

function DemoPopUp() {
  const
    [visible, setVisible] = useState(false);
  return <fieldset>
    <legend>3) demo pop-up</legend>
    <button onClick={() => setVisible(true)}>open</button>
    {visible && <PopupWindow>
      <button onClick={() => setVisible(false)}>close</button>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
    </PopupWindow>}
  </fieldset>;
}

// function DemoAsSelector() {
//   const
//     [date, setDate] = useState(new Date),
//     onClick = event => {
//       const
//         day = event.target.closest('[data-day]')?.dataset?.day;
//       if (+day) {
//         const
//           clone = new Date(date);
//         clone.setDate(day);
//         setDate(clone);
//       }

//     };
//   return <fieldset onClick={onClick}>
//     <Calendar date={date} />
//     result = {date.toLocaleDateString()};
//   </fieldset>
// }

function SelectDay({ date, setDate }) {
  return <div onClick={
    event => {
      const day = +event.target.closest('td[data-day]')?.dataset?.day;
      if (day)
        setDate(new Date(date.getFullYear(), date.getMonth(), day))
    }
  }>
    <Calendar date={date} />
  </div>;
}

function DemoSelectDay(){
  const
    [date, setDate] = useState(new Date);
  return <fieldset>
    <legend>4) demo SelectDay</legend>
    date: {date.toLocaleDateString()}
    <hr/>
   <SelectDay date={date} setDate={setDate} />
  </fieldset >;
}


function DemoResult() {
  const
    [date, setDate] = useState(new Date),
    [open, setOpen] = useState(false),
    onClick1 = () => setOpen(true),
    onClick2 = () => setOpen(false);
  return <fieldset >
    <legend>Итог</legend>
    <div
      onClick={onClick1}
      className={classes.dateselector}
    >
      {date.toLocaleDateString()}
    </div>
    <div onClick={onClick2}>
      {open && <PopupWindow>
        <SelectDay date={date} setDate={setDate} />
      </PopupWindow>}
    </div>
  </fieldset>
}