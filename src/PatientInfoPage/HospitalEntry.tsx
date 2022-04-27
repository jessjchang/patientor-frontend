import React from 'react';

import { HospitalEntry as Hospital } from '../types';
import { useStateValue } from "../state";
import { Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Box marginTop={1} marginBottom={1} border={1} borderRadius={2} borderColor="black">
      <div>{entry.date} <LocalHospitalIcon /></div>
      <div><em>{entry.description}</em></div>
      {entry.diagnosisCodes ?
        <ul>
          {entry.diagnosisCodes.map(code => {
            return <li key={code}>{code} {diagnoses[code].name}</li>;
          })}
        </ul>
        : ''}
      <div>discharge: {entry.discharge.date} - <em>{entry.discharge.criteria}</em></div>
      <div>diagnosed by {entry.specialist}</div>
    </Box>
  );
};

export default HospitalEntry;