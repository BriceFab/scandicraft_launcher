import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { FormControlLabel, Switch as SwitchMUI } from "@material-ui/core";

const styles = theme => ({
    disabled: {},
});

class Switch extends Component {

    render() {
        const { classes, input, label, labelProps, inputProps, formControlProps, ...otherProps } = this.props;

        return (
            <FormControlLabel
                control={
                    <SwitchMUI
                        checked={input.value ? true : false}
                        onChange={input.onChange}
                        {...inputProps}
                        {...otherProps}
                    />
                }
                label={label}
                {...formControlProps}
            />
        );
    }
}
export default withStyles(styles)(Switch);