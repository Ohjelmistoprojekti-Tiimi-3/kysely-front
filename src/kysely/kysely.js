import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Vastaukset from './vastaukset';

function Kyselyt() {

    let { id } = useParams();
    const [kyselyt, setKyselyt] = React.useState();
    const [virhe, setVirhe] = React.useState('Haetaan...');
    const [open, setOpen] = React.useState(false);

    const fetchUrl = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/kyselyt/' + id);
            const json = await response.json();
            setKyselyt(json);
            setVirhe('');
            console.log(json);
            console.log(kyselyt);

        } catch (error) {
            setVirhe('Nyt meni jokin väärin.');
        }
    }

    const naytaVastaukset = () => {
        setOpen(true);
    }


    React.useEffect(() => { fetchUrl() }, []);

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
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>
                                    {kyselyt.title}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Button aria-label="answer" variant="contained" color="primary"
                                    component={Link} onClick={naytaVastaukset} to={'/vastaukset/' + id}>
                                    <Typography>Näytä vastaukset</Typography>
                                </Button>
                                <Vastaukset />
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
                        {/*tähän näin kysymys mappi*/}
                        {
                            kyselyt.questions.map(kysymykset => {
                                return (
                                    <div style={{ margin: 20 }}>
                                        <Button aria-label="answer" variant="contained" color="primary"
                                            component={Link} to={'/vastaa/' + kysymykset.questionId}>
                                            <Typography>{kysymykset.questionString}</Typography>
                                            <QuestionAnswerIcon style={{ color: '#FFFFFF' }} />
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            }
        </div>
    );
}

export default Kyselyt;