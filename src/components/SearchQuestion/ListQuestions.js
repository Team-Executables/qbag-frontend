import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { resQues } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";
import Match from "./Match";
import { difficulty } from "../../utils";

// MUI
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    Paper,
    RadioGroup,
    IconButton,
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
    const questions = useRecoilValue(resQues);

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
            {/* <pre>{JSON.stringify(questions, null, 4)}</pre> */}
            <Box sx={{ mt: 3, mb: 3 }}>
                {questions && questions.length > 0 && (
                    <Typography variant="h5">{`Board: ${questions[0].question_data.board}`}</Typography>
                )}
                {questions && questions.length > 0 && (
                    <Typography variant="h5">{`Grade: ${questions[0].question_data.grade}`}</Typography>
                )}
                {questions && questions.length > 0 && (
                    <Typography variant="h5">
                        {`Subject: ${questions[0].question_data.subject}`}
                    </Typography>
                )}
                {questions && questions.length > 0 && (
                    <Typography variant="h5">{`No. of questions: ${questions.length}`}</Typography>
                )}
            </Box>
            <Divider />
            {questions && questions.length > 0
                ? questions.map((q, key) => (
                    <Paper elevation={3} style={{ backgroundColor: "#e8f5e9" }}>
                        <Box p={2} mt={3}>
                            <Box
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div>
                                    <Typography variant="body1">
                                        {"Question " + (key + 1)}
                                    </Typography>
                                </div>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant="h6" sx={{ mr: 2, mt: 1 }}>
                                        {q.question_data.marks}{" "}
                                        {q.question_data.marks > 1 ? <>marks</> : <>mark</>}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mr: 2, mt: 1 }}>
                                        {getKeyByValue(difficulty, q.question_data.difficulty)}
                                    </Typography>
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
                            <Typography variant="h5">{q.question_data.title}</Typography>
                            { q.question_data.type === 'd' && <Match data={q.match_data} />}
                            {(q.question_data.type === 'b' || q.question_data.type === 'c') && 
                              <Typography variant="h6">{q.option_data[0].option}</Typography>
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
