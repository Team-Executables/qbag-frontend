import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userData, resQues, multilingual } from "../../atoms";
import { useNavigate } from "react-router-dom";
import Match from "./Match";


// MUI
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    Paper,
    RadioGroup,
    IconButton,
    Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axiosInstance from "../../axios";



const ListQuestions = () => {
    const navigate = useNavigate();
    const uData = useRecoilValue(userData);
    // const questions = useRecoilValue(resQues);
    const multi = useRecoilValue(multilingual);

    const difficulty = {
        [multi.easy]: "a",
        [multi.medium]: "b",
        [multi.hard]: "c",
    };


    const [questions, setQuestions] = useRecoilState(resQues);


    function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }

    function handleVote(str, id) {
        if (str === "up") {
            axiosInstance
                .post(`questions/vote`, {
                    "question": id,
                    "vote": 1,
                })
                .then((res) => {
                    console.log(res);
                    // setQuestions((q)=> {
                    //     let newQ = [...JSON.parse(JSON.stringify(q))];
                    //     let objToUpdate = newQ.filter(nQ => nQ.id == id);
                    //     objToUpdate[0].upvote+=1;
                    //     let arrToAppend = newQ.filter(nQ => nQ.id != id);
                    //     let finArr = arrToAppend.concat(objToUpdate);
                    //     return finArr;
                    // })
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

        } else {
            axiosInstance
                .post(`questions/vote`, {
                    "question": id,
                    "vote": 0,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                {/* <pre>{JSON.stringify(questions, null, 4)}</pre> */}
                <Box sx={{ mt: 3, mb: 3 }}>
                    {questions && questions.length > 0 && (
                        <Typography variant="h5">{`${multi.board}: ${questions[0].question_data.board}`}</Typography>
                    )}
                    {questions && questions.length > 0 && (
                        <Typography variant="h5">{`${multi.grade}: ${questions[0].question_data.grade}`}</Typography>
                    )}
                    {questions && questions.length > 0 && (
                        <Typography variant="h5">
                            {`${multi.subject}: ${questions[0].question_data.subject}`}
                        </Typography>
                    )}
                    {questions && questions.length > 0 && (
                        <Typography variant="h5">{`${multi.numQuestions}: ${questions.length}`}</Typography>
                    )}
                </Box>
                <Box displayPrint="none">
                    <Button variant="contained" onClick={() => window.print()} >{multi.exportPDF}</Button>
                </Box>
            </Box>
            <Divider />
            {questions && questions.length > 0
                ? questions.map((q, key) => (
                    <Paper elevation={3} style={{ backgroundColor: "#e8f5e9" }}>
                        <Box p={2} mt={3}>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="h5" sx={{ m: 0, p: 0 }}>
                                        {multi.question + (key + 1)}
                                    </Typography>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ mr: 1, mt: 1 }}>
                                            <IconButton color="primary">
                                                {q.question_data.setbyTeacher ? <VerifiedIcon /> : ""}
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <IconButton color="primary" aria-label="upvote" component="span" onClick={() => handleVote("up", q.id)}>
                                                <ThumbUpIcon />&nbsp;<span>{q.upvote}</span>
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <IconButton color="primary" aria-label="downvote" component="span" onClick={() => handleVote("down", q.id)}>
                                                <ThumbDownIcon />&nbsp;<span>{q.downvote}</span>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant="h6" sx={{ mr: 2, mt: 0, mb: 1 }}>
                                        {q.question_data.marks}{" "}
                                        {q.question_data.marks > 1 ? <>{multi.marks}</> : <>{multi.mark}</>} {" "} &nbsp;
                                        {getKeyByValue(difficulty, q.question_data.difficulty)}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="h6">{q.question_data.title}</Typography>
                            {q.question_data.type === 'd' && <Match data={q.match_data} />}
                            {(q.question_data.type === 'b' || q.question_data.type === 'c') &&
                                <Typography variant="h6"><b>{multi.answer}</b>: {q.option_data[0].option}</Typography>
                            }
                            {
                                q.question_data.type === 'a' && <FormControl component="fieldset">
                                    <RadioGroup value={q.option_data[0].option}>
                                        {q.option_data.map((l) => (
                                            <FormControlLabel
                                                value={l.option}
                                                control={<Radio />}
                                                label={l.option}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            }
                        </Box>
                    </Paper>
                ))
                : null}
        </Box>
    );
};

export default ListQuestions;
