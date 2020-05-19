import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import LockOutlined from "@material-ui/icons/LockOutlined";
import { Field, reduxForm } from 'redux-form';
import { validateForm } from 'redux-form-validators';
import TextField from './fields/text-field';
import Switch from './fields/switch';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { login } from '../../actions/user';
import userValidator from '../../validators/user';
import styles from '../../design/styles/loginStyle';
import config from '../../../config/config.json';

class LoginForm extends Component {
    onSubmit({ ...props }) {
        this.props.login(props).then((res) => {
            if (res && res.success) {
                console.log('login sucess, redirect')
                alert('must redirect')
                // this.props.history.push('/');
            }
        });
    }

    render() {
        const { classes, handleSubmit, pristine, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className={classes.fields}>
                    <Field
                        name="username"
                        component={TextField}
                        label="Pseudonyme ou email"
                        icon={<Person className={classes.inputIconsColor} />}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <Field
                        name="password"
                        component={TextField}
                        label="Mot de passe"
                        icon={<LockOutlined className={classes.inputIconsColor} />}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: 'password',
                            autoComplete: "off"
                        }}
                    />
                    <Field
                        name="remember"
                        component={Switch}
                        label="Se souvenir de moi"
                        inputProps={{
                            color: 'primary',
                        }}
                    />
                </div>
                <Button
                    className={classes.signInButton}
                    color={'primary'}
                    disabled={JSON.parse(localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY)) === true ? false : pristine || submitting}
                    size={'large'}
                    variant="contained"
                    type={'submit'}>
                    Connexion
        </Button>
            </form>
        );
    }
}

const validate = validateForm({
    username: userValidator.username,
    password: userValidator.password,
})

const form = {
    form: 'LoginForm',
    validate,
    initialValues: JSON.parse(localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY)) === true ? {
        remember: localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY),
        username: localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY_USERNAME),
        password: localStorage.getItem(config.STORAGE.REMEMBER_ME.KEY_PASSWORD),
    } : {}
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm)));