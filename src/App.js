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

  useEffect(() => {
    tg.ready();
  }, []);

  const onSendData = useCallback((url) => {
    const data = {
      totalTime,
      picture: `${url}`
    };
    
    console.log(data);
    tg.sendData(JSON.stringify(data));
    tg.close();
  }, [totalTime, tg]);

  useEffect(() => {
    tg.onEvent("MainButton", onSendData);
    const handleUnload = () => {
      if (picture) {
        handleMainButtonClick();
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      tg.offEvent("MainButton", onSendData);
    };
  }, [onSendData, picture, tg]);

  const toggleCamera = () => {
    setIsCameraOpen(prevState => !prevState);
  };

  const takePicture = useCallback(() => {
    const picture = webRef.current.getScreenshot();
    setPicture(picture);
  }, []);

  const handleMainButtonClick = () => {
    if (!picture) return;

    const pictureDataUrl = picture.split(',')[1]; 
    const postData = {
      key: '7af0c8e456d8dd91c587dab2038961f4', 
      image: pictureDataUrl,
      name: 'image.jpg', 
    };
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        let url = data.data.url_viewer
        onSendData(url);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
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
          <Webcam className={style.camera} ref={webRef} screenshotFormat='image/jpeg'/>
          <button onClick={takePicture} className={style.image_picture}>Take Picture</button>
          {picture && (
            <>
              <img src={picture} className={style.picture} alt="Captured" />
            </>
          )}
        </div>
      )}
      <button onClick={handleMainButtonClick} className={style.close_button}>Close</button>
    </main>
  );
}

export default App;
