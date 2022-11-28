import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, heIL } from '@mui/x-data-grid'
import { Avatar, Box, Button, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useEffect, useState } from 'react';
import { getAllCities } from '../../redux/actions/getVariousAction';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { getVerifyUser } from '../../redux/actions/getUsersAction';
import DeletePopUp from './deletePopUp';
import { Typography } from '@mui/material';
import profilePicMen from "../profile/profile men.jpg";
import profilePicWomen from "../profile/profile women.jpg";

const StudentsComp = ({users , user}) => {
  const cities = useSelector((state) => state.various.cities);
  const variousLoading = useSelector((state) => state.various.variousLoading);
  const subjects = useSelector(state => state.subjects.subjects)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  let usersData = users.filter(i => i._id !== user._id)

  const columns = [
    {
      field: 'fname',
      headerName: 'שם מלא',
      align : 'center',
      headerAlign : 'center',
      width: 180,
      valueGetter: (params) =>
        `${params?.row?.fName || ''} ${params?.row?.lName}`,
      renderCell : (params) => {
        let men = params.row.gender === 10 && params.row.profilePic === null ? profilePicMen : params.row.profilePic
        let women = params.row.gender === 20 && params.row.profilePic === null ? profilePicWomen : params.row.profilePic
        let pic = params.row.gender === 10 ? men : women
        return <Chip
        avatar={<Avatar alt={`${params?.row?.fName || ''} ${params?.row?.lName}`} src={pic} />}
        label={`${params?.row?.fName || ''} ${params?.row?.lName}`}
        variant="outlined"
      />
      }
    },
    {
      field : 'gender',
      headerName : 'מין',
      align : 'center',
      headerAlign : 'center',
      width: 80,
      valueFormatter: ({ value }) => {
        return `${value}`
      },
      valueGetter : (params) =>  {
        return `${params?.row?.gender === 10 ? 'זכר' : 'נקבה'}`
      }
    },
    {
      field : 'city',
      headerName : 'עיר',
      align : 'center',
      headerAlign : 'center',
      width : 100,
      valueFormatter: ({ value }) => {
        let find = cities.find(city => city?.id === value)
        return `${!find ? '--לא עודכן--' : find?.label}`
      },
      renderCell : (params) => {
        let find = cities.find(city => city?.id === params?.row?.city)
        return !find ? <Typography style={{color : '#3f3f3f94'}} variant='span'>--לא עודכן--</Typography> : <Typography variant='span'>{find.label}</Typography>
      }
    },
    {
      field : 'email',
      headerName : 'דוא"ל',
      align : 'center',
      headerAlign : 'center',
      width : 200,
      valueFormatter: ({ value }) => {
        return `${value}`
      },
      renderCell: (params) => {       
        return (
          <Tooltip title="לחץ כדי להעתיק" placement='top'>
            <Button color='warning' style={{fontSize: '0.515rem' , fontWeight : '500' , letterSpacing: '0.04rem'}} variant="outlined" endIcon={<AlternateEmailIcon />} onClick={() => { navigator.clipboard.writeText(params?.row?.email) }}>
            {params?.row?.email}
            </Button>
          </Tooltip>
        );
    },
    },
    {
      field : 'phoneNumber',
      headerName : 'מספר טלפון',
      align : 'center',
      headerAlign : 'center',
      width : 150,
      valueFormatter: ({ value }) => {
        return `${value}`
      },
      renderCell: (params) => {       
        return (
          <Tooltip title="התחל שיחת ווטסאפ" placement='top'>
            <Button color='success' style={{fontSize: '0.575rem' , fontWeight : '500' , letterSpacing: '0.04rem'}} variant="outlined" endIcon={<WhatsAppIcon />} onClick={() => window.open(`https://wa.me/972${params?.row?.phoneNumber}`, '_blank', 'noopener,noreferrer')}>
            {params?.row?.phoneNumber}
            </Button>
          </Tooltip>
        );
    },
    },
    {
      field : 'subjects',
      headerName : 'נושאי לימוד',
      align : 'center',
      headerAlign : 'center',
      width : 150,
      valueGetter : ({value}) => {
        let sub = value.map(item => subjects.find(i => i._id === item))
        let title = sub.map(j => j?.title).join(' | ')
          return (
            `${title}`
          )
      },
      renderCell: (params) => {    
        let subject = params?.row?.subjects
        let titles = subject.map((item , index) => 
        <Typography key={index} style={{fontSize : '0.6875rem' , textAlign : 'center'}}>
          {subjects.find(j => j?._id === item)?.title}
        </Typography>
        )
        return (
          <Tooltip placement='top' title={titles}>
            <Typography variant='span'>{subjects.length}</Typography>
          </Tooltip>
          )
    },
    },
    {
      field : 'activated',
      headerName : 'מצב משתמש',
      disableExport : true,
      align : 'center',
      headerAlign : 'center',
      width : 140,
      valueGetter : ({value}) => {
          return (
            `${value ? 'פעיל' : 'כבוי'}`
          )
      },
      renderCell: (params) => {       
        return (
          <Tooltip title="הפעל/כבה משתמש" placement='top'>
              <Chip label={params?.row?.activated ? 'פעיל' : 'כבוי'} onClick={() => dispatch(getVerifyUser(params?.row?._id , {activated : params?.row?.activated ? false : true}))} color={params?.row?.activated ? 'success' : 'error'} variant="outlined" clickable />
          </Tooltip>
        );
    },
    },
    {
      field : '_id',
      headerName : 'מחק',
      disableExport : true,
      align : 'center',
      headerAlign : 'center',
      sortable : false,
      disableColumnMenu : true,
      width : 80,
      renderCell: (params) => {       
        return (
            <>
            <IconButton onClick={() => setOpen(true)}>
              <DeleteIcon color='error'/>
            </IconButton>
            <DeletePopUp open={open} setOpen={setOpen} user={params?.row}/>
            </>
        );
    },
    },
  ];
  
  const CustomToolbar = () => {
    return(
      <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport csvOptions={{ utf8WithBom: true , fileName : 'רשימת סטודנטית' }} printOptions={{ hideFooter: true, hideToolbar: true, }}/>
  </GridToolbarContainer>
    )
  }

  return (
    <Box style={{ height: '25.45rem', width: '100%' , marginLeft : 'auto' , marginRight : 'auto' , textAlign : 'center' }}>
      {
        !variousLoading ?
        <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <Typography variant='h5'>אין משתמשים...</Typography>
            </Stack>
          ),
          Toolbar : CustomToolbar
        }}
        localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
        rows={usersData}
        getRowId={(row) => row?._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
        sx={{letterSpacing : '0.1rem' }}
      /> : null
      }
    </Box>
  )
}

export default StudentsComp