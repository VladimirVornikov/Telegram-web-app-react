import { changeValue, deleteActivity } from '../features/timeSlice';
import style from "./TimeEntry.module.css"
import { useDispatch } from 'react-redux';
import React from 'react';

function TimeEntry(props) {
  const { index, entry } = props;
  const dispatch = useDispatch();

  return (
    <div className={style.time_entry}>
      <p><b>{entry.description}:</b></p>
      <p><b>Duration: </b>
      <input value={entry.duration} className={style.input_duration}
          onChange={(e) => dispatch(changeValue({ index, duration: parseInt(e.target.value) }))} /> {entry.duration > 1 ? "hours" : "hour"},</p>
      <p><b>Date: </b>{entry.date}.</p>
      <button onClick={() => {dispatch(deleteActivity(index))}} 
      className={style.delete_button}>X</button>
    </div>
  );
}

export default TimeEntry;
