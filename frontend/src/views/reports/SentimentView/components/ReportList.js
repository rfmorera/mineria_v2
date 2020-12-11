import React, { useEffect, useState } from 'react';
import { NivoBar } from '../../../components/Charts/NivoChart';
import {
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const ReportList = ({
  className,
  total_reports,
  start_date,
  end_date,
  data,
  ...rest
}) => {
  const [page, setpage] = useState(0);
  return (
    <Grid
      container
      item
      xs={12}
      sm={6}
      alignItems="center"
      direction="column"
      justify="flex-start"
    >
      <Box p={3}>
        <Typography variant="h3">Descripción</Typography>
      </Box>
      <Box>
        <Typography variant="p"></Typography>
        Cantidad de reportes: <b>{total_reports}</b> | Fecha Inicio :{' '}
        <b>{start_date}</b> | Fecha Fin : <b>{end_date}</b>
      </Box>
      {data.length === 0 ? (
        <Box p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Box maxHeight="300px" width="100%">
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={data.length}
              page={page}
              rowsPerPage={5}
              rowsPerPageOptions={5}
            />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export default ReportList;
