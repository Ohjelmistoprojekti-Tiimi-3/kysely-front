import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { useParams } from 'react-router';

function Vastaukset() {

    let { id } = useParams();
    const [vastaukset, setVastaukset] = useState([]);

    useEffect(() => {
        getVastaukset();
    }, [])

    const getVastaukset = () => {
        fetch('http://localhost:8080/api/kyselyt/' + id)
        .then(response => response.json())
        .then(data => setVastaukset(data.questions[0].answer))
        .catch(err => console.error(err))
    }
return (
    <div>
        {vastaukset.map(vastaus =>
            <li>{vastaus}</li>)}
    </div>
)


}

export default Vastaukset;