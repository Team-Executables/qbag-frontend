import { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import EnterQuestion from "./EnterQuestion";
import ReviewQuestion from "./ReviewQuestion";
import axiosInstance from "../../axios";
import { useRecoilValue } from "recoil";
import { question, matchPairs, MCQoptions, multilingual } from "../../atoms";
import { useNavigate } from "react-router-dom";


// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CssBaseline from "@mui/material/CssBaseline";



export default function AddQuestion() {
    const initialQuestionDetails = {
        type: "a",
        grade: "",
        board: "",
        marks: "",
        medium: "",
        difficulty: "",
        subject: "",
        keywords: [],
    };

    // const initialQuestion = {
    //   title: "",
    //   options: [],
    // };

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [questionDetails, setQuestionDetails] = useState(
        initialQuestionDetails
    );
    // const [question, setQuestion] = useState(initialQuestion);
    const [kwords, setKwords] = useState([]);
    const [respons, setRespons] = useState([]);
    const q = useRecoilValue(question);
    const mp = useRecoilValue(matchPairs);
    const mcqs = useRecoilValue(MCQoptions);
    const multi = useRecoilValue(multilingual);

    const steps = [multi.questionDetails, multi.enterQuestion, multi.reviewQuestion];


    const handleNext = () => {
        if (questionDetails.type === "a") {
            if (activeStep + 1 === steps.length) {
                let objToSend = {
                    ...questionDetails,
                    title: q.title,
                    options: mcqs,
                };
                console.log({ objToSend });
                axiosInstance
                    .post(`questions/create`, objToSend)
                    .then((res) => {
                        console.log(res);
                        // console.log(res.data);
                        setRespons(res);

                    })
                    .catch((err) => {
                        // console.log(err);
                        if (err.response.status === 409) {
                            console.log(err.response);
                            setRespons(err.response);
                        }
                        if (err.response.status === 400) {
                            console.log(err);
                        }
                    });
            }
        }
        if (questionDetails.type === "b" || questionDetails.type === "c") {
            if (activeStep + 1 === steps.length) {
                let objToSend = {
                    ...questionDetails,
                    ...q,
                    match: [],
                };
                console.log(objToSend);
                axiosInstance
                    .post(`questions/create`, objToSend)
                    .then((res) => {
                        console.log(res);
                        setRespons(res);
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 409) {
                            console.log(err.response);
                            setRespons(err.response);
                        }
                        if (err.response.status === 400) {
                            console.log(err);
                        }
                    });
            }
        }
        if (questionDetails.type === "d") {
            let que = JSON.parse(JSON.stringify(q));
            que["options"] = [];

            if (activeStep + 1 === steps.length) {
                let objToSend = {
                    ...questionDetails,
                    ...que,
                    match: mp,
                };
                console.log(objToSend);
                axiosInstance
                    .post(`questions/create`, objToSend)
                    .then((res) => {
                        console.log(res);
                        setRespons(res);
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 409) {
                            console.log(err.response);
                            setRespons(err.response);
                        }
                        if (err.response.status === 400) {
                            console.log(err);
                        }
                    });
            }
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => setActiveStep(activeStep - 1);

    const checkCurrentState = (step) => {
        switch (step) {
            case 0:
                for (let [key, value] of Object.entries(questionDetails)) {
                    if (value.length === 0) {
                        return true;
                    }
                }
                return false;
            case 1:
                return false;
            case 2:
                return false;
            default:
                return false;
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <QuestionDetails
                        questionDetails={questionDetails}
                        setQuestionDetails={setQuestionDetails}
                        kwords={kwords}
                        setKwords={setKwords}
                    />
                );
            case 1:
                return <EnterQuestion qType={questionDetails.type} />;
            case 2:
                return <ReviewQuestion qType={questionDetails.type} />;
            default:
                throw new Error("Unknown step");
        }
    };

    return (
        <>
            <CssBaseline />
            <Container
                component="main"
                maxWidth="sm"
                sx={{ mb: 4, p: { xs: 0, md: 1 } }}
            >
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 1, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        {multi.addQuestion}
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                {respons.status === 201 ? (
                                    <>
                                        <Typography variant="h5" gutterBottom>
                                            {multi.enterQuestionSuccess}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {respons.data.question_data.title}
                                        </Typography>
                                        <Button
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3 }}
                                        >
                                            {multi.addAnotherQuestion}
                                        </Button>
                                    </>
                                ) : respons.status === 409 ? (
                                    <>
                                        <Typography variant="h5" gutterBottom>
                                            {multi.enterQuestionError}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {respons.data.similar_question_data.title}
                                        </Typography>
                                        <Button
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3 }}
                                        >
                                            {multi.addAnotherQuestion}
                                        </Button>
                                    </>
                                ) : (
                                    <Skeleton variant="text" />
                                )}
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            {multi.back}
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={checkCurrentState(activeStep)}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1
                                            ? multi.submitQuestion
                                            : multi.next}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
            </Container>
        </>
    );
}
