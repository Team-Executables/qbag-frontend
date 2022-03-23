import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { resQues } from '../../atoms';
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";
import MCQ from "./MCQ"
import Match from "./Match"

// MUI
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const ListQuestions = () => {

    const navigate = useNavigate();
    const uData = useRecoilValue(userData);
    const questions = useRecoilValue(resQues);

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Box>
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
        </Box>
    );
}

export default ListQuestions;