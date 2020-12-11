import React, { useEffect } from 'react';
import { NivoLine } from '../../../components/Charts/NivoChart';
import { Typography, Grid, Box } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const SentimentRatioChart = ({ className, data, noTitle, ...rest }) => {
  console.log("chart -------------")
  console.log(data)
  console.log(data.length)
  console.log(typeof data)
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="flex-start"
      pt={5}
    >
      <Box p={3}>
        {noTitle !== true && (
          <Typography variant="h3">
            Relacion de sentimientos (Positivas/Negativas)
          </Typography>
        )}
      </Box>
      {data.length === 0 ? (
        <Box p={3} pt={5} width="100%">
          <LinearProgress />
        </Box>
      ) : (
        <Box height="80vh" width="100%">
          <NivoLine data={data} />
        </Box>
      )}
    </Grid>
  );
};

export default SentimentRatioChart;
