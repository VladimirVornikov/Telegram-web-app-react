import React, { useCallback, useEffect, useState } from 'react';
import style from './App.module.css';
import TimeTrackingForm from './components/TimeTrackingForm';
import TimeEntry from './components/TimeEntry';
import { useSelector } from 'react-redux';
import { selectTime } from './features/timeSlice';
import Select from './components/Select';
import Webcam from 'react-webcam';
import { useRef } from 'react';

function App() {
  const { totalTime, entries } = useSelector(selectTime);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const webRef = useRef(null);

  const tg = window.Telegram.WebApp;
  console.log(tg);

  useEffect(() => {
    tg.expand();
  }, []);

  const onSendData = useCallback(() => {
    const data = {
      totalTime,
    };
    tg.sendData(JSON.stringify(data));
    tg.close();
  }, [totalTime]);

  useEffect(() => {
    tg.onEvent("MainButton", onSendData);
    return () => {
      tg.offEvent("MainButton", onSendData);
    };
  }, [onSendData]);

  const toggleCamera = () => {
    setIsCameraOpen(prevState => !prevState);
  };

  const takePicture = useCallback(() => {
    const picture = webRef.current.getScreenshot();
    setPicture(picture);
  }, []);

  const handleMainButtonClick = () => {
    onSendData(); 
  };

  return (
    <main>
      <h1>Time Tracking App</h1>
      <TimeTrackingForm />
      <h2>Total time: {totalTime} {totalTime > 1 ? 'hours' : "hour"}</h2>
      <h3>Entries:</h3>
      <Select/>
      {entries.map((entry, index) => (
        entry.visible ? <TimeEntry key={index} entry={entry} index={index}/> : null
      ))}
      <button onClick={toggleCamera} className={style.close_button}>Toggle Camera</button>
      {isCameraOpen && (
        <div className={style.camera_container}>
          <Webcam className={style.camera} ref={webRef}/>
          <button onClick={takePicture} className={style.image_picture}>Take Picture</button>
          {picture && <img src={picture} className={style.picture} alt="Captured" />}
        </div>
      )}
      <button onClick={handleMainButtonClick} className={style.close_button}>Close</button>
    </main>
  );
}

export default App;
