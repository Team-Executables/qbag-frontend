import { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import EnterQuestion from "./EnterQuestion";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

const steps = ["Question Details", "Enter Question", "Review question"];

export default function AddQuestion() {
  const initialQuestionDetails = {
    type: "a",
    class: "",
    board: "",
    marks: "",
    difficulty: "",
    subject: "",
    keywords: [],
  };

  const initialQuestion = {
    title: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [questionDetails, setQuestionDetails] = useState(
    initialQuestionDetails
  );
  const [question, setQuestion] = useState(initialQuestion);

  const handleNext = () => setActiveStep(activeStep + 1);

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
        return true;
      case 2:
        return false;
      default:
        return true;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <QuestionDetails
            questionDetails={questionDetails}
            setQuestionDetails={setQuestionDetails}
          />
        );
      case 1:
        return (
          <EnterQuestion
            qType={questionDetails.type}
            question={question}
            setQuestion={setQuestion}
          />
        );
      case 2:
        return <div>Review your question</div>;
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
            Add Question
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
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={checkCurrentState(activeStep)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Submit Question"
                      : "Next"}
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
