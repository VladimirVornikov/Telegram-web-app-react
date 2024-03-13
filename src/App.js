import React, { useEffect } from 'react';
import './App.css';
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
    <div style={{marginLeft: "10px"}}>
      <h1>Time Tracking App</h1>
      <TimeTrackingForm />
      <h2>Total Time: {totalTime} hours</h2>
      <h3>Entries:</h3>
      <Select/>
      {entries.map((entry, index) => (
        entry.visible? <TimeEntry key={index} entry={entry} index={index}/> : null
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
