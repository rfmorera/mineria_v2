import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  mixButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({
  className,
  history,
  selectedReportSentimentIds,
  setSelectedReportSentimentIds,
  ...rest
}) => {
  const classes = useStyles();
  const [multipleview, setMultipleView] = useState(true);
  useEffect(() => {
    if (selectedReportSentimentIds.length > 1) {
      setMultipleView(false);
    } else {
      setMultipleView(true);
    }
  }, [selectedReportSentimentIds]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button
          className={classes.mixButton}
          color="primary"
          variant="contained"
          disabled={multipleview}
          onClick={() => {
            let ids = '';
            selectedReportSentimentIds.forEach(element => {
              ids += element + ',';
            });
            ids = ids.substring(0, ids.length - 1);
            const win = window.open('/auth/report-sentiment/' + ids, '_blank');
            win.focus();
          }}
        >
          Ver multiples
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            history.push('/admin/sources/add');
          }}
        >
          Añadir reporte
        </Button>
      </Box>
      {/* <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default withRouter(Toolbar);
