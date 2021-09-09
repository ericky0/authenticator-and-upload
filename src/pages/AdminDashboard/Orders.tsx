import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import history from '../../utils/History';
import Title from './Title';
import useApi from "../../hooks/useFetch";



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1)
  }
}));

interface User {
  id: string;
  name: string;
  email: string;
}

interface DataResponse { 
  users: User[];
}



export default function Orders() {

  // const context = useAuth();

  const handleClick = useCallback(
    async (event, userId) => {
        event.preventDefault();
        history.push('/upload', {userId})

    }, []);

  const classes = useStyles();
  
  const { data } = useApi('/listusers', {});
  const users = (data as DataResponse)?.users;
  console.log(users);
  if(!users) {
      return <h1>Loading</h1>
  }

  return (
    <React.Fragment>
      <Title>Usuários</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Upload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>      
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={( event )=> handleClick(event, user.id)}
                  >
                    Enviar Documento
                </Button>
              </TableCell>
              <TableCell align="right">{user.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}