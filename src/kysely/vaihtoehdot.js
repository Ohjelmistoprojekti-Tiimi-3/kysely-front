import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function Vaihtoehdot() {
  let { id } = useParams();
  const [vaihtoehdot, setVaihtoehdot] = useState([]);

  useEffect(() => {
    getVaihtoehdot();
  }, []);

  const getVaihtoehdot = () => {
    fetch("https://kyselyappi.herokuapp.com/api/kyselyt/" + id)
      .then((response) => response.json())
      .then((data) => setVaihtoehdot(data.option))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {vaihtoehdot.map((vaihtoehto) => (
        <li key={vaihtoehto.id}> {vaihtoehto.option}</li>
      ))}
    </div>
  );
}

export default Vaihtoehdot;
