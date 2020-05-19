import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function Vastaa() {
  let { id } = useParams();
  const [kysymys, setKysymys] = React.useState("");
  const [vastaus, setVastaus] = React.useState({
    answer: "",
  });

  const [vaihtoehto, setVaihtoehto] = React.useState({ option: "", });
  // Radiobuttoniin
  const [value, setValue] = React.useState({ option: "", });
  const handleChange = (event) => {
    setValue(event.target.value);
  };

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

  /*{kysymykset.option.map((vaihtoehdot) => {
    return (
      <div key={vaihtoehdot.id}>
        <Card>
          <CardContent>{vaihtoehdot.optionText}</CardContent>
        </Card>
      </div>
    );
  })}*/


  if (vaihtoehto != null) {
    {vaihtoehto.map((vaihtoehdot) => {
    return (
      <FormControl component="fieldset">
        <RadioGroup aria-label="vaihtoehto" name="optionText" value={value} onChange={handleChange}>
          <FormControlLabel value={vaihtoehdot.optionText} control={<Radio />} label={vaihtoehdot.optionText} />
        </RadioGroup>
      </FormControl>
    )
    })}
  } else if (virhe.length > 0) {
    return (
      <Grid container spacing={3} alignItems="center" justify="center">
        <p>{virhe}</p>
      </Grid>
    );
  } else {
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
}

export default Vastaa;
