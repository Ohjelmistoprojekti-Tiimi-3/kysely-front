import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Vastaukset from "./vastaukset";
import Vaihtoehdot from "./vaihtoehdot";
import Radio from "./radio";
import { useHistory } from "react-router-dom";
import { browserHistory } from "react-router";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Kyselyt() {
  let { id } = useParams();
  const [kyselyt, setKyselyt] = React.useState();
  const [virhe, setVirhe] = React.useState("Haetaan...");
  let history = useHistory();
  // const [open, setOpen] = React.useState(false);

  const fetchUrl = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/kyselyt/" + id);
      const json = await response.json();
      setKyselyt(json);
      setVirhe("");
      console.log(json);
      console.log(kyselyt);
    } catch (error) {
      setVirhe("Nyt meni jokin väärin.");
    }
  };

  /* const naytaVastaukset = () => {
    setOpen(true);
  };
*/
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
  /**const getVastaukset = () => {
    fetch("http://localhost:8080/api/kyselyt/" + id)
      .then((response) => response.json())
      .then((data) => setVastaukset(data.answer))
      .catch((err) => {
        console.error(err);
      });
  }; */

  const handleOnClick = (event) => {
    console.log(event);
    if (event.questionType.name === "Radio") {
      history.push('/radio/' + event.questionId)
    } else {
      history.push('/vastaa/' + + event.questionId)
    }
  };

  return (
    <div>
      {
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={4}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{kyselyt.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {/*<Button aria-label="answer" variant="contained" color="primary"
                                    component={Link} onClick={naytaVastaukset} to={'/vastaukset/' + id}>
                                    <Typography>Näytä vastaukset</Typography>
                                </Button>*/}
                {/**<Vastaukset /> tuli näkyviin kysely, kun tämä kommenteissa*/}
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={11}>
                    <Typography>
                      Id: {kyselyt.queryId} <br />
                      Date: {kyselyt.date.substr(0, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/*tähän näin kysymys mappi
            to={"/vastaa/" + kysymykset.questionId}
            component={Link}*/}
            {kyselyt.questions.map((kysymykset) => {
              return (
                <div key={kysymykset.questionId} style={{ margin: 20 }}>
                  <Button
                    aria-label="answer"
                    variant="contained"
                    color="primary"
                    onClick={(_) => handleOnClick(kysymykset)}
                  >
                    <Typography>{kysymykset.questionString}</Typography>
                    {/*<Typography>{kysymykset.option.optionText}</Typography>*/}
                    <Typography></Typography>
                    <QuestionAnswerIcon style={{ color: "#FFFFFF" }} />
                  </Button>
                  <div style={{ height: 10 }} />
                  {/*VAIHTOEHTO MAPPI?*/}
                  {/*{kysymykset.option.map((vaihtoehdot) => {
                    return (
                      <div key={vaihtoehdot.id}>
                        <Card>
                          <CardContent>{vaihtoehdot.optionText}</CardContent>
                        </Card>
                      </div>
                    );
                  })}*/}
                  {/*VAIHTOEHTO MAPPI LOPPUU?*/}
                  {/* VASTAUS MAPPI ALKAA */}
                  {kysymykset.answer.map((vastaukset) => {
                    return (
                    <div key={vastaukset.id}>
                        <Card>
                          <CardContent>{vastaukset.answerText}</CardContent>{" "}
                          {/*Muutettiin vastaukset.answer */}
                        </Card>

                        <div style={{ height: 5 }} />
                      </div>
                    );
                  })}
                  {/* VASTAUS MAPPI LOPPUU */}
                </div>
              );
            })}
          </Grid>
        </Grid>
      }
    </div>
  );
}
export default Kyselyt;
