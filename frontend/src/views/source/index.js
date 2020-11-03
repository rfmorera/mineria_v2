import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/views/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

import { sourceActions } from '../../_actions/source.actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SourceListView = ({
  loading,
  sources,
  count,
  getSourcelists,
  deleteSource
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSourcelists(1);
  }, []);

  return (
    <Page className={classes.root} title="Fuentes">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results sources={sources} count={count} getSourcelists={getSourcelists}/>
        </Box>
      </Container>
    </Page>
  );
};

function mapStateToProps({ sources }) {
  console.log("change")
  console.log(sources)
  return {
    loading: sources.loadingSourcesList,
    sources: sources.sourcesList,
    count: sources.sourcesCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSourcelists: page => {
      dispatch(sourceActions.getSourcesList(page));
    },
    deleteSource: sourceId => {
      dispatch(sourceActions.deleteSource(sourceId));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SourceListView);
