import React from 'react';
import { withRouter } from 'react-router';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/views/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = ({ history }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: La página que está buscando no se encuentra
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Usted ha usado una ruta equivocada o llegó hasta aquí por error.
            Intente usando el menú de navegación.
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
          <Box textAlign="center">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                history.push('/auth');
              }}
            >
              Sacame de aquí
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default withRouter(NotFoundView);
