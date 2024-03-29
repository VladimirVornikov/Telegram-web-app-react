import style from "./TimeTrackingForm.module.css"
import { addEntry } from '../features/timeSlice';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

const TimeTrackingForm = () => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [userDate, setUserDate] = useState('')
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && duration && userDate) {
      dispatch(addEntry({ description, duration: parseInt(duration), date: userDate} ));
      setDescription('');
      setDuration('');
    }
  };

  const currentDate = new Date();
  const formattedString = currentDate.toLocaleDateString('en-CA'); 

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label>
        Description:
        <select className={style.select} name="sort_category" 
            onChange={(e) => setDescription(e.target.value)} value={description}>
              <option value="">By default</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Free time">Free time</option>
              <option value="Chores">Chores</option>
              <option value="Sleep">Sleep</option>
        </select>
      </label>

      <label>
        Duration (hours):
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)}/>
      </label>
      <label>
        Date:
        <input type="date" max = {formattedString}  onChange={(e) => setUserDate(e.target.value)}/>
      </label>
      <button type="submit" className={style.button_add}>Add Entry</button>
    </form>
  );
};

export default TimeTrackingForm;
