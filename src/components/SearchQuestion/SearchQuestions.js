import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData, resQues, multilingual } from "../../atoms";
import { multilingualSupport } from "../../utils";


//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";


const SearchQuestions = () => {
    const navigate = useNavigate();
    const uData = useRecoilValue(userData);

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialFormData = Object.freeze({
        easy: "",
        medium: "",
        hard: "",
        board: "",
        grade: "",
        subject: "",
        langMedium: "",
        extraQuestions: ""
    });

    const [formData, updateFormData] = useState(initialFormData);

    const [resQ, setResQ] = useRecoilState(resQues);
    const multi = useRecoilValue(multilingual);

    const handleChange = (e) => {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);


        axiosInstance
            .post(`questions/retrieve`, formData)
            .then((res) => {
                console.log(res);
                setResQ(res.data);
                console.log(res.data);
                navigate({
                    pathname: "/dashboard/question/list",
                    search: `?easy=${formData.easy}&medium=${formData.medium}&hard=${formData.hard}&grade=${formData.grade}&subject=${formData.subject}&board=${formData.board}&langMedium=${formData.langMedium}&additional_ques=${formData.extraQuestions}`,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");

    const handleTitle = (event) => { 
        setTitle(event.target.value);
    }

    const handleSave = (event) => {
        event.preventDefault();
        axiosInstance.post(`questions/save-url-template`, {
            name: title,
            template_string: `/dashboard/question/list?easy=${formData.easy}&medium=${formData.medium}&hard=${formData.hard}&grade=${formData.grade}&subject=${formData.subject}&board=${formData.board}&langMedium=${formData.langMedium}`,
        }).then((res) => {
            console.log(res);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Grid container component="main">
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
                    <SearchIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    {multi.searchQuestion}
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Easy"
                                label={multi.easy}
                                name="easy"
                                autoComplete="easy"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Medium"
                                label={multi.medium}
                                name="medium"
                                autoComplete="medium"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Hard"
                                label={multi.hard}
                                name="hard"
                                autoComplete="hard"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="subject"
                                label={multi.subject}
                                id="Subject"
                                autoComplete="subject"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="grade"
                                label={multi.grade}
                                id="Grade"
                                autoComplete="grade"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Board"
                                label={multi.board}
                                name="board"
                                autoComplete="board"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="select-labelll">{multi.langMedium}</InputLabel>
                                <Select
                                    name="langMedium"
                                    labelId="select-labelll"
                                    id="selecttt"
                                    value={formData.langMedium}
                                    label={multi.langMedium}
                                    required
                                    onChange={handleChange}
                                >
                                    {Object.keys(multilingualSupport).map((lang) => (
                                        <MenuItem key={lang} value={lang}>
                                            {lang}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item justify="center" marginX="auto">
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="extraQuestions"
                                label={multi.extraQuestions}
                                name="extraQuestions"
                                autoComplete="extraQuestions"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={(theme) => ({
                                margin: theme.spacing(3, 0, 2),
                                mt: 5,
                                mx: "auto"
                            })}
                        >
                            {multi.search}
                        </Button>
                    </Grid>
                </form>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{marginTop: "20px"}}>
                        <Checkbox checked={checked} onChange={handleCheck} inputProps={{ "aria-label": "primary checkbox" }}/>
                        <Typography variant="p">
                            {multi.savePrompt}
                        </Typography>
                    </Box>
                    <Box>
                        {
                            checked && <TextField label="Template Name" onChange={handleTitle} value={title}  
                                sx={{marginTop: "5px"}}/>
                        }
                    </Box>
                    <Box>
                        {
                            checked && <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{marginTop: "10px"}}
                            >{multi.save}</Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SearchQuestions;
