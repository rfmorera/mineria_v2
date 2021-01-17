import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/views/components/Page';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PasswordResetSuccess = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Contraseña Perdida">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2" align="center">
              Recuperación de contraseña
            </Typography>
            <Box mt={2}>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body1"
                align="center"
              >
                Le hemos enviado un correo con un enlace para que pueda
                recuperar su contraseña
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body1"
                align="center"
              >
                Revise su carpeta de SPAM si no lo encuentra
              </Typography>
            </Box>
          </Box>
          <Typography color="textSecondary" variant="body1" align="center">
            <Button
              component={RouterLink}
              to="/auth/login"
              variant="contained"
              color="primary"
            >
              Inicie sesión
            </Button>
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default PasswordResetSuccess;
