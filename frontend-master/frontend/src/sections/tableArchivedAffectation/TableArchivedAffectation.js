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
  // {
  //   id: 'Collaborateur',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Collaborateur',
  // },

  // {
  //   id: 'Véhicule',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Véhicule',
  // },

  {
    id: 'Collaborateur Nom',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Nom',
  },
  {
    id: 'Collaborateur Prenom',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Prenom',
  },
  {
    id: 'Collaborateur filiale',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Filiale',
  },
  {
    id: 'Collaborateur Direction',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Direction',
  },
  {
    id: 'Collaborateur Matricule',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Matricule',
  },
  {
    id: 'Collaborateur Grade',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Grade',
  },
  {
    id: 'Collaborateur Email',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Email',
  },
  {
    id: 'Collaborateur NumeroGsm',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur NumeroGsm',
  },
  {
    id: 'Collaborateur NumeroGsmPersonnel',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur NumeroGsmPersonnel',
  },
  {
    id: 'Collaborateur TelephoneFixe',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur TelephoneFixe',
  },
  {
    id: 'Collaborateur Permis',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur Permis',
  },
  {
    id: 'Collaborateur DateValiditePermis',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur DateValiditePermis',
  },
  {
    id: 'Collaborateur CIN',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur CIN',
  },
  {
    id: 'Collaborateur DateValiditéCIN',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur DateValiditéCIN',
  },
  {
    id: 'Collaborateur NumeroPassports',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur NumeroPassports',
  },
  {
    id: 'Collaborateur DateValiditéPassport',
    numeric: false,
    disablePadding: false,
    label: 'Collaborateur DateValiditéPassport',
  },

  {
    id: 'Véhicule N° Parc',
    numeric: false,
    disablePadding: false,
    label: 'Véhicule N° Parc',
  },
  {
    id: 'WW',
    numeric: false,
    disablePadding: false,
    label: 'WW',
  },
  {
    id: 'Num_Chassis',
    numeric: false,
    disablePadding: false,
    label: 'Numéro Chassis',
  },
  {
    id: 'DM_Circulation',
    numeric: false,
    disablePadding: false,
    label: 'Date de mise en circulation',
  },
  {
    id: 'Pf',
    numeric: true,
    disablePadding: false,
    label: 'Puissance fiscale',
  },
  {
    id: 'Num_Immat',
    numeric: false,
    disablePadding: false,
    label: "Numéro d'immatriculation",
  },
  {
    id: 'Marque',
    numeric: false,
    disablePadding: false,
    label: 'Marque',
  },
  {
    id: 'Couleur',
    numeric: false,
    disablePadding: false,
    label: 'Couleur',
  },
  {
    id: 'Prestataire',
    numeric: false,
    disablePadding: false,
    label: 'Prestataire',
  },
  {
    id: 'Font_Service',
    numeric: false,
    disablePadding: false,
    label: 'Font de service',
  },
  {
    id: 'Ref_Pneus',
    numeric: false,
    disablePadding: false,
    label: 'Référence pneus',
  },
  {
    id: 'Echeance_Aut_Circulation',
    numeric: false,
    disablePadding: false,
    label: 'Échéance autorisation de circulation',
  },
  {
    id: 'Echaence_Visite_Tech',
    numeric: false,
    disablePadding: false,
    label: 'Échéance visite technique',
  },
  {
    id: 'Assurance_Contrat_Cours',
    numeric: false,
    disablePadding: false,
    label: 'Assurance (Contrat en cours)',
  },
  {
    id: 'Cartes_Verte',
    numeric: false,
    disablePadding: false,
    label: 'Cartes Verte',
  },
  {
    id: 'Vignete',
    numeric: false,
    disablePadding: false,
    label: 'Vignette',
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
          Véhicule
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TableArchivedAffectation() {
  const [archivedaffectationDetails, setArchivedAffectationDetails] = useState([]);

  // Fonction pour récupérer les informations des affectations depuis le backend
  const getArchivedAffectationDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/archived-affectation');
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération des détails des affectations archivees ');
      }
      const data = await response.json();
      setArchivedAffectationDetails(data);
      // Fetch the number of items from the database or any other source
      const itemCount = archivedaffectationDetails.length; // Replace 'users' with your data source

      // Set the default rows per page based on the item count
      if (itemCount > 0) {
        const defaultRowsPerPage = Math.min(10, itemCount); // Set a maximum of 10 rows per page
        setRowsPerPage(defaultRowsPerPage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getArchivedAffectationDetails();
  }, []); /*  */

  // const OnDelete = (id) => {
  //   if (window.confirm('are you sure to delete this user')) {
  //     Axios.delete(`http://localhost:3001/api/deleteAffectation/${id}`).then((res) => {
  //       console.log(res.data);
  //       setMessage(res.data.message);
  //       setShow(true);
  //       setTimeout(() => {
  //         setShow(false);
  //       }, 4000);
  //     });
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
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = archivedaffectationDetails.map((n) => n._id);
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
      stableSort(archivedaffectationDetails, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, archivedaffectationDetails]
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
                rowCount={archivedaffectationDetails.length}
              />
              <TableBody>
                {visibleRows.map((archivedaffectationDetails, index) => {
                  const isItemSelected = isSelected(archivedaffectationDetails._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, archivedaffectationDetails._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={archivedaffectationDetails._id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': archivedaffectationDetails._id,
                          }}
                        />
                      </TableCell>

                      <TableCell
                        component="th"
                        _id={archivedaffectationDetails._id}
                        scope="row"
                        padding="none"
                      >{`${archivedaffectationDetails.collaborateurDetails[0].Nom}`}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Prenom}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Filiale}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Direction}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Matricule}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Grade}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Email}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].NumeroGsm}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].NumeroGsmPersonnel}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].TelephoneFixe}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].Permis}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].DateValiditePermis}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].CIN}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].DateValiditéCIN}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].NumeroPassport}</TableCell>
                      <TableCell>{archivedaffectationDetails.collaborateurDetails[0].DateValiditéPassport}</TableCell>

                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Num_parc}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].WW}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Num_Chassis}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].DM_Circulation}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Pf}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Num_Immat}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Marque}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Couleur}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Prestataire}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Font_Service}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Ref_Pneus}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Echeance_Aut_Circulation}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Echaence_Visite_Tech}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Assurance_Contrat_Cours}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Cartes_Verte}</TableCell>
                      <TableCell>{archivedaffectationDetails.vehiculeDetails[0].Vignete}</TableCell>

                      <TableCell align="right">
                        {' '}
                        <Button endIcon={<DeleteIcon />} onClick={() => OnDelete(archivedaffectationDetails._id)}>
                          Supprimer
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
            count={archivedaffectationDetails.length}
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
