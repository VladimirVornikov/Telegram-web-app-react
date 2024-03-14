import React, { useCallback, useEffect } from 'react';
import style from './App.module.css';
import TimeTrackingForm from './components/TimeTrackingForm';
import TimeEntry from './components/TimeEntry';
import { useSelector } from 'react-redux';
import { selectTime } from './features/timeSlice';
import Select from './components/Select';
import { useTelegram } from './useTelegram/useTelegram';


function App() {
  const { totalTime, entries } = useSelector(selectTime);

  const {tg, queryId} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  const onSendData = useCallback(() => {
    tg.close()
    const data = {
        totalTime: totalTime,
        queryId,
    }
    console.log(data);
    fetch('http://85.119.146.179:8000/web-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}, [totalTime])

  

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
      <button onClick={onSendData} className={style.close_button}>Close</button>
    </main>
  );
}

export default App;
