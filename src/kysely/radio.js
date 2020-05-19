import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function Radiobutton() {
    const [value, setValue] = React.useState('kyllä');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

return (
    <FormControl component="fieldset">
        <RadioGroup aria-label="vaihtoehto" name="optionText" value={value} onChange={handleChange}>
          <FormControlLabel value="kyllä" control={<Radio />} label="Kyllä" />
          <FormControlLabel value="ei" control={<Radio />} label="Ei" />
        </RadioGroup>
      </FormControl>
);
}