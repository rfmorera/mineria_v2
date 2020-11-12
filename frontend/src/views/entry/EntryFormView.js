import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { entryActions } from '../../_actions/entry.actions';
import { sourceActions } from '../../_actions/source.actions';
import EntryForm from './components/EntryForm';

const EntryFormView = props => {
  let {
    creatingEntry,
    entry,
    entryErrorMessage,
    postEntry,
    getEntry,
    patchEntry,
    clearEntry,
    getAllSourcesList,
    sourcesList
  } = props;
  let { id } = useParams();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id !== 'add' && id !== undefined) {
      getEntry(id);
      setUpdating(true);
    } else {
      setUpdating(false);
    }
    getAllSourcesList();
  }, [id]);
  id = id === 'add' ? undefined : id;
  return <EntryForm props={{ id, ...props }} />;
};

function mapStateToProps({ entries, sources }, ownProps) {
  return {
    creatingEntry: entries.creatingEntry,
    entry: entries.entry,
    entryErrorMessage: entries.entryErrorMessage,
    sourcesList: sources.sourcesList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postEntry: entry => {
      dispatch(entryActions.postEntry(entry));
    },
    getEntry: id => {
      dispatch(entryActions.getEntry(id));
    },
    patchEntry: (id, entry) => {
      dispatch(entryActions.patchEntry(id, entry));
    },
    clearEntry: () => {
      dispatch(entryActions.clearEntry());
    },
    getAllSourcesList: () => {
      dispatch(sourceActions.getSourcesList(0, false));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryFormView);
