import { TextField } from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import * as React from "react";

import styles from './date-picker.module.scss'

interface IPicker {
    label: any,
    value: any,
    handleChange: any
}

const FwmDatePicker: React.FC<IPicker> = (props: IPicker) => {
    return (
        <>
            <div className={styles.datePickerWrapper}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label={props.label}
                        inputFormat="YYYY-MM-DD"
                        value={props.value}
                        onChange={props.handleChange}
                        renderInput={(params: any) => <><TextField {...params} /></>}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        minDate={new Date()}
                    />
                </LocalizationProvider>
            </div>
        </>

    )
}

export default FwmDatePicker