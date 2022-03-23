import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { resQues } from '../../atoms';
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";

// MUI
import { Box } from "@mui/material";

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
            {<pre>{JSON.stringify(questions, null, 4)}</pre>}
            {questions.map((ques) => (
                <Box key={ques.id}>

                </Box>
            ))}
        </Box>
    );
}

export default ListQuestions;