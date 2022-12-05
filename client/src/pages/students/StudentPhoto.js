import profilePicMen from "../profile/profile men.jpg";
import profilePicWomen from "../profile/profile women.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip } from "@mui/material";
import { urlApi } from "../../redux/api";
import { useDispatch } from 'react-redux';
import { getDeleteProfilePictureUser } from "../../redux/actions/getUsersAction";

const StudentPhoto = ({user}) => {
  const dispatch = useDispatch()

  let profile = user?.gender === 10 ? profilePicMen : profilePicWomen

  const deletePhoto = () => {
    dispatch(getDeleteProfilePictureUser(user?._id))
  }

  return (
    <>
        <Box className="photo">
        {
            user?.profilePic !== null ?
            <Tooltip title="מחיקת תמונת פרופיל" placement="left" arrow>
            <IconButton onClick={deletePhoto} style={{position: 'absolute', top: '5rem', right: '25rem'}} variant="contained" color="error">
              <DeleteIcon fontSize="2rem"/>
            </IconButton>
          </Tooltip> : null
        }
        </Box>
      <Box id="uploadPicture" component="label">
          <Box component="span" id="spanBack">
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
              src={user?.profilePic === null ? profile : `${urlApi}/${user?.profilePic}`}
              />
            </Box>
            {console.log(user)}
          </Box>
        </Box>
    </>
  )
}

export default StudentPhoto