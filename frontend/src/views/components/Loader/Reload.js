import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Button } from '@material-ui/core';

const Reload = ({ onReload }) => (
  <Card className={classes.root}>
    <CardContent>
      <div className="text-center py-5">
        <h2>No se pudo obtener la información</h2>
        <div className="mt-3">
          <Button color="secondary" onClick={onReload}>
            Intentar de nuevo
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

Reload.propTypes = {
  onReload: PropTypes.func.isRequired
};

export default Reload;
