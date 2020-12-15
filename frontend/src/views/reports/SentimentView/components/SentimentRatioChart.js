import React, { useEffect } from 'react';
import { NivoLine } from '../../../components/Charts/NivoChart';
import { Typography, Grid, Box } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const SentimentRatioChart = ({
  className,
  data,
  noTitle,
  height,
  pt,
  legends_position,
  ...rest
}) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="flex-start"
      pt={pt}
    >
      <Box>
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
        <Box height={height} width="100%">
          <NivoLine data={data} legends_position={legends_position}/>
        </Box>
      )}
    </Grid>
  );
};

export default SentimentRatioChart;
