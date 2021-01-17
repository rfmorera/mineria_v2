import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
import { authActions as auth } from '../../_actions/auth.actions';
import connect from 'react-redux/es/connect/connect';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ActivateUser = ({
  match: {
    params: { uid, token }
  },
  loading,
  error,
  status,
  activateUser
}) => {
  const classes = useStyles();
  const [beforeSubmit, setBeforeSubmit] = useState(true);

  useEffect(() => {
    if (beforeSubmit) {
      setBeforeSubmit(false);
      activateUser(uid, token);
    }

    if (!loading) {
      if (error) {
        if (error === 400 || error === 403) {
          toast.error('Su token ha sido utilizado o está vencido.');
          return;
        } else {
          toast.error('Ocurrió un error. Inténtelo de nuevo.');
          return;
        }
      } else if (!beforeSubmit) {
        toast.success('Su cuenta ha sido activada exitosamente.');
      }
    }
  }, [loading, status, error]);

  return (
    <Page className={classes.root} title="Activar cuenta">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2" align="center">
              Activación de cuenta
            </Typography>
            <Box mt={2}>
              {loading ? (
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body1"
                  align="center"
                >
                  Espere un momento mientras activamos su cuenta.
                </Typography>
              ) : (
                <>
                  {error ? (
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body1"
                      align="center"
                    >
                      Este link ha sido utilizado o está vencido.
                      <br />
                      Intente iniciar sesión
                    </Typography>
                  ) : (
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body1"
                      align="center"
                    >
                      Inicie sesión para comenzar a usar nuestros servicios.
                    </Typography>
                  )}
                </>
              )}
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
    // <>
    //   <Col lg="5" md="7">
    //     <Card className="bg-secondary shadow border-0">
    //       {loading ? (
    //         <CardBody className="px-lg-5 py-lg-5">
    //           <div className="text-center text-muted mb-4">
    //             Espere un momento mientras activamos su cuenta.
    //             <br/>
    //             <i className="fas fa-spinner fa-spin"></i>
    //             <br />
    //           </div>
    //         </CardBody>
    //       ) : (
    //         <CardBody className="px-lg-5 py-lg-5">
    //           {error ? (
    //             <div className="text-center text-muted mb-4">
    //               Este link ha sido utilizado o está vencido.
    //               <br />
    //               Intente iniciar sesión
    //             </div>
    //           ) : (
    //             <div className="text-center text-muted mb-4">
    //               Su cuenta ha sido activada exitosamente.
    //               <br />
    //               Inicie sesión para comenzar a usar nuestros servicios.
    //             </div>
    //           )}
    //           <div className="text-center">
    //             <Link to="/auth/login" className="btn btn-primary mt-4">
    //               Iniciar Sesión
    //             </Link>
    //           </div>
    //         </CardBody>
    //       )}
    //     </Card>
    //     <Row className="mt-3">
    //       <Col xs="6">
    //         <Link className="text-light" to="/auth/login">
    //           <small>Iniciar Sesión</small>
    //         </Link>
    //       </Col>
    //       <Col className="text-right" xs="6">
    //         <Link className="text-light" to={'/auth/register'}>
    //           <small>Crear una nueva cuenta</small>
    //         </Link>
    //       </Col>
    //     </Row>
    //   </Col>
    // </>
  );
};

function mapStateToProps({ auth }) {
  return {
    loading: auth.activateUserRequest,
    error: auth.activateUserError,
    status: auth.activateUserStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    activateUser: (uid, token) => dispatch(auth.activateUser(uid, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);
