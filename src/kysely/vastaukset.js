import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

function Vastaukset() {
    const [vastaukset, setVastaukset] = useState([]);

    useEffect(() => {
        getVastaukset();
    }, [])

    const getVastaukset = () => {
        fetch('http://localhost:8080/api/kyselyt/' + id)
        .then(response => response.json())
        .then(data => setVastaukset(questions.answer.answer))
        .catch(err => console.error(err))
    }
return (
    <div>
        {vastaukset}
    </div>
)


}

export default Vastaukset;