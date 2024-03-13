import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { sortBySelect } from '../features/timeSlice';

export default function Select() {
    const dispatch = useDispatch();

    function handleSelect(e) {
        dispatch(sortBySelect(e.target.value))
    }


    return (
        <select onChange={handleSelect}>
            <option value="">All time</option>
            <option value="Last week">Last week</option> 
            <option value="Last month">Last month</option> 
            <option value="Last year">Last year</option> 
        </select>
    )
}
