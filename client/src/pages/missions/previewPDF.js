import {Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core"; 
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core"; 

const PreviewPDF = (props) => {
  const [convertToUrl, setConvertToUrl] = useState(null);

  useEffect(() => {
    let reader = new FileReader();
    reader.readAsDataURL(props.file.file);
    reader.onload = function (e) {
      setConvertToUrl(e.target.result);
    };
  }, [props.file]);

  let pdfStyle = {
    width: "100%",
    height: "800px",
    backgroundColor: "#e4e4e4",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Dialog
      open={props.open}
      fullWidth
      onClose={() => props.setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{
        direction: "rtl",
        textAlign: "center",
        maxWidth: "100vw",
        margin: "auto",
      }}
    >
      <DialogContent style={pdfStyle}>

        {convertToUrl && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
              <Viewer
                defaultScale={SpecialZoomLevel.PageWidth}
                fileUrl={convertToUrl}
              />
            </Worker>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPDF;
