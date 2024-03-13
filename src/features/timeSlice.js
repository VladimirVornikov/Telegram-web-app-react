import { createSlice } from '@reduxjs/toolkit';

function totalTime(state) {
  return state.entries.reduce((acumm, currentValue) => acumm + currentValue.duration, 0);
}

function addVisibility(state) {
  return state.entries.map(elem => ({ ...elem, visible: true }));
}

const timeSlice = createSlice({
  name: 'time',
  initialState: {
    totalTime: 0,
    entries: [],
  },
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
      state.entries = addVisibility(state);
      state.totalTime = totalTime(state); 
    },
    deleteActivity: (state, action) => {
      state.entries = state.entries.filter((entry, index) => index !== action.payload);
      state.totalTime = totalTime(state); 
    },
    changeValue: (state, action) => {
      state.entries[action.payload.index].duration = action.payload.duration;
      state.totalTime = totalTime(state); 
    },
    sortBySelect: (state, action) => {
      switch(action.payload) {
        case "Last week":
          state.entries = state.entries.map(elem => ({
            ...elem,
            visible: (new Date().getTime() - Date.parse(elem.date)) <= 86400000 * 7 ? true : false
          }));
          break;
        case "Last month":
          state.entries = state.entries.map(elem => ({
            ...elem,
            visible: (new Date().getTime() - Date.parse(elem.date)) <= 86400000 * 30 ? true : false
          }));
          break;
        case "Last year":
          state.entries = state.entries.map(elem => ({
            ...elem,
            visible: (new Date().getTime() - Date.parse(elem.date)) <= 86400000 * 365 ? true : false
          }));
          break;
        default:
          state.entries = addVisibility(state);
          break;
      }
      state.totalTime = totalTime(state);
    },
    
  },
});

export const { addEntry, deleteActivity, changeValue, sortBySelect} = timeSlice.actions;

export const selectTime = (state) => state.time;

export default timeSlice.reducer;
