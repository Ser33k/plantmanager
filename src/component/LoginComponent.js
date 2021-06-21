import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserDataService from "../service/UserDataService";
import {StoreContext} from "../store/storeProvider";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import indigo from "@material-ui/core/colors/indigo";
import cyan from "@material-ui/core/colors/cyan";


const useStyles = makeStyles((theme) => ({
    textField: {
        width: '30%',
        marginLeft: 'auto',
        marginRight: '9px',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        borderBottom: "1px solid white",
        fontSize: "8px",
        "&:hover": {
            borderBottom: "3px solid white"
        },
    },
    input: {
        color: 'white'
    },
    btn: {
        backgroundColor: "#a1ef8b",
        color: "#2a6041",
        height: "65%",
        "&:hover": {
            backgroundColor: "#2a6041",
            color: "#fff"
        },
        marginRight: "20px",
        marginLeft: "30px"
    },
    root: {
        display: "flex",
        alignItems: "center"
    }
}));

// const ColorButton = withStyles((theme) => ({
//     root: {
//         color: theme.palette.getContrastText(indigo[800]),
//         backgroundColor: indigo[900],
//         marginTop: "8px",
//         '&:hover': {
//             backgroundColor: cyan[800],
//             color: theme.palette.getContrastText(cyan[600]),
//
//         },
//     },
// }))(Button);

const LoginComponent = () => {



    const classes = useStyles();

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const { setUser } = useContext(StoreContext);


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const {data, status} = await UserDataService.loginUser(formik.values);
        console.log(data);
        if (status === 200){
            history.push("/");
            setUser(data);

        } else {
            alert("Wrong email or password!");
        }
    }



    return (
        <div>
            <form className={classes.root} onSubmit={handleOnSubmit}>
                <TextField
                    id="email-login"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    className={classes.textField}
                    autoFocus
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextField
                    fullWidth
                    id="password-login"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <Button type="submit" variant="contained"  className={classes.btn}>
                    LOGIN
                </Button>
                {/*<Button color="primary" variant="contained" fullWidth type="submit">*/}
                {/*    Submit*/}
                {/*</Button>*/}
            </form>
        </div>
    );
};

export default LoginComponent;