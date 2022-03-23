import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Copyright from "./copyright";
import AlertDialog from "./AlertDialog";
import FileUpload from "react-material-file-upload";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../atoms";

//IMAGE
import study2 from "../images/study2.svg";

//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function Register() {
  const log = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (log) {
      navigate("/dashboard/question");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialFormData = Object.freeze({
    email: "",
    name: "",
    employment: "",
    password: "",
    user_type: "",
    id_proof: [],
  });

  const initialTeacherData = Object.freeze({
    college: "",
    position: "",
  });

  const initialthersData = Object.freeze({
    education: "",
  });

  const [file, setFile] = useState([]);

  const [formData, updateFormData] = useState(initialFormData);
  const [teacherData, updateTeacherData] = useState(initialTeacherData);
  const [othersData, updateOthersData] = useState(initialthersData);

  const [emailerror, setEmailerror] = useState(false);
  const [nameerror, setNameerror] = useState(false);
  const [passerror, setPasserror] = useState(false);
  const [typeerror, setTypeerror] = useState(false);
  const [fileerror, setFileerror] = useState(false);
  const [employmenterror, setEmploymenterror] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  const [positionerror, setPositionerror] = useState(false);
  const [educationerror, setEducationerror] = useState(false);

  //Snackbar
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  //AlertDialog
  const [openState, setOpenState] = useState(false);
  const openDialog = () => setOpenState(true);
  const closeDialog = () => {
    setOpenState(false);
    navigate("/login");
  };

  const handleChange = (e) => {
    setEmailerror(false);
    setNameerror(false);
    setPasserror(false);
    setTypeerror(false);
    setFileerror(false);
    setEmploymenterror(false);

    const newState = {
      ...formData,
      [e.target.name]:
        typeof e.target.value === "string"
          ? e.target.value.trim()
          : e.target.value,
    };

    updateFormData(newState);

    console.log({ formData });
  };

  const handleTeacherChange = (e) => {
    setCollegeError(false);
    setPositionerror(false);

    if (formData.user_type === "teacher") {
      updateTeacherData({
        ...teacherData,
        [e.target.name]: e.target.value,
      });
    }
    console.log({ teacherData });
  };

  const handleOthersChange = (e) => {
    setEducationerror(false);

    if (formData.user_type === "other") {
      updateOthersData({
        ...othersData,
        [e.target.name]: e.target.value,
      });
    }
    console.log({ othersData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let submit = true;

    setEmailerror(false);
    setNameerror(false);
    setPasserror(false);
    setTypeerror(false);
    setFileerror(false);
    setEmploymenterror(false);
    setCollegeError(false);
    setPositionerror(false);
    setEducationerror(false);

    //email validation
    if (formData.email === "" || !re.test(formData.email)) {
      setEmailerror(true);
      submit = false;
      console.log(submit);
      console.log(formData.email);
    }

    //name validation
    if (
      formData.name === "" ||
      formData.name.length < 3 ||
      formData.name.length > 19 ||
      /\d/.test(formData.name)
    ) {
      setNameerror(true);
      submit = false;
      console.log(submit);
      console.log(formData.name);
    }

    if (
      formData.employment === "" ||
      formData.employment.length < 3 ||
      formData.employment.length > 19 ||
      /\d/.test(formData.employment)
    ) {
      setEmploymenterror(true);
      submit = false;
      console.log(submit);
      console.log(formData.employment);
    }

    //password validation
    if (formData.password === "" || formData.password.length < 6) {
      setPasserror(true);
      submit = false;
      console.log(submit);
      console.log(formData.password);
    }

    //user_type validation
    if (formData.user_type === "") {
      setTypeerror(true);
      submit = false;
      console.log(submit);
      console.log(formData.user_type);
    }

    //id_proof validation
    if (formData.id_proof.length === 0) {
      setFileerror(true);
      submit = false;
      console.log(submit);
      console.log(formData.id_proof);
    }

    //teacher fields validation
    if (formData.user_type === "teacher") {
      if (
        teacherData.college === "" ||
        teacherData.college.length < 3 ||
        teacherData.college.length > 19 ||
        /\d/.test(teacherData.college)
      ) {
        setCollegeError(true);
        submit = false;
        console.log(submit);
        console.log(teacherData.college);
      }

      if (
        teacherData.position === "" ||
        teacherData.position.length < 3 ||
        teacherData.position.length > 19 ||
        /\d/.test(teacherData.position)
      ) {
        setPositionerror(true);
        submit = false;
        console.log(submit);
        console.log(teacherData.position);
      }
    }

    //others fields validation
    if (formData.user_type === "other") {
      if (
        othersData.education === "" ||
        othersData.education.length < 3 ||
        othersData.education.length > 19 ||
        /\d/.test(othersData.education)
      ) {
        setEducationerror(true);
        submit = false;
        console.log(submit);
        console.log(othersData.education);
      }
    }
    if (submit) {
      console.log("balle balle");
      let form_data = new FormData();

      form_data.append("name", formData.name);
      form_data.append("email", formData.email);
      form_data.append("employment", formData.employment);
      form_data.append("password", formData.password);
      form_data.append("user_type", formData.user_type);
      form_data.append("idproof", formData.id_proof[0]);

      if (formData.user_type === "other") {
        form_data.append("education", othersData.education);
      }

      if (formData.user_type === "teacher") {
        form_data.append("college", teacherData.college);
        form_data.append("position", teacherData.position);
      }
      for (let value of form_data.entries()) {
        console.log(value);
      }

      axiosInstance
        .post(`auth/register`, form_data)
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

  useEffect(() => {
    updateFormData((data) => ({
      ...data,
      id_proof: file,
    }));
  }, [file]);

  return (
    <Grid container component="main">
      <Grid item xs={12} sm={9} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 5,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "primary.main" }}>
            <PersonOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                  error={nameerror}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={emailerror}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Employment"
                  label="Employment"
                  name="employment"
                  autoComplete="Employment"
                  onChange={handleChange}
                  error={employmenterror}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={passerror}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUpload
                  required
                  value={file}
                  onChange={setFile}
                  buttonText="Upload Photo ID"
                  title="Drad 'n' Drop or select a valid identity proof."
                  sx={fileerror ? { borderColor: "red" } : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="select-label">User Type</InputLabel>
                  <Select
                    name="user_type"
                    labelId="select-label"
                    id="select"
                    value={formData.user_type}
                    label="User Type"
                    required
                    onChange={handleChange}
                    error={typeerror}
                  >
                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                    <MenuItem value={"other"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formData.user_type === "other" ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="education"
                    label="Education"
                    name="education"
                    autoComplete="education"
                    onChange={handleOthersChange}
                    error={educationerror}
                  />
                </Grid>
              ) : formData.user_type === "teacher" ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="college"
                      label="College"
                      name="college"
                      autoComplete="college"
                      onChange={handleTeacherChange}
                      error={collegeError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="position"
                      label="Position"
                      name="position"
                      onChange={handleTeacherChange}
                      error={positionerror}
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={(theme) => ({
                margin: theme.spacing(3, 0, 2),
              })}
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </Box>
      </Grid>
      <CssBaseline />
      <Grid
        item
        xs={0}
        sm={3}
        md={7}
        sx={{
          backgroundImage: `url(${study2})`,
          backgroundRepeat: "no-repeat",
          bgcolor: "secondary.main",
          backgroundSize: "auto",
          backgroundPosition: "center top",
        }}
      ></Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Invalid Registration Data! Please Try Again"
        key={"bottom center"}
      />
      <AlertDialog
        open={openState}
        closeDialog={closeDialog}
        title="Verify Email"
        description="An email verification link has been sent on the given email address.\nPlease verify your email to complete the account setup.\nVerification link is valid for 24 hrs"
      />
    </Grid>
  );
}
