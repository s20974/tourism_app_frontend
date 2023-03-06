import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRange,DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Dayjs } from 'dayjs';
import * as React from 'react';

function getWeeksAfter(date: Dayjs | null, amount: number) {
  return date ? date.add(amount, 'week') : undefined;
}

export default function FwmRangeDatePicker() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue: any) => {
          setValue(newValue);
          console.log(value)
        }}
        renderInput={(startProps: any, endProps: any) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
