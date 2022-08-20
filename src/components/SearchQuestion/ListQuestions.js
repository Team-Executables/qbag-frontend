import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userData, resQues, multilingual, selectedQues } from "../../atoms";
import { useNavigate, useSearchParams } from "react-router-dom";
import Question from "./Question";
import axiosInstance from "../../axios";
import ReviewQuestions from "./ReviewQuestions";
import SavePaper from "./SavePaper";
// MUI
import { Box, Paper, Button, Container } from "@mui/material";
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
            {questions && questions.length > 0 ? (
              questions.map((q, key) => (
                <Question q={q} qkey={key} key={q.title} />
              ))
            ) : (
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
            )}
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
    };

    axiosInstance
      .post(`questions/retrieve`, formData)
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      {questions && questions.length > 0 ? (
        <>
          <Box sx={{ maxWidth: { md: "50vw" }, margin: "auto" }}>
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
                  <Typography variant="body1">{`${multi.board}: ${questions[0].question_data.board}`}</Typography>
                </div>
              )}
              {questions && questions.length > 0 && (
                <div>
                  <Typography variant="body1">{`${multi.grade}: ${questions[0].question_data.grade}`}</Typography>
                </div>
              )}
              {questions && questions.length > 0 && (
                <div>
                  <Typography variant="body1">
                    {`${multi.subject}: ${questions[0].question_data.subject}`}
                  </Typography>
                </div>
              )}
              {questions && questions.length > 0 && (
                <div>
                  <Typography variant="body1">{`${multi.numQuestions}: ${questions.length}`}</Typography>
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
                  {multi.selectQuestions}: {selectedQuestions.length}
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
