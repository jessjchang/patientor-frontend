import React from 'react';

import { OccupationalHealthcareEntry as OccupationalHealthcare } from '../types';
import { useStateValue } from "../state";
import { Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Box marginTop={1} marginBottom={1} border={1} borderRadius={2} borderColor="black">
      <div>{entry.date} <WorkIcon /> <em>{entry.employerName}</em></div>
      <div><em>{entry.description}</em></div>
      {entry.diagnosisCodes ?
        <ul>
          {entry.diagnosisCodes.map(code => {
            return <li key={code}>{code} {diagnoses[code].name}</li>;
          })}
        </ul>
        : ''}
      {entry.sickLeave ?
        <div>sick leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</div>
        : ''
      }
      <div>diagnosed by {entry.specialist}</div>
    </Box>
  );
};

export default OccupationalHealthcareEntry;