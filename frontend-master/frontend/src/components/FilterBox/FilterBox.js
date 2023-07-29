import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Checkbox, FormLabel } from '@mui/material';

const FilterBox = ({ properties, selectedProperties, handleChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select properties to show:</FormLabel>
      <FormGroup>
        {properties.map((property) => (
          <FormControlLabel
            key={property.id}
            control={
              <Checkbox checked={selectedProperties.includes(property.id)} onChange={handleChange} name={property.id} />
            }
            label={property.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FilterBox;
