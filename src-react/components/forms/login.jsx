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
import routes from '../../routes/routes.json';
const Store = require('electron-store');

const store = new Store()

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            waiting: false
        }
    }

    onSubmit({ ...props }) {
        this.setState({
            waiting: true
        })
        this.props.login(props).then((res) => {
            if (res && res.status === 200) {
                this.props.history.push(routes.LAUNCHER);
            }
            this.setState({
                waiting: false
            })
        });
    }

    render() {
        const { classes, handleSubmit, pristine, submitting } = this.props;
        const { waiting } = this.state;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className={classes.fields}>
                    <Field
                        name="username"
                        component={TextField}
                        label="Pseudonyme"
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
                    disabled={(store.get(config.STORAGE.REMEMBER_ME.KEY) !== 'undefined' && store.get(config.STORAGE.REMEMBER_ME.KEY) === true ? false : pristine || submitting) || waiting}
                    size={'large'}
                    variant="contained"
                    type={'submit'}>
                    {waiting ? 'En cours..' : 'Connexion'}
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
    initialValues: store.get(config.STORAGE.REMEMBER_ME.KEY) !== undefined && store.get(config.STORAGE.REMEMBER_ME.KEY) === true ? {
        remember: store.get(config.STORAGE.REMEMBER_ME.KEY),
        username: store.get(config.STORAGE.REMEMBER_ME.KEY_USERNAME)
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