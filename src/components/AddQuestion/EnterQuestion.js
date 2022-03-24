import { difficulty, questionTypes } from "../../utils";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useState } from "react";
import { question, MCQoptions, matchPairs } from "../../atoms";

const EnterQuestion = ({ qType }) => {
    const [ques, setQues] = useRecoilState(question);
    const [mcqs, setMcqs] = useRecoilState(MCQoptions);
    const tagz = mcqs.map((m) => m.option);
    const [tags, setTags] = useState([...tagz.splice(1)]);
    const [matchFields, setMatchFields] = useRecoilState(matchPairs);

    const addMatchField = () => {
        setMatchFields([
            ...matchFields,
            {
                key: '',
                value: ''
            }
        ])
    }

    const removeMatchFields = (index) => {
        const rows = [...matchFields];
        rows.splice(index, 1);
        setMatchFields(rows);
    }

    const handleMatchChange = (index, evnt) => {
        const { name, value } = evnt.target;
        let list = [...JSON.parse(JSON.stringify(matchFields))];
        list[index][name] = value;
        console.log(list);
        setMatchFields(list);
    }

    const handleQuesChange = (e) => {
        console.log(ques.title);
        setQues((ques) => ({
            ...ques,
            title: e.target.value,
        }));
    };

    const handleTextAnsChange = (e) => {
        setQues((q) => ({
            ...q,
            options: [
                {
                    option: e.target.value,
                    correct: true,
                },
            ],
        }));
        console.log(ques.options);
    };

    const handleCorrectMCQChange = (e) => {
        setMcqs((m) => {
            let newM = [...JSON.parse(JSON.stringify(m))];
            newM[0].option = e.target.value;
            console.log(newM);
            return newM;
        });
    };

    const handleWrongMCQChange = (newTags) => {
        console.log(newTags);
        const newWrongMcq = newTags.map((m) => ({
            option: m,
            correct: false,
        }));
        console.log(newWrongMcq);
        setMcqs((m) => {
            let newM = [];
            newM[0] = JSON.parse(JSON.stringify(m[0]));
            newM = newM.concat(newWrongMcq);
            console.log(newM);
            return newM;
        });
        setTags(newTags);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Enter Question
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Question"
                        fullWidth
                        variant="standard"
                        value={ques.title}
                        onChange={handleQuesChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    {qType === "a" ? (
                        <>
                            <TextField
                                required
                                id="corr-option"
                                name="corr-option"
                                label="Correct Option"
                                value={mcqs[0].option}
                                fullWidth
                                variant="standard"
                                onChange={handleCorrectMCQChange}
                            />
                            <Box sx={{ mt: 4 }}>
                                <ReactTagInput
                                    tags={tags}
                                    onChange={(newTags) => handleWrongMCQChange(newTags)}
                                    placeholder="Type wrong options and press enter"
                                />
                            </Box>
                        </>
                    ) : qType === "c" || qType === "b" ? (
                        <TextField
                            required
                            id="Answer"
                            name="Answer"
                            label="Answer"
                            fullWidth
                            variant="standard"
                            value={ques.options[0].option}
                            onChange={handleTextAnsChange}
                        />
                    ) : (
                        <div className="container">
                            {
                                matchFields.map((data, index) => {
                                    const { key, value } = data;
                                    return (
                                        <Box key={index} sx={{mt:2}}>
                                            <div className="col">
                                                <div className="form-group">
                                                    {/* <input type="text"  /> */}
                                                    <TextField
                                                        label="Key"
                                                        id="outlined-size-small"
                                                        defaultValue="Small"
                                                        size="small"
                                                        onChange={(evnt) => handleMatchChange(index, evnt)}
                                                        value={key} name="key"
                                                        className="form-control"
                                                        placeholder="Key"
                                                        sx={{ mt: 1 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    {/* <input type="text" onChange={(evnt) => handleMatchChange(index, evnt)} value={value} name="value" className="form-control" placeholder="value" /> */}
                                                    <TextField
                                                        label="Value"
                                                        id="outlined-size-small"
                                                        defaultValue="Small"
                                                        size="small"
                                                        className="form-control"
                                                        onChange={(evnt) => handleMatchChange(index, evnt)}
                                                        value={value}
                                                        name="value"
                                                        placeholder="Value"
                                                        sx={{ mt: 1 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                {
                                                    (matchFields.length !== 1) ?
                                                        <Button variant="outlined" size="small" color="error" sx={{ mt: 1 }} onClick={removeMatchFields}>Remove</Button> :
                                                        // <button className="btn btn-outline-danger" onClick={removeMatchFields}>Remove</button> :
                                                        ''
                                                }
                                            </div>
                                        </Box>
                                    )
                                })
                            }
                            <div className="row">
                                <div className="col-sm-12">
                                    <Button variant="contained" size="small" color="success" sx={{ mt: 3 }} onClick={addMatchField}>Add New</Button>
                                    {/* <button className="btn btn-outline-success" onClick={addMatchField}>Add New</button> */}
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default EnterQuestion;
