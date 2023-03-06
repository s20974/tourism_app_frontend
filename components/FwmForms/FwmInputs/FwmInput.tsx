import { TextField } from "@material-ui/core";
import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './input-field.module.scss'

interface IInput {
    label: string,
    icon?: any,
    error?: any,
    type?: any,
    id: string,
    inputProps?: any,
    typemultiline?: boolean
}

const FwmInputs: React.FC<IInput> = (props: IInput) => {
    const { register } = useFormContext()

    return !props.typemultiline ? (
        <React.Fragment>
            <TextField
                id={props.id} 
                label={props.label} 
                type={props.type || 'text'}
                variant="outlined"
                helperText={props.error?.message}
                error={!!props.error}
                className={`${styles.textField} ${props.error ? styles.error : ''}`}
                {...register(props.id)}
                InputProps={props.inputProps || null}
            />
        </React.Fragment>
    ) : (
        <React.Fragment>
            <TextField
                id={props.id} 
                label={props.label} 
                type={props.type || 'text'}
                variant="outlined"
                helperText={props.error?.message}
                error={!!props.error}
                multiline
                minRows={5}
                className={`${styles.textField} ${props.error ? styles.error : ''}`}
                {...register(props.id)}
                InputProps={props.inputProps || null}
            />
        </React.Fragment>
    )
}

export default FwmInputs