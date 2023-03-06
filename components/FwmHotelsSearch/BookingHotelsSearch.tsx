import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  LocationOn as PinIcon,
  Search as MagnifierIcon,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

import { bookingSearch } from "../../api/apiCallBookingApi";

interface ISearch {
    setCityCode: any
}

const BookingHotelsSearch: React.FC<ISearch> = ({ setCityCode }: ISearch) => {
  const [inputValue, setInputValue] = React.useState<any>("")
  const [options, setOptions] = React.useState<any>([])

  React.useEffect(() => {
    const { process } = bookingSearch(inputValue);
    process((options: any) => {
      setOptions(options)
    })
  }, [inputValue])


  return (
    <div>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo
        disableClearable
        blurOnSelect
        clearOnBlur
        options={options}
        onChange={(event: any, newValue: any) => {
          setCityCode(newValue);
        }}
        onInputChange={(event: any, newInputValue: any) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option: any) => option.city || ""}
        renderOption={(option: any) => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <PinIcon />
              </Grid>
              <Grid item xs>
                <span>{option.city}</span>
                <Typography variant="body2" color="textSecondary">
                  {option.country}
                  {option.state ? `, ${option.state}` : ""}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
        renderInput={(props) => (
          <TextField
            {...props}
            placeholder="Search"
            label="City"
            variant="outlined"
            InputProps={{
              ...props.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifierIcon/>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  )
}

export default BookingHotelsSearch