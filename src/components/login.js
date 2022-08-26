import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Copyright from "./copyright";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userData, isLoggedIn, multilingual } from "../atoms";

//IMAGE
import bg from "../images/bg.svg";

//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { createTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

const classes = {
    image: {
        marginTop: 0,
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "94vh",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spacing: {
        margin: theme.spacing(3),
    },
    snackbar: {
        paddingBottom: theme.spacing(3),
    },
};

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

export default function SignIn() {
    const multi = useRecoilValue(multilingual);
    const setUser = useSetRecoilState(userData);
    const [login, setLogin] = useRecoilState(isLoggedIn);
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [emailerror, setEmailerror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEmailerror(false);
        setPasserror(false);

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        // Validation
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let submit = true;

        setEmailerror(false);
        setPasserror(false);

        if (formData.email === "" || !re.test(formData.email)) {
            setEmailerror(true);
            submit = false;
            console.log(submit);
            console.log(formData.email);
        }
        if (formData.password === "" || formData.password.length < 6) {
            setPasserror(true);
            submit = false;
            console.log(submit);
            console.log(formData.password);
        }

        if (submit) {
            axiosInstance
                .post(`auth/login`, {
                    email: formData.email,
                    password: formData.password,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);

                    localStorage.setItem(
                        "access_token",
                        res.data.user_data.tokens.access
                    );
                    localStorage.setItem(
                        "refresh_token",
                        res.data.user_data.tokens.refresh
                    );

                    axiosInstance.defaults.headers["Authorization"] =
                        "Bearer " + localStorage.getItem("access_token");

                    setUser({
                        name: res.data.name,
                        email: res.data.email,
                        employment: res.data.employment,
                        id: res.data.teacher_id || res.data.other_id,
                        user_id: res.data.user_id,
                        user_type: res.data.user_type,
                        // idproof: `http://qbag-backend.herokuapp.com${res.data.idproof}`,
                        // idproof: `http://127.0.0.1:8000${res.data.idproof}`
                    });

                    setLogin(true);

                    navigate("/dashboard/question");
                })
                .catch((err) => {
                    console.log(err);
                    if (
                        err.response.status === 401 &&
                        err.response.data.detail === "Invalid credentials, try again"
                    ) {
                        setMessage(multi.loginError1);
                        setTransition(() => TransitionLeft);
                        setOpen(true);
                    } else if (
                        err.response.status === 401 &&
                        err.response.data.detail === "Email is not verified"
                    ) {
                        setMessage(multi.loginError2);
                        setTransition(() => TransitionLeft);
                        setOpen(true);
                    }
                });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (login) {
            navigate("/dashboard/question");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="xl" disableGutters={true} sx={classes.image}>
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 9,
                    paddingLeft: 4,
                    paddingRight: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {multi.login}
                </Typography>
                <form sx={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={multi.email}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        error={emailerror}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={multi.password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={passerror}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={classes.submit}
                        onClick={handleSubmit}
                    >
                        {multi.login}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                variant="body2"
                            >
                                {multi.forgotPassword}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {multi.dontHaveAnAccountSignUp}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                message={message}
                key={"bottom center"}
            />
        </Container>
    );
}
