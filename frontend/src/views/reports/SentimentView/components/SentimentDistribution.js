import React, { useEffect } from 'react';
import { NivoBar } from '../../../components/Charts/NivoChart';
import { Typography, Grid, Box } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const SentimentDistribution = ({ className, data, ...rest }) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="flex-start"
      pt={5}
    >
      <Box p={3} pt={5}>
        <Typography variant="h3">Distribución de Opiniones</Typography>
      </Box>

      {data.length === 0 ? (
        <Box p={3} pt={5} width="100%">
          <LinearProgress />
        </Box>
      ) : (
        <Box height="80vh" width="100%">
          <NivoBar
            data={data}
            indexBy="id"
            keys_data={['Positivas', 'Negativas']}
          />
        </Box>
      )}
    </Grid>
  );
};

export default SentimentDistribution;
