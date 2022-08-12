import { useState } from "react";
import axiosInstance from "../axios";
import AlertDialog from "./AlertDialog";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { multilingual } from "../atoms";

//IMAGE
import study4 from "../images/study4.svg";

//MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import green from "@mui/material/colors/green";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const classes = {
  background: {
    backgroundImage: `url(${study4})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: green[50],
    backgroundSize: "auto",
    backgroundPosition: "center",
    height: "92vh",
  },
  paper: {
    marginTop: theme.spacing(24),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const multi = useRecoilValue(multilingual);


  //Snackbar
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  //AlertDialog
  const [openState, setOpenState] = useState(false);
  const openDialog = () => setOpenState(true);
  const closeDialog = () => setOpenState(false);

  const handleChange = (e) => {
    setEmailerror(false);
    setEmail(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    // Validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let submit = true;

    setEmailerror(false);

    if (email === "" || !re.test(email)) {
      setEmailerror(true);
      submit = false;
      console.log(submit);
      console.log(email);
    }

    if (submit) {
      axiosInstance
        .post(`auth/request-reset-email`, {
          email: email,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          openDialog();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
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
        <Grid item mt={15}>
          <CssBaseline />
          <div sx={classes.paper}>
            <Box fontSize={25} fontWeight="fontWeightBold" pb={1}>
              {multi.getResetLink}
            </Box>
            <form sx={classes.form}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={multi.email}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                error={emailerror}
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
                  <Link component={RouterLink} to="/" variant="body2">
                    {multi.backToHome}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message={multi.forgotPasswordError}
            key={"bottom center"}
          />
          <AlertDialog
            open={openState}
            closeDialog={closeDialog}
            title={multi.forgotPasswordAlertTitle}
            description={multi.forgotPasswordAlertDescription}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
