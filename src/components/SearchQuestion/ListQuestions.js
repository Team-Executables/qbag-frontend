import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userData, resQues, multilingual, selectedQues } from "../../atoms";
import { useNavigate, useSearchParams } from "react-router-dom";
import Question from "./Question";
import axiosInstance from "../../axios";
import ReviewQuestions from "./ReviewQuestions";
import SavePaper from "./SavePaper";
// MUI
import { Box, Paper, Button, Container, Stack, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const ListQuestions = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const uData = useRecoilValue(userData);
    const multi = useRecoilValue(multilingual);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const selectedQuestions = useRecoilValue(selectedQues);

    const [questions, setQuestions] = useRecoilState(resQues);

    const steps = [
        multi.selectQuestions,
        multi.reviewQuestions,
        multi.generatePaper,
    ];

    const handleNext = () => setActiveStep(activeStep + 1);

    const handleBack = () => setActiveStep(activeStep - 1);

    const checkCurrentState = (step) => {
        switch (step) {
            case 0:
                return selectedQuestions.length > 0 ? false : true;
            case 1:
                return false;
            case 2:
                return true;
            default:
                return true;
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        {questions && questions.length > 0
                            ? (
                                questions.map((q, key) => (
                                    <Question q={q} qkey={key} key={q.title} showCheckbox={true} showvote={true} />
                                ))
                            )
                            : (!loading && questions && questions.length === 0
                                ?
                                <Container
                                    component="main"
                                    maxWidth="sm"
                                    sx={{ mb: 4, p: { xs: 0, md: 1 }, textAlign: "center" }}
                                >
                                    <Paper
                                        variant="outlined"
                                        sx={{ my: { xs: 3, md: 15 }, p: { xs: 1, md: 3 } }}
                                    >
                                        <Typography variant="h5">{multi.noQuestionsFound}</Typography>
                                        <Button
                                            onClick={() => {
                                                navigate("/dashboard/question");
                                            }}
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3 }}
                                        >
                                            {multi.contributeQuestions}
                                        </Button>
                                    </Paper>
                                </Container>
                                :
                                <Stack spacing={1}>
                                    {/* For variant="text", adjust the height via font-size */}
                                    {/* For other variants, adjust the size with `width` and `height` */}

                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </Box>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Box sx={{ p: 3, mx: 5 }}>
                                        <Skeleton variant="rectangular" width={"100%"} height={60} />
                                        <Skeleton variant="rectangular" width={"100%"} height={60} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                    <Box sx={{ p: 3, mx: 5 }}>
                                        <Skeleton variant="rectangular" width={"100%"} height={60} />
                                        <Skeleton variant="rectangular" width={"100%"} height={60} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                </Stack>
                            )
                        }
                    </>
                );
            case 1:
                return <ReviewQuestions />;
            case 2:
                return <SavePaper searchParams={searchParams} />;
            default:
                throw new Error("Unknown step");
        }
    };

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const formData = {
            easy: searchParams.get("easy"),
            medium: searchParams.get("medium"),
            hard: searchParams.get("hard"),
            grade: searchParams.get("grade"),
            subject: searchParams.get("subject"),
            board: searchParams.get("board"),
            langMedium: searchParams.get("langMedium"),
            additional_ques: parseInt(searchParams.get("additional_ques")),
        };

        axiosInstance
            .post(`questions/retrieve`, formData)
            .then((res) => {
                console.log(res);
                setQuestions(res.data);
                console.log(res.data);
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            });
    }, []);

    return (
        <Box>
            {questions && questions.length > 0 ? (
                <>
                    <Box sx={{ maxWidth: { md: "50vw" }, margin: "auto", mb: 3 }}>
                        <Box
                            sx={{
                                mt: 3,
                                mb: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                flexWrap: "wrap",
                            }}
                        >
                            {questions && questions.length > 0 && (
                                <div>
                                    <Typography variant="body1"><b>{`${multi.board}:`}</b>{` ${questions[0].question_data.board}`}</Typography>
                                </div>
                            )}
                            {questions && questions.length > 0 && (
                                <div>
                                    <Typography variant="body1"><b>{`${multi.grade}:`}</b>{` ${questions[0].question_data.grade}`}</Typography>
                                </div>
                            )}
                            {questions && questions.length > 0 && (
                                <div>
                                    <Typography variant="body1">
                                        <b>{`${multi.subject}:`}</b>{` ${questions[0].question_data.subject}`}
                                    </Typography>
                                </div>
                            )}
                            {questions && questions.length > 0 && (
                                <div>
                                    <Typography variant="body1"><b>{`${multi.numQuestions}:`}</b>{` ${questions.length}`}</Typography>
                                </div>
                            )}
                        </Box>
                        <Box displayPrint="none">
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                            displayPrint="none"
                        >
                            <Box>
                                <Typography variant="body1">
                                    {multi.selectedQuestions}: {selectedQuestions.length}
                                </Typography>
                            </Box>
                            <Box>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack}>{multi.back}</Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={checkCurrentState(activeStep)}
                                >
                                    {activeStep === steps.length - 1
                                        ? multi.savePaper
                                        : multi.next}
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Divider />
                </>
            ) : null}
            {getStepContent(activeStep)}
        </Box>
    );
};

export default ListQuestions;
