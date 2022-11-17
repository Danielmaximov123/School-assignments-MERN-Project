import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import profilePicMen from "./profile men.jpg";
import profilePicWomen from "./profile women.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch, useSelector } from 'react-redux';
import { getDeleteProfilePictureUser, getUpdateProfilePictureUser } from "../../redux/actions/getUsersAction";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { urlApi } from "../../redux/api";

const UploadPhoto = ({ auth }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadFile, setUploadFile] = useState(null)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const [showPic, setShowPic] = useState(null)
  const users = useSelector(state => state.users.users)
  const loading = useSelector(state => state.users.usersLoading)

  let user = users.find(user => user._id === auth?.userId)

  let progress = <CircularProgress style={{ width: "6rem", height: "6rem", marginTop: "1rem" }}/>

  const onChange = async (event) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      setSelectedFile(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setUploadFile(event.target.files[0])
    setShow(true)
  };


  useEffect(() => {
    if(selectedFile !== "" && user?.profilePic !== null) {
      setShowPic(selectedFile)
    }
    else if(selectedFile !== "" && user?.profilePic === null) {
      setShowPic(selectedFile)
    }
    else if(selectedFile === "" && user?.profilePic === null) {
      user?.gender === "men" ? setShowPic(profilePicMen) : setShowPic(profilePicWomen)
    } else if(selectedFile === "" && user?.profilePic !== null) {
      setShowPic(`${urlApi}/${user?.profilePic}`)
    } 

  },[selectedFile , user?.profilePic])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", uploadFile);

    await dispatch(getUpdateProfilePictureUser(auth?.userId , form))
    setSelectedFile("")
    setShow(false)
  };

  const deletePhoto = () => {
    dispatch(getDeleteProfilePictureUser(auth?.userId))
  }

  
  return (
    <Box
      style={{
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "1rem",
        padding: "5rem  1.25rem",
      }}
    >
       {
            showPic !== selectedFile && showPic === `${urlApi}/${user?.profilePic}` ?
            <Tooltip title="מחיקת תמונת פרופיל" placement="left" arrow>
            <IconButton onClick={deletePhoto} style={{position: 'absolute', top: '9rem', right: '25rem'}} variant="contained" color="error">
              <DeleteIcon fontSize="2rem"/>
            </IconButton>
          </Tooltip> : null
        }
      <Box component="form" method="POST" textAlign="center" onSubmit={handleSubmit}>
        <Box id="uploadPicture" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => onChange(e)}
          />
          <Box component="span" id="spanBack">
            {
              loading ? progress :
            <Box component="span">
              <img
              style={{
                opacity: "1",
                transition: "opacity 0.3s ease 0s",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="avatar"
              // ליצור תנאי בוליאני לתמונות
              src={showPic}
              />
            </Box>
            }
          </Box>
          <Box id="upIMG" component="div">
            <AddAPhotoIcon />
            <Typography variant="span">העלאת תמונה</Typography>
          </Box>
        </Box>
        {
          show &&
          <>
        {uploadFile.size <= 2099200 ? <Tooltip title="העלאת תמונה" placement="right" arrow>
        <IconButton size="large" type="submit" variant="contained" color="success">
          <UploadFileIcon fontSize="large"/>
        </IconButton>
        </Tooltip> : 
         <IconButton disabled size="large" type="submit" variant="contained" color="success">
         <UploadFileIcon fontSize="large"/>
       </IconButton>
       }
        <Tooltip title="מחיקה" placement="left" arrow>
          <IconButton onClick={() => { setSelectedFile(""); setUploadFile("");setShow(false) }} size="large" variant="contained" color="error">
            <DeleteIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
          </>
        }
        
      </Box>
      <Box style={{ margin: "1rem auto 0rem", textAlign: "center" }}>
        <Typography
          textAlign="center"
          style={uploadFile?.size <= 2099200 ? { fontSize: "0.8rem", color: "rgb(143 142 142)" } : uploadFile === null ? { fontSize: "0.8rem", color: "rgb(143 142 142)" } : uploadFile?.size >= 2099200 ? { fontSize: "0.8rem", color: red[500] } : { fontSize: "0.8rem", color: "rgb(143 142 142)" }}
          variant="span"
        >
          מותר *.jpeg, *.jpg, *.png <br />
          גודל מקסימלי של 2MB
        </Typography>
      </Box>
    </Box>
  );
};

export default UploadPhoto;
