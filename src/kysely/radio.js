import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function Radiobutton() {
    let {id} = useParams();
    const [valinta, setValinta] = React.useState();
    const [vaihtoehdot, setVaihtoehdot] = useState([]);


    const handleChange = (event) => {
        setValinta(event.target.value);
    };

    useEffect(() => {
        getVaihtoehdot();
    }, []);

    const getVaihtoehdot = () => {
        fetch("http://localhost:8080/api/kysymys/" + id)
            .then((response) => response.json())
            .then((data) => setVaihtoehdot(data.option))
            .catch((err) => console.error(err));
    };

    const handleSubmit = () => {
        fetch("http://localhost:8080/api/tallennavaihtoehto/" + valinta, {
            method:"POST"
        }).catch((err) => console.log(err));
    };

    console.log(valinta);


    return (
        <FormControl  onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="vaihtoehto" name="optionText"  onClick={handleChange}>
                    {vaihtoehdot.map((vaihtoehto) => (
                        <FormControlLabel key={vaihtoehto.optionId} value={vaihtoehto.optionId.toString()} control={<Radio/>}
                                          label={vaihtoehto.optionText} className="genre-item"> </FormControlLabel>
                    ))}
                </RadioGroup>
            </FormControl>
            <Button onClick={_ => handleSubmit()} style={{color: "Green"}} variant="outlined" color="primary">
                Lähetä
            </Button>
        </FormControl >
    );
}