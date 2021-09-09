import React from 'react';
import { Link } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import useApi from "../../hooks/useFetch";
import Button from '@material-ui/core/Button';



interface Document {
  id: string;
  url: string;
  name: string;
}

interface DataResponse { 
  documents: Document[];
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1)
  }
}));


export default function Orders() {

  const classes = useStyles();

  const { data } = useApi('/users/documents', {});
  const documents = (data as DataResponse)?.documents;
  console.log(documents);
  if(!documents) {
      return <h1>Loading</h1>
  }

  return (
    <React.Fragment>
      <Title>Usuários</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome do documento</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.url}>
              <TableCell>{document.name}</TableCell>
              <TableCell>              
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={( event ) => window.location.href = document.url}
                  >
                    Visualizar Documento
                </Button></TableCell>
                <TableCell>
                <a href={document.url} download>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}> 
                      Baixar Documento
                  </Button>  
                </a>              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}