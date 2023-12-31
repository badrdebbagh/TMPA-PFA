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

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { DataGrid, GridCheckbox } from '@mui/x-data-grid';

import GetAppIcon from '@mui/icons-material/GetApp';
import { saveAs } from 'file-saver';
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
import FilterBox from 'src/components/FilterBox/FilterBox';
import { id } from 'date-fns/locale';
import * as XLSX from 'xlsx';

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
    id: 'N° Parc',
    numeric: false,
    disablePadding: true,
    label: 'N° Parc',
  },
  {
    id: 'WW',
    numeric: true,
    disablePadding: true,
    label: 'WW',
  },
  {
    id: 'n° de Châssis',
    numeric: true,
    disablePadding: false,
    label: 'n° de Châssis',
  },
  {
    id: 'D.M  Circulation',
    numeric: true,
    disablePadding: false,
    label: 'D.M  Circulation',
  },
  {
    id: 'P.F',
    numeric: true,
    disablePadding: false,
    label: 'P.F',
  },
  {
    id: 'N° Immat.',
    numeric: true,
    disablePadding: false,
    label: 'N° Immat.',
  },
  {
    id: 'Marque',
    numeric: true,
    disablePadding: false,
    label: 'Marque',
  },
  {
    id: 'Couleur',
    numeric: true,
    disablePadding: false,
    label: 'Couleur',
  },
  {
    id: 'Prestataire',
    numeric: true,
    disablePadding: false,
    label: 'Prestataire',
  },
  {
    id: 'Fonct SERVICE',
    numeric: true,
    disablePadding: false,
    label: 'Fonct SERVICE',
  },
  {
    id: 'Réf. Pneus',
    numeric: true,
    disablePadding: false,
    label: 'Réf. Pneus',
  },
  {
    id: 'Échéance Aut.Circulation',
    numeric: true,
    disablePadding: false,
    label: 'Échéance Aut.Circulation',
  },
  {
    id: 'Échéance Visite Tech.',
    numeric: true,
    disablePadding: false,
    label: 'Échéance Visite Tech.',
  },
  {
    id: 'Assurance Contrat En Cours',
    numeric: true,
    disablePadding: false,
    label: 'Assurance Contrat En Cours',
  },
  {
    id: 'Cartes Verte',
    numeric: true,
    disablePadding: false,
    label: 'Cartes Verte',
  },
  {
    id: 'Vignète',
    numeric: true,
    disablePadding: false,
    label: 'Vignète ',
  },
  {
    id: 'Action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// function EnhancedTableHead(props) {
//   const [vehicule, setvehicule] = useState([]);
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };
//   useEffect(() => {
//     Axios.get('http://localhost:3001/api/vehicule').then((res) => {
//       setvehicule(res.data);
//     });

//     // Fetch the number of items from the database or any other source
//     // const itemCount = vehicule.length; // Replace 'users' with your data source

//     // Set the default rows per page based on the item count
//     // if (itemCount > 0) {
//     //   const defaultRowsPerPage = Math.min(10, itemCount); // Set a maximum of 10 rows per page
//     //   setRowsPerPage(defaultRowsPerPage);
//     // }
//   }, [vehicule]);

//   const tableHeaders = Object.keys(vehicule[0]);
//   console.log('heads in table head', tableHeaders);

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {tableHeaders.map((headCell) => (
//           <TableCell
//             key={headCell}
//             // align={headCell.numeric ? 'right' : 'left'}
//             // padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell}
//               direction={orderBy === headCell ? order : 'asc'}
//               onClick={createSortHandler(headCell)}
//             >
//               {headCell}
//               {orderBy === headCell ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

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
          Véhicule
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

export default function EnhancedTable(props) {
  const [openColumnDialog, setOpenColumnDialog] = useState(false);

  // Function to handle opening the column selection dialog
  const handleOpenColumnDialog = () => {
    setOpenColumnDialog(true);
  };

  // Function to handle closing the column selection dialog
  const handleCloseColumnDialog = () => {
    setOpenColumnDialog(false);
  };

  const handleSaveColumn = () => {
    const accessToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: accessToken,
      },
    };

    console.log('Sending request with token:', accessToken);

    console.log('Selected columns data:', selectedColumns);

    // Create an object with the selectedColumns field
    const requestBody = { selectedColumns };

    Axios.post('http://localhost:3001/api/users/save-columns', requestBody, config)
      .then((res) => {
        if (res.data) {
          console.log('Response from the server:', res.data);
          // Handle the response data here if needed
        }
        console.log('Selected columns saved successfully');
        handleCloseColumnDialog();
      })
      .catch((err) => {
        console.error('Error saving selected columns:', err);
      });
  };

  const [vehicule, setvehicule] = useState([]);
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

  const handleChange = (event) => {
    const propertyId = event.target.name;

    // setSelectedColumns((prevSelected) => {
    //   const updatedSelected = event.target.checked
    //     ? [...prevSelected, propertyId]
    //     : prevSelected.filter((prop) => prop !== propertyId);

    //   // Make a request to the backend to save the selected column preferences
    //   Axios.post('http://localhost:3001/api/save-columns', {
    //     userId: '64c636223f23ac539a0acd4a', // Replace with the actual authenticated user ID
    //     selectedColumns: updatedSelected, // Send the updated selectedColumns array to the backend
    //   })
    //     .then((res) => {
    //       console.log('Column preferences saved successfully');
    //     })
    //     .catch((err) => {
    //       console.error('Error saving column preferences:', err);
    //     });

    //   return updatedSelected; // Return the updatedSelected to update the state immediately
    // });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/api/vehicule', form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        setErrors({});
      })
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/api/vehicule').then((res) => {
      setvehicule(res.data);
    });

    // Fetch the number of items from the database or any other source
    const itemCount = vehicule.length; // Replace 'users' with your data source

    // Set the default rows per page based on the item count
    if (itemCount > 0) {
      const defaultRowsPerPage = Math.min(10, itemCount); // Set a maximum of 10 rows per page
      setRowsPerPage(defaultRowsPerPage);
    }
  }, [vehicule]);

  const CreateUser = () => {
    Axios.post('http://localhost:3001/api/vehicule', {
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

  const OnDelete = (id) => {
    if (window.confirm('Are you sure to delete this vehicle?')) {
      Axios.delete(`http://localhost:3001/api/vehicule/${id}`)
        .then((res) => {
          console.log(res.data);
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        })
        .catch((err) => setErrors(err.response.data));
    }
  };
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
      const newSelected = vehicule.map((n) => n._id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vehicule.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(vehicule, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, vehicule]
  );
  // const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [selectedColumns, setSelectedColumns] = React.useState(
    headCells.map((headCell) => headCell.id) // Initialize with all properties selected by default
  );

  const handleColumnToggle = (event) => {
    const propertyId = event.target.name;
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(propertyId)
        ? prevSelectedColumns.filter((col) => col !== propertyId)
        : [...prevSelectedColumns, propertyId]
    );
  };

  const exportToExcel = () => {
    // Filter the rows based on the selected columns
    const rowsToExport = rows.map((row) =>
      Object.keys(row).reduce((obj, key) => {
        if (selectedColumns.includes(key)) {
          obj[key] = row[key];
        }
        return obj;
      }, {})
    );

    // Convert the filtered rows to an Excel sheet
    const sheet = XLSX.utils.json_to_sheet(rowsToExport);

    // Create a new workbook and add the sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'exported_data.xlsx');
  };
  const columns = [
    {
      field: 'N° Parc',
      headerName: 'N° Parc',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      // renderHeader: (params) => {
      //   return (
      //     <FormControlLabel
      //       control={
      //         <Checkbox
      //           checked={selectedColumns.includes(params.field)}
      //           onChange={() => handleColumnToggle(params.field)}
      //         />
      //       }
      //       label={params.field}
      //     />
      //   );
      // },
    },
    {
      field: 'WW',
      headerName: 'WW',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'n° de Châssis',
      headerName: 'n° de Châssis',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'D.M  Circulation',
      headerName: 'D.M  Circulation',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'P.F',
      headerName: 'P.F',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'N° Immat.',
      headerName: 'N° Immat.',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Marque',
      headerName: 'Marque',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Couleur',
      headerName: 'Couleur',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Prestataire',
      headerName: 'Prestataire',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Fonct SERVICE',
      headerName: 'Fonct SERVICE',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Échéance Aut.Circulation',
      headerName: 'Échéance Aut.Circulation',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Échéance Visite Tech.',
      headerName: 'Échéance Visite Tech.',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Assurance Contrat En Cours',
      headerName: 'Assurance Contrat En Cours',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Cartes Verte',
      headerName: 'Cartes Verte',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Vignète',
      headerName: 'Vignète',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    // ... Define other columns similarly based on your data
  ].filter((column) => selectedColumns.includes(column.field));
  const getVisibleColumns = () => {
    return columns.filter((column) => selectedColumns.includes(column.field));
  };
  const visibleColumns = getVisibleColumns();

  const rows = vehicule.map((vehicule) => {
    return {
      id: vehicule._id,
      'N° Parc': vehicule.Num_parc,
      WW: vehicule.WW,
      'n° de Châssis': vehicule.Num_Chassis,
      'D.M  Circulation': vehicule.Echeance_Aut_Circulation,
      'P.F': vehicule.Pf,
      'N° Immat.': vehicule.Num_Immat,
      Marque: vehicule.Marque,
      Couleur: vehicule.Couleur,
      Prestataire: vehicule.Prestataire,
      'Fonct SERVICE': vehicule.Font_Service,
      'Échéance Aut.Circulation': vehicule.Echeance_Aut_Circulation,
      'Échéance Visite Tech.': vehicule.Echaence_Visite_Tech,
      'Assurance Contrat En Cours': vehicule.Assurance_Contrat_Cours,
      'Cartes Verte': vehicule.Cartes_Verte,
      Vignète: vehicule.Vignete,
      Action: (
        <TableCell align="right">
          <Button
            component={RouterLink}
            to={`http://localhost:3000/dashboard/editvehicule/${vehicule._id}`}
            endIcon={<EditIcon />}
          >
            Modifier
          </Button>{' '}
          <Button endIcon={<DeleteIcon />} onClick={() => OnDelete(vehicule._id)}>
            Archiver
          </Button>
        </TableCell>
      ),
      // ... Map other fields
    };
  });

  return (
    <>
      <BasicAlerts message={message} show={show} />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <Dialog open={openColumnDialog} onClose={handleCloseColumnDialog}>
            <DialogTitle>Select Columns to Show</DialogTitle>
            <DialogContent>
              {headCells.map((headCell) => (
                <FormControlLabel
                  key={headCell.id}
                  control={
                    <Checkbox
                      checked={selectedColumns.includes(headCell.id)}
                      onChange={handleColumnToggle}
                      name={headCell.id}
                    />
                  }
                  label={headCell.label}
                />
              ))}
              <Button onClick={handleSaveColumn} variant="contained" color="primary">
                Save
              </Button>
            </DialogContent>
          </Dialog>

          {/* Replace the DataGrid component */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={visibleColumns}
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                setSelected(newSelection.selectionModel);
              }}
              options={{ columnsButton: true }}
            />
          </div>
          <Button onClick={handleOpenColumnDialog}>
            <FilterListIcon /> Select Columns
          </Button>
          {/* <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={vehicule.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
        {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <Button onClick={handleOpenColumnDialog}>
          <FilterListIcon /> Select Columns
        </Button>

        <Dialog open={openColumnDialog} onClose={handleCloseColumnDialog}>
          <DialogTitle>Select Columns to Show</DialogTitle>
          <DialogContent>
            {headCells.map((headCell) => (
              <FormControlLabel
                key={headCell.id}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(headCell.id)}
                    onChange={handleColumnToggle}
                    name={headCell.id}
                  />
                }
                label={headCell.id}
              />
            ))}
            <Button onClick={handleCloseColumnDialog} variant="contained" color="primary">
              Save
            </Button>
          </DialogContent>
        </Dialog> */}
      </Box>
      <Button onClick={exportToExcel}>
        <GetAppIcon /> Export to Excel
      </Button>
    </>
  );
}
