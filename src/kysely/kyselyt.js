import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link } from 'react-router-dom';

function Kyselyt() {

    const [kyselyt, setKyselyt] = React.useState([]);
    const [virhe, setVirhe] = React.useState('Haetaan...');

    const fetchUrl = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/kyselyt');
            const json = await response.json();
            setKyselyt(json);
            setVirhe('');

        } catch(error) {
            setVirhe('Nyt meni jokin väärin.');
       }
    }


    React.useEffect( () => { fetchUrl() }, []);

    if (virhe.length > 0) {
        return(
            <Grid container spacing={3} alignItems="center" justify="center">
                <p>{ virhe }</p>
            </Grid>
        );
    }

    return (
        <div>
            {
                kyselyt.map( kyselyt =>{
                    return(
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
                                        <Grid container alignItems="center" justify="center">
                                        <Grid item xs={11}>
                                            <Typography>
                                                Id: { kyselyt.queryId } <br/>
                                                Date: { kyselyt.date.substr(0,10) }
                                            </Typography>
                                        </Grid>
                                    
                                        <Grid item xs={1}>
                                            <IconButton aria-label="answer" component={Link}
                                            to ={'/kysely/' + kyselyt.queryId}>
                                                <QuestionAnswerIcon style={{ color: '#FFFFFF' }}/>
                                            </IconButton>
                                        </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </div>
    );
}

export default Kyselyt;