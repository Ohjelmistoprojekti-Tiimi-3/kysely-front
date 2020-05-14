import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function Vastaukset() {
  let { id } = useParams();
  const [vastaukset, setVastaukset] = useState([]);

  useEffect(() => {
    getVastaukset();
  }, []);

  const getVastaukset = () => {
    fetch("http://localhost:8080/api/kyselyt/" + id)
      .then((response) => response.json())
      .then((data) => setVastaukset(data.answer))
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      {vastaukset.map((vastaus) => (
        <li key={vastaus.id}> {vastaus.answer} </li>
      ))}
    </div>
  );
}

export default Vastaukset;
//
