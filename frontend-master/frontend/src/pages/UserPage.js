/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */ 
import { useState , useEffect } from 'react';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit'
import {Link as RouterLink } from 'react-router-dom'
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
    id: 'lastname',
    numeric: false ,
    disablePadding: true,
    label: 'LastName',
  },
  {
    id: 'firstname',
    numeric: true,
    disablePadding: true,
    label: 'FirstName',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
    
  },
  {
    id: 'password',
    numeric: true,
    disablePadding: false,
    label: 'Password',
    
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    
  }
];


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
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
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Utilisateurs
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton  onClick={() => OnDelete(users._id) }>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
     
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {

const [users , setUsers]=useState([]) 
const [lastname , setlastname]=useState([])
const [firstname , setfirstname]=useState([])
const [email , setemail]=useState([])
const [phone , setphone]=useState([])
const [password , setpassword]=useState([])  

const [form, setForm] = useState({});
const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [message1, setMessage1] = useState("");
const [show, setShow] = useState(false);

const onChangeHandler = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
  
};

const onSubmitHandler = (e)=>{
  e.preventDefault();
  axios.post('http://localhost:3001/api/users', form)
  .then(res=>{
    setMessage(res.data.message)
    /* hide form after save */
    setForm({})
    setErrors({})
  })
  .catch(err=>setErrors(err.response.data))
  
}

useEffect(()=>{
  Axios.get("http://localhost:3001/api/users")
.then(res => {
  setUsers(res.data)
})
// Fetch the number of items from the database or any other source
const itemCount = users.length; // Replace 'users' with your data source

// Set the default rows per page based on the item count
if (itemCount > 0) {
  const defaultRowsPerPage = Math.min(10, itemCount); // Set a maximum of 10 rows per page
  setRowsPerPage(defaultRowsPerPage);
}
},[users])


const CreateUser = ()=>{
   Axios.post("http://localhost:3001/api/users",{   
      
       lastname,
       firstname,
       email,
       phone,
       password
  })
  .then(res => {
      console.log(res.data)
      setForm({})
      setErrors({})
      setShow(true)
      setMessage(res.data.message)
      setTimeout(() => {
        setShow(false)
      }, 4000);
  })
  .catch((err)=>setErrors(err.response.data))
  
}

const OnDelete = (id)=>{
  if(window.confirm("are you sure to delete this user")){

   Axios.delete(`http://localhost:3001/api/users/${id}`)
   .then(res=>{
    setMessage(res.data.message)
    setShow(true)

    setTimeout(() => {
        setShow(false)
      }, 4000);
   })

   
  }
 }




/* HHHHHHHHHHHHHHHHHHHHHHHH */
 

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n._id);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(users, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <>
    <BasicAlerts message={message} show ={show} />
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {visibleRows.map((users, index) => {
                const isItemSelected = isSelected(users._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                
                return (


                  <TableRow hover onClick={(event) => handleClick(event, users._id)}
                    role="checkbox" aria-checked={isItemSelected} tabIndex={-1}
                    key={users._id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary"
                       checked={isItemSelected}
                        
                        inputProps={{
                         'aria-labelledby': users._id,
                  
                        }}
                        
                    />
                    </TableCell>
                    
                    <TableCell component="th" _id={users._id} scope="row" padding="none"  >{users.lastname}</TableCell>
                    <TableCell align="right"  >{users.firstname}</TableCell>
                    <TableCell align="right"  >{users.email}</TableCell>
                    <TableCell align="right"  >{users.phone}</TableCell>
                    <TableCell align="right"  >{users.password}</TableCell>
                    <TableCell align="right" ><Button component={RouterLink} to={`http://localhost:3000/dashboard/user/${users._id}`} endIcon={<EditIcon />}>Modifier</Button> <Button  endIcon={<DeleteIcon />} onClick={() => OnDelete(users._id) }>Supprimer</Button></TableCell>
                    
                    
                    
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
          rowsPerPageOptions={[ 10 ]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
<div component="form" onSubmit={onSubmitHandler} >
{/* <FormControl component="form" onSubmit={onSubmitHandler} >   */}
<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '22ch' },
      }}
      noValidate
      autoComplete="off"
    >
<TextField className="form-control"
           label="Last name" 
           variant="outlined" 
           onChange={e => setlastname(e.target.value)} 
           onChangeHandler={onChangeHandler}
           style={{ marginBottom: '16px' }}  
           error={errors.lastname} 
           helperText={errors.lastname ? <>{errors.lastname}</>: 'Veulliez Entrer Votre Nom'}/>   
<TextField className="form-control"
           label="First name" 
           variant="outlined" 
           onChange={e => setfirstname(e.target.value)} 
           onChangeHandler={onChangeHandler}
           style={{ marginBottom: '16px' }}
           error={errors.firstname}
           helperText={errors.firstname ? <>{errors.firstname}</>: 'Veulliez Entrer Votre Prenom'}/>  

<TextField className="form-control"
           label="Email" 
           variant="outlined" 
           type="email" 
           onChange={e => setemail(e.target.value)} 
           onChangeHandler={onChangeHandler}
           style={{ marginBottom: '16px' }}
           error={errors.email}
           helperText={errors.email ? <>{errors.email}</>: 'Veulliez Entrer Votre email'}/>
<TextField className="form-control" 
           label="Phone" 
           variant="outlined" 
           onChange={e => setphone(e.target.value)} 
           onChangeHandler={onChangeHandler}
           style={{ marginBottom: '16px' }}
           error={errors.phone}
           helperText={errors.phone ? <>{errors.phone}</>: 'Veulliez Entrer Votre telephone'}/>
<TextField className="form-control" 
           label="Password" 
           variant="outlined" 
           onChange={e => setpassword(e.target.value)} 
           onChangeHandler={onChangeHandler}
           style={{ marginBottom: '16px' } }
           error={errors.password}
           helperText={errors.password ? <>{errors.password}</>: 'Veulliez Entrer Votre Mot de PassE'}/>
{/* </FormControl> */}
</Box>
</div>
    <Stack direction="row" spacing={2} onClick={CreateUser}  onSubmit={onSubmitHandler}> 
      <Button variant="contained" endIcon={< SendIcon />}>  
        Ajouter Utilisateur
      </Button> 
      
    </Stack>

    
 </>
  );

}



