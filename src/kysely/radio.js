import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function Radiobutton() {
    let {id} = useParams();
    const [value, setValue] = React.useState();
    const [vaihtoehdot, setVaihtoehdot] = useState([]);


    const handleChange = (event) => {
        setValue(event.target.value);
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
        fetch("http://localhost:8080/api/tallennavaihtoehto/" + value)
            .catch((err) => console.error(err));
    };

    console.log(value);


    return (
        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="vaihtoehto" name="optionText" value={value} onChange={handleChange}>
                    {vaihtoehdot.map((vaihtoehto) => (
                        <FormControlLabel key={vaihtoehto.optionId} value={vaihtoehto.optionId} control={<Radio/>}
                                          label={vaihtoehto.optionText}> </FormControlLabel>
                    ))}
                </RadioGroup>
            </FormControl>
            <Button type="submit" style={{color: "Green"}} variant="outlined" color="primary">
                Lähetä
            </Button>
        </form>
    );
}