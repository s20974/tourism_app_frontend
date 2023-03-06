import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Country }  from 'country-state-city';
import * as React from "react";

import styles from './location-field.module.scss'
import * as userCoordinates from "../../Helpers/getUserCity";

interface ILocation {
    setForm: any,
    value: any,
    error?: any,
    ref?: any
}

const FwmLocationField: React.FC<ILocation> = (props: ILocation) => {
    const countries = Country.getAllCountries();

    const updatedCountries = countries.map((country: any) => ({
        label: country.name,
        value: country.isoCode,
        ...country
    }
    ));

    const onClickGetLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                userCoordinates.getUserCountryCity(position.coords.latitude, position.coords.longitude)
                    .then((response: any) => {
                        response.json().then(
                            (position: any) => {
                                const country = updatedCountries.find(res => {
                                    return res.label === position.address.country
                                })

                                props.setForm(country.label)
                            }
                        )
                })
            });
        }
    }

    const handleChange = (event: any) => {
        props.setForm(event.target.value)
    };

    return(
        <div className={styles.locationSelector}>
            <FormControl>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                    className={styles.MuiSelectRoot}
                    labelId="country-label"
                    id="country"
                    name="country"
                    value={props.value || ""}
                    label="Country"
                    onChange={handleChange}
                    error={!!props.error}
                    disableUnderline
                    ref={props.ref}
                >
                    <MenuItem value="" className={styles.MuiSelectRoot}>
                        <em>None</em>
                    </MenuItem>
                    {updatedCountries.map((element) => {
                        return(
                            <MenuItem key={element.isoCode} value={element.label}>{element.label}</MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>{props.error?.message}</FormHelperText>
            </FormControl>
            <i className="fa-solid fa-location-crosshairs" style={{marginTop: "0.6vh"}} onClick={onClickGetLocation}></i>
    </div>
    )
    
}

export default FwmLocationField