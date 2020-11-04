import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { sourceActions } from '../../_actions/source.actions';
import SourceForm from './components/SourceForm';
const SourceFormView = props => {
  let {
    creatingSource,
    source,
    sourceErrorMessage,
    postSource,
    getSource,
    putSource,
    clearSource
  } = props;
  let { id } = useParams();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id !== null) {
      getSource(id);
      setUpdating(true);
    } else {
      setUpdating(false);
    }
  }, id);
  return <SourceForm props={{id, ...props}} />;
};

function mapStateToProps({ sources }, ownProps) {
  return {
    creatingSource: sources.creatingSource,
    source: sources.source,
    sourceErrorMessage: sources.sourceErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postSource: source => {
      dispatch(sourceActions.postSource(source));
    },
    getSource: id => {
      dispatch(sourceActions.getSource(id));
    },
    putSource: (id, source) => {
      dispatch(sourceActions.putSource(id, source));
    },
    clearSource: () => {
      dispatch(sourceActions.clearSource());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceFormView);
