import React from 'react';

import { HealthCheckEntry as HealthCheck, HealthCheckRating } from '../types';
import { useStateValue } from "../state";
import { Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const healthIconColor = (rating: HealthCheckRating) => {
    if (rating === HealthCheckRating['Healthy']) {
      return 'green';
    } else if (rating === HealthCheckRating['LowRisk']) {
      return 'yellow';
    } else if (rating === HealthCheckRating['HighRisk']) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <Box marginTop={1} marginBottom={1} border={1} borderRadius={2} borderColor="black">
      <div>{entry.date} <FavoriteBorderIcon /></div>
      <div><em>{entry.description}</em></div>
      {entry.diagnosisCodes ?
        <ul>
          {entry.diagnosisCodes.map(code => {
            return <li key={code}>{code} {diagnoses[code].name}</li>;
          })}
        </ul>
        : ''}
      <FavoriteIcon style={{ color: healthIconColor(entry.healthCheckRating) }} />
      <div>diagnosed by {entry.specialist}</div>
    </Box>
  );
};

export default HealthCheckEntry;