import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";

function Vastaa() {
  let { id } = useParams();
  const [kysymys, setKysymys] = React.useState("");
  const [vastaus, setVastaus] = React.useState({
    answer: "",
  });

  const [virhe, setVirhe] = React.useState("Haetaan...");

  const fetchUrl = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/kysymys/" + id);
      const json = await response.json();
      setKysymys(json);
      setVirhe("");
      console.log(json);
    } catch (error) {
      setVirhe("Nyt meni jokin väärin.");
    }
  };

  //Tilaa muuttava toiminto
  const muuta = (e) => {
    setVastaus({
      ...vastaus,
      [e.target.name]: e.target.value,
    });
    setVirhe("");
  };

  //Vastauksen lisäys
  /* const addVastaus = (e) => {
    e.preventDefault();
    if (vastaus.length === 0) {
      setVirhe("Virhe, kenttä on tyhjä.");
    } else {
      setVastaus("");
      setVirhe("Added succesfully.");
    }
  };
*/
  const sendResponse = () => {
    fetch("http://localhost:8080/api/tallennavastaus/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vastaus),
    }).catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchUrl();
  }, []);

  if (virhe.length > 0) {
    return (
      <Grid container spacing={3} alignItems="center" justify="center">
        <p>{virhe}</p>
      </Grid>
    );
  }

  return (
    <div>
      {
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={4}>
            <h2>{kysymys.questionString}</h2>
            <form>
              <TextField
                fullWidth
                label="Vastaus"
                name="answerText"
                value={vastaus.answerText}
                onChange={(e) => muuta(e)}
              />
              <br />
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                value="lisää"
                onClick={(e) => sendResponse()}
              >
                lisää
              </Button>
            </form>
            <p>{virhe}</p>
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default Vastaa;
