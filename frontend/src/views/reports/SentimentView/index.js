import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/views/components/Page';
import Results from './components/Results';
import Toolbar from './components/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ReportSentimentListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Reportes Básicos">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default ReportSentimentListView;
