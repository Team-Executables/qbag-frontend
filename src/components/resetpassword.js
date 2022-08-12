import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import AlertDialog from "./AlertDialog";
import { useRecoilValue } from "recoil";
import { multilingual } from "../atoms";

//IMAGE
import lock from '../images/lock.svg';

//MUI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import green from '@mui/material/colors/green';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { createTheme } from '@mui/material/styles';


const theme = createTheme();

const classes = {
    background: {
        backgroundImage: `url(${lock})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: green[50],
        backgroundSize: 'auto',
        backgroundPosition: 'right',
        height: '93vh',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spacing: {
        margin: theme.spacing(3),
    },
    gridspacing: {
        marginLeft: theme.spacing(2),
    },
};

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const ResetPassword = () => {

    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passworderror, setPassworderror] = useState(false);
    const multi = useRecoilValue(multilingual);


    //Snackbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    //AlertDialog
    const [openState, setOpenState] = useState(false);
    const openDialog = () => setOpenState(true);
    const closeDialog = () => {
        setOpenState(false);
        navigate('/login');
    }

    const handleChange = (e) => {
        setPassworderror(false)
        setPassword(e.target.value.trim())
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(password);

        // Validation
        let submit = true

        setPassworderror(false)

        if (password === "" || password.length < 6) {
            setPassworderror(true)
            submit = false
            console.log(submit)
            console.log(password)
        }


        if (submit) {
            axiosInstance
                .patch(`auth/password-reset-complete`, {
                    "password": password,
                    "token": token,
                    "uidb64": uidb64
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    openDialog();
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status === 401) {
                        setTransition(() => TransitionLeft);
                        setOpen(true);
                    }
                });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Container disableGutters={false} maxWidth="xl" sx={classes.background}>
            <Grid container direction="row" sx={classes.gridspacing}>
                <Grid item>
                    <CssBaseline />
                    <Box mt={15}>
                        <Box fontSize={25} fontWeight="fontWeightBold" pb={1}>
                            {multi.enterNewPassword}
                        </Box>
                        <form sx={classes.form}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                id="password"
                                label={multi.password}
                                type="password"
                                onChange={handleChange}
                                error={passworderror}
                            />
                            <Button
                                type="submit"
                                fullWidth={false}
                                variant="contained"
                                color="primary"
                                sx={classes.submit}
                                onClick={handleSubmit}
                            >
                                {multi.submit}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {multi.backToHome}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={transition}
                        message={multi.resetPasswordError}
                        key={'bottom center'}
                    />
                    <AlertDialog
                        open={openState}
                        closeDialog={closeDialog}
                        title={multi.resetPasswordAlertTitle}
                        description={multi.resetPasswordAlertDescription} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ResetPassword;