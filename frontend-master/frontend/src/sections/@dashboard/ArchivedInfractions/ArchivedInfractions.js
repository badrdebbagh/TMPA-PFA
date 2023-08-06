/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
//@mui
import {
  Link,
  Table,
  Stack,
  Paper,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
  FormControl,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import BasicAlerts from 'src/components/Alert/alert1';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'declarationAuteur',
    numeric: false,
    disablePadding: true,
    label: 'declarationAuteur',
  },
  {
    id: 'numeroDeclaration',
    numeric: true,
    disablePadding: true,
    label: 'numeroDeclaration',
  },
  {
    id: 'immatriculationVehicule',
    numeric: true,
    disablePadding: false,
    label: 'immatriculationVehicule',
  },
  {
    id: 'dateHeureInfraction',
    numeric: true,
    disablePadding: false,
    label: 'dateHeureInfraction',
  },
  {
    id: 'lieuInfraction',
    numeric: true,
    disablePadding: false,
    label: 'lieuInfraction',
  },
  {
    id: 'excesDeVitesse',
    numeric: true,
    disablePadding: false,
    label: 'excesDeVitesse',
  },
  {
    id: 'vitesseEnregistree',
    numeric: true,
    disablePadding: false,
    label: 'vitesseEnregistree',
  },
  {
    id: 'vitesseAutorisee',
    numeric: true,
    disablePadding: false,
    label: 'vitesseAutorisee',
  },
  {
    id: 'dateConstatation',
    numeric: true,
    disablePadding: false,
    label: 'dateConstatation',
  },
  {
    id: 'montantInfraction',
    numeric: true,
    disablePadding: false,
    label: 'montantInfraction',
  },
  {
    id: 'nombrePointsRetires',
    numeric: true,
    disablePadding: false,
    label: 'nombrePointsRetires',
  },
  {
    id: 'Action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Infraction
        </Typography>
      )}

      {/*  {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton  onClick={() => OnDelete(collab._id) }>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [archivedInfractions, setArchivedInfractions] = useState([]);
  const [lastname, setlastname] = useState([]);
  const [firstname, setfirstname] = useState([]);
  const [email, setemail] = useState([]);
  const [phone, setphone] = useState([]);
  const [password, setpassword] = useState([]);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/api/archivedInfractions', form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        setErrors({});
      })
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    // Fetch archived vehicles data from the server
    Axios.get('http://localhost:3001/api/archivedInfractions').then((res) => {
      setArchivedInfractions(res.data);
    });
    const itemCount = archivedInfractions.length;
    if (itemCount > 0) {
      const defaultRowsPerPage = Math.min(10, itemCount); // Set a maximum of 10 rows per page
      setRowsPerPage(defaultRowsPerPage);
    }
  }, [archivedInfractions]);

  const CreateUser = () => {
    Axios.post('http://localhost:3001/api/archivedInfractions', {
      lastname,
      firstname,
      email,
      phone,
      password,
    })
      .then((res) => {
        console.log(res.data);
        setForm({});
        setErrors({});
      })
      .catch((err) => setErrors(err.response.data));
  };

  // const OnDelete = (id) => {
  //   if (window.confirm('Are you sure to delete this vehicle?')) {
  //     Axios.delete(`http://localhost:3001/api/archivedarchivedInfractions/${id}`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setMessage(res.data.message);
  //         setShow(true);
  //         setTimeout(() => {
  //           setShow(false);
  //         }, 4000);
  //       })
  //       .catch((err) => setErrors(err.response.data));
  //   }
  // };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /* HHHHHHHHHHHHHHHHHHHHHHHH */

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = collab.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - archivedInfractions.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(archivedInfractions, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, archivedInfractions]
  );

  return (
    <>
      <BasicAlerts message={message} show={show} />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={archivedInfractions.length}
              />
              <TableBody>
                {visibleRows.map((archivedInfractions, index) => {
                  const isItemSelected = isSelected(archivedInfractions._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, archivedInfractions._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={archivedInfractions._id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': archivedInfractions._id,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" _id={archivedInfractions._id} scope="row" padding="none">
                        {archivedInfractions.declarationAuteur}
                      </TableCell>
                      <TableCell align="right">{archivedInfractions.numeroDeclaration}</TableCell>
                      <TableCell align="right">{archivedInfractions.immatriculationVehicule}</TableCell>
                      <TableCell align="right">{archivedInfractions.dateHeureInfraction}</TableCell>
                      <TableCell align="right">{archivedInfractions.lieuInfraction}</TableCell>
                      <TableCell align="right">{archivedInfractions.excesDeVitesse}</TableCell>
                      <TableCell align="right">{archivedInfractions.vitesseEnregistree}</TableCell>
                      <TableCell align="right">{archivedInfractions.dateConstatation}</TableCell>
                      <TableCell align="right">{archivedInfractions.montantInfraction}</TableCell>
                      <TableCell align="right">{archivedInfractions.nombrePointsRetires}</TableCell>{' '}
                      <TableCell align="right">
                        <Button
                          component={RouterLink}
                          to={`http://localhost:3000/dashboard/editarchivedInfractions/${archivedInfractions._id}`}
                          endIcon={<EditIcon />}
                        >
                          Modifier
                        </Button>{' '}
                        <Button endIcon={<DeleteIcon />} onClick={() => OnDelete(archivedInfractions._id)}>
                          Archiver
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={archivedInfractions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      </Box>
    </>
  );
}
