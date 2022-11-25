import { TableCell, Typography, Link, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";
import PreviewPDF from "../../previewPDF";
import { urlApi } from "../../../../redux/api";

const DocumentAdmin = ({ document , auth }) => {
    const [open, setOpen] = useState(false);

  
  return (
    <>
    <TableCell style={{ textAlign: "center" }}>
      <Typography variant="caption">{document.fileName}</Typography>
    </TableCell>
    <TableCell style={{ textAlign: "center" }}>
                <Tooltip placement="top" title={document.type === "pdf" ? 'תצוגה מקדימה' : 'אין תצוגה מקדימה'}>
            <PreviewIcon
              color={document.type === "pdf" ? "success" : 'disabled'}
              onClick={() => document.type === "pdf" && setOpen(true)}
              style={document.type === "pdf" ? {
                margin: "0rem 0.4rem",
                fontSize: "1.7rem",
                cursor: "pointer",
              } : {margin: "0rem 0.4rem",
              fontSize: "1.7rem"
              }}
            />
          </Tooltip>
          {document.type === "pdf" && <PreviewPDF setOpen={setOpen} open={open} file={{file : `${urlApi}/${document?.path}`}} /> }
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
  </>
  )
}

export default DocumentAdmin