import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { resQues } from '../../atoms';
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";
import MCQ from "./MCQ"
import Match from "./Match"
import {difficulty} from "../../utils"

// MUI
import { Box, FormControl, FormControlLabel, Radio, Paper, RadioGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const ListQuestions = () => {

    const navigate = useNavigate();
    const uData = useRecoilValue(userData);
    const questions = useRecoilValue(resQues);

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Box>
            <pre>{JSON.stringify(questions, null, 4)}</pre>
            {questions.map((ques) => (
                <Box key={ques.id} sx={{ mx: 1, my: 2 }}>
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {ques.question_data.title}
                    </Typography>
                    {(ques.question_data.type === 'a') && <MCQ data={ques.option_data} />}
                    {(ques.question_data.type === 'd') && <Match data={ques.match_data} />}
                    <Divider />
                </Box>
            ))}
            {questions && questions.length > 0 ?
                questions.map((q, key) => (
                    <Paper elevation={3} style={{ backgroundColor: "#e1f5fe" }}>
                        <Box p={2} mt={3}>
                            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Typography variant="h6">
                                        {"Question " + (key + 1)}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h6">
                                        {q.question_data.marks} {q.question_data.marks > 1 ? <>marks</> : <>mark</>}
                                    </Typography>
                                    <Typography variant="h6">
                                        {getKeyByValue(difficulty, q.question_data.difficulty)}
                                    </Typography>
                                </div>
                                
                            </Box>
                            <Typography>
                                {q.question_data.title}
                            </Typography>
                            {/* <FormControl component="fieldset">
                                <RadioGroup aria-label={"options" + q.id} name={"Question" + (key + 1)} value={q.marked_option_number}>
                                    <FormControlLabel value={1} control={<Radio />} label={q.option1} />
                                    <FormControlLabel value={2} control={<Radio />} label={q.option2} />
                                    <FormControlLabel value={3} control={<Radio />} label={q.option3} />
                                    <FormControlLabel value={4} control={<Radio />} label={q.option4} />
                                </RadioGroup>
                            </FormControl>
                            <Box mt={2}>
                                <strong>Correct Option Number: {q.correct_option_number} </strong>
                            </Box> */}
                        </Box>
                    </Paper>
                ))
                :
                null
            }
        </Box>
    );
}

export default ListQuestions;