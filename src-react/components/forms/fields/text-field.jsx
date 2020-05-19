import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { FormControl, Input, InputAdornment, InputLabel, Typography } from "@material-ui/core";
import classNames from 'classnames';

const styles = theme => ({
    formControl: {
        marginTop: 10
    },
    labelRoot: {
        color: "#797979 !important",
        fontWeight: "400",
        fontSize: 14,
        letterSpacing: "unset",
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#D2D2D2 !important",
            borderWidth: "1px !important"
        },
        "&:after": {
            borderColor: theme.palette.primary.dark
        }
    },
    input: {
        color: "#495057",
        height: "unset",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        }
    },
    disabled: {},
});

class TextField extends Component {

    render() {
        const { classes, input, label, meta: { touched, error }, icon, labelProps, inputProps, formControlProps, ...otherProps } = this.props;

        return (
            <FormControl {...formControlProps} className={classes.formControl}>
                {label !== undefined ? (
                    <InputLabel
                        htmlFor={input.id}
                        {...labelProps}
                        className={classes.labelRoot}>
                        {label}
                    </InputLabel>
                ) : null}
                <Input
                    {...input}
                    {...inputProps}
                    {...otherProps}
                    error={touched && error !== undefined}
                    className={classNames(classes.underline, classes.input)}
                    endAdornment={<InputAdornment position="end">{icon}</InputAdornment>}
                />
                {touched && error && <Typography color={'error'}>{error}</Typography>}
            </FormControl>
        );
    }
}
export default withStyles(styles)(TextField);