import React, { useEffect, usePara, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { entryActions } from '../../_actions/entry.actions';
import EntryForm from './components/EntryForm';

const EntryFormView = props => {
  let {
    creatingEntry,
    entry,
    entryErrorMessage,
    postEntry,
    getEntry,
    putEntry,
    clearEntry
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
  }, id);
  id = id === 'add' ? undefined : id;
  return <EntryForm props={{ id, ...props }} />;
};

function mapStateToProps({ entries }, ownProps) {
  return {
    creatingEntry: entries.creatingEntry,
    entry: entries.entry,
    entryErrorMessage: entries.entryErrorMessage
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
    putEntry: (id, entry) => {
      dispatch(entryActions.putEntry(id, entry));
    },
    clearEntry: () => {
      dispatch(entryActions.clearEntry());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryFormView);
