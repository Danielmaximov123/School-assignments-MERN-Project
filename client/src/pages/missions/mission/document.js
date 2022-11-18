import { TableCell, Typography, Link, IconButton } from "@mui/material";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";
import PreviewPDF from "../previewPDF";
import DeleteIcon from '@mui/icons-material/Delete';
import { urlApi } from "./../../../redux/api";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRemoveFileFromMission } from './../../../redux/actions/getMissionAction';

const Document = ({ document , auth }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const { id } = useParams()

  return (
    <>
      <TableCell style={{ textAlign: "center" }}>
        <Typography variant="caption">{document.fileName}</Typography>
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <IconButton
        color="success"
        onClick={() => setOpen(true)}
        >
        <PreviewIcon/>
        </IconButton>
        <PreviewPDF
          open={open}
          setOpen={setOpen}
          file={{ file: `${urlApi}/${document?.path}` }}
        />
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          component={Link}
          href={`${urlApi}/${document?.path}`}
          target='_blank'
          download={document.fileName}
        >
        <DownloadIcon/>
        </IconButton>
      </TableCell>
        {
         auth?.userType !== 'student' &&
         <TableCell style={{textAlign: 'center'}}>
            <IconButton color='error' onClick={() => dispatch(getRemoveFileFromMission({ fileId : document._id , missionId : id }))}>
                <DeleteIcon/>
            </IconButton>
        </TableCell> 
        }
    </>
  );
};

export default Document;
