import React, { useEffect } from 'react';
import style from './App.module.css';
import TimeTrackingForm from './components/TimeTrackingForm';
import TimeEntry from './components/TimeEntry';
import { useSelector } from 'react-redux';
import { selectTime } from './features/timeSlice';
import Select from './components/Select';


const tg = window.Telegram.WebApp;

function App() {
  const { totalTime, entries } = useSelector(selectTime);

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close()
  }

  return (
    <main>
      <h1>Time Tracking App</h1>
      <TimeTrackingForm />
      <h2>Total time: {totalTime} {totalTime > 1 ? 'hours' : "hour"}</h2>
      <h3>Entries:</h3>
      <Select/>
      {entries.map((entry, index) => (
        entry.visible? <TimeEntry key={index} entry={entry} index={index}/> : null
      ))}
      <button onClick={onClose} className={style.close_button}>Close</button>
    </main>
  );
}

export default App;
