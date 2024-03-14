const express = require('express');
const app = express();


const { selectTime } = require('./features/timeSlice');
const { useSelector } = require('react-redux');


app.get('/api/data', (req, res) => {

    const { totalTime, entries } = useSelector(selectTime);

    res.json({ totalTime, entries });
});

// Start the server
app.listen(3001, () => {
    console.log('API server is running on port 3001');
});
