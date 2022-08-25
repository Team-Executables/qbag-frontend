import React from "react";
import Match from "./Match";
import { useRecoilValue, useRecoilState } from "recoil";
import { multilingual, selectedQues } from "../../atoms";
import axiosInstance from "../../axios";

import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReportIcon from '@mui/icons-material/Report';
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
import { useState } from "react";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Question = ({ q, qkey, showCheckbox, showvote }) => {
    const multi = useRecoilValue(multilingual);
    const [upvotes, setUpVotes] = useState(q.upvote);
    const [reason, setReason] = useState('');
    const [downvotes, setDownVotes] = useState(q.downvote);
    const [selectedQuestions, setSelectedQuestions] =
        useRecoilState(selectedQues);

    const difficulty = {
        [multi.easy]: "a",
        [multi.medium]: "b",
        [multi.hard]: "c",
    };



    // const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };


    const [openDownvoteReason, setOpenDownvoteReason] = useState(false);
    const [ques_id, setQues_id] = useState(0);

    const handleClickOpenDownvoteReason = () => {
        setOpenDownvoteReason(true);
    };

    const handleCloseDownvoteReason = () => {
        setOpenDownvoteReason(false);
    };



    function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }

    const isSelected = selectedQuestions.indexOf(q.id);

    function handleUpVote(id) {
        axiosInstance
            .post(`questions/vote`, {
                question: id,
                vote: 1,
                reason: '',
            })
            .then((res) => {
                setUpVotes((d) => d + 1);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => document.location.reload(true));
    }

    function handleDownVote(id) {
        if (reason.length > 0) {
            axiosInstance
                .post(`questions/vote`, {
                    question: id,
                    vote: 0,
                    "reason": reason,
                })
                .then((res) => {
                    setDownVotes((d) => d + 1);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => document.location.reload(true));
        }
    }

    const handleCheckboxChange = (e) => {
        // console.log(e.target.checked);
        if (e.target.checked) {
            setSelectedQuestions((selectedQuestions) => {
                // console.log(selectedQuestions);
                const qs = JSON.parse(JSON.stringify(selectedQuestions));
                qs.push(q.id);
                // console.log(qs);
                return qs;
            });
        } else {
            setSelectedQuestions((selectedQuestions) => {
                // console.log(selectedQuestions);
                let qs = JSON.parse(JSON.stringify(selectedQuestions));
                const index = qs.indexOf(q.id);
                if (index > -1) {
                    qs.splice(index, 1);
                }
                // console.log(qs);
                return qs;
            });
        }
    };

    return (
        <Paper
            elevation={3}
            style={{ backgroundColor: "#e8f5e9", display: "flex", marginTop: 25 }}
        >
            {showCheckbox && (
                <Box my={1.5}>
                    <Checkbox checked={isSelected > -1} onChange={handleCheckboxChange} />
                </Box>
            )}
            <Box m={1} sx={{ width: "100%" }}>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ m: 0, p: 0 }}>
                                {multi.question + " " + (qkey + 1)}
                            </Typography>
                        </Box>
                        {showvote && (
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                    }}
                                    displayPrint="none"
                                >
                                    <Box sx={{ mr: 1, mt: 1 }}>
                                        <IconButton color="primary">
                                            {q.question_data.setbyTeacher ? <VerifiedIcon /> : ""}
                                        </IconButton>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            color="primary"
                                            aria-label="upvote"
                                            component="span"
                                            onClick={() => handleUpVote(q.id)}
                                        >
                                            <ThumbUpIcon />
                                            &nbsp;<span>{upvotes}</span>
                                        </IconButton>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            color="primary"
                                            aria-label="downvote"
                                            component="span"
                                            onClick={() => { setQues_id(q.id); handleClickOpenDownvoteReason() }}
                                        >
                                            <ThumbDownIcon />
                                            &nbsp;<span>{downvotes}</span>
                                        </IconButton>
                                    </Box>
                                    {/* <Box
                                        component="span"
                                        m={1}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <IconButton variant="outlined" onClick={handleClickOpen}>
                                            <ReportIcon />
                                        </IconButton>
                                    </Box> */}
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="h6" sx={{ mr: 2, mt: 0, mb: 1 }}>
                            {q.question_data.marks}{" "}
                            {q.question_data.marks > 1 ? (
                                <>{multi.marks}</>
                            ) : (
                                <>{multi.mark}</>
                            )}{" "}
                            &nbsp;
                            {getKeyByValue(difficulty, q.question_data.difficulty)}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6">{q.question_data.title}</Typography>
                {q.question_data.type === "d" && <Match data={q.match_data} />}
                {(q.question_data.type === "b" || q.question_data.type === "c") && (
                    <Typography variant="h6">
                        <b>{multi.answer}</b>: {q.option_data[0].option}
                    </Typography>
                )}
                {q.question_data.type === "a" && (
                    <FormControl>
                        <RadioGroup value={
                            q.option_data.find(opt => opt.correct).option
                        }>
                            {q.option_data.map((l) => (
                                <FormControlLabel
                                    value={l.option}
                                    control={<Radio />}
                                    label={l.option}
                                    key={l.option}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
                {/* <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Report Question</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide a reason for reporting the question below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="reasonReport"
                            label="Reason for reporting"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Report</Button>
                    </DialogActions>
                </Dialog> */}


                <Dialog open={openDownvoteReason} onClose={handleCloseDownvoteReason}>
                    <DialogTitle>Reason for Downvote</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide a reason for downvoting the question
                        </DialogContentText>
                        <Box pt={2}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="reasonDownvote"
                                label="Reason for downvoting"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDownvoteReason}>Cancel</Button>
                        <Button variant="contained" onClick={() => { handleDownVote(ques_id) }}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Paper>
    );
};

export default Question;
