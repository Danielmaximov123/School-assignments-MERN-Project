import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from 'react-redux';

const SelectorCity = (props) => {
  const loading = useSelector(state => state.various.variousLoading)
  let equal = props.cities.find(i => i.id === props.city)
  return (
    <>
      {
        loading ? 'loading' :
        <Autocomplete
        id="cities"
        value={equal || null}
        getOptionLabel={(cities) => `${cities?.label}`}
        options={props.cities === undefined ? props.progress : props.cities}
        onChange={(e) =>
          props.setCity(Number(e.target.id))
        }
        noOptionsText={"לא נמצאו ערים..."}
        renderOption={(props, cities) => (
          <Box
            component="li"
            style={{direction : 'rtl'}}
            {...props}
            key={cities?.id}
            data-id={cities?.id}
            id={cities?.id}
            value={cities.label}
          >
            {cities?.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField style={{direction : 'rtl'}} variant="standard" {...params} label="עיר" />
        )}
      />
      }
    </>
  );
};

export default SelectorCity;
