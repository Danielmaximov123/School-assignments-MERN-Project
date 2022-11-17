import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Deadline = (props) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    let date = new Date(Date.now());
    const formatDate =
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const formatMonth =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formatHour =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const formatMinutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const formattedDate =
      [date.getFullYear(), formatMonth, formatDate].join("-") +
      "T" +
      [formatHour, formatMinutes].join(":");
      setDate(formattedDate)
  }, []);

  const dateTime = (e) => {
    let d = new Date(e.target.value);
    const formatDate = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const formatMonth = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const formatHour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const formatMinutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const formattedDate =
      [d.getFullYear(), formatMonth, formatDate].join("-") +
      "T" +
      [formatHour, formatMinutes].join(":");
    props.setDeadlineDate(formattedDate);
  };

  return (
    <>
      <TextField
        variant="standard"
        fullWidth
        value={props.deadlineDate !== null ? props.deadlineDate :  ''}
        onChange={(e) => dateTime(e)}
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
        label="מועד הגשה"
      />
    </>
  );
};

export default Deadline;
