import useQuestions from "../../hooks/useQuestions";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { multilingual, selectedQues } from "../../atoms";
import StatsTable from "./StatsTable";
import CheckUnvettedQuestion from "./CheckUnvettedQuestion";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../../axios";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import VOTES_THRESHOLD from "../../utils";

const SavePaper = ({ searchParams }) => {
  let displayData = {
    easy: 0,
    medium: 0,
    hard: 0,
    totalQues: 0,
    marks: 0,
    mcq: 0,
    oneWord: 0,
    fillInTheBlanks: 0,
    match: 0,
  };

  const navigate = useNavigate();
  const selectedQs = useRecoilValue(selectedQues);
  const questions = useQuestions();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [vulnerable, setVulnerable] = useState(false);
  const multi = useRecoilValue(multilingual);

  const handleChange = (e) => setName(e.target.value.trim());

  const handleSubmit = () => {
    if (name.length === 0) {
      setNameError(true);
    }

    axiosInstance
      .post("questions/create-paper", { name, questions: selectedQs })
      .then((res) => {
        console.log(res);
        navigate("/dashboard/question/paper");
      })
      .catch((err) => {
        console.log(err);
      });

    const promises = selectedQs.map((ele) =>
      axiosInstance.post(`questions/vote`, {
        question: ele,
        vote: 1,
      })
    );

    Promise.all(promises).then((d) => {
      //   const qData = d.map((ele) => ele.data);
      console.log(d);
    });
  };

  useEffect(() => {
    console.log(searchParams);
    if (questions.length > 0) {
      questions.forEach((q) => {
        displayData.marks += q.question_data.marks;

        if (q.question_data.type === "a") {
          displayData.mcq += 1;
        } else if (q.question_data.type === "b") {
          displayData.oneWord++;
        } else if (q.question_data.type === "c") {
          displayData.fillInTheBlanks++;
        } else if (q.question_data.type === "d") {
          displayData.match++;
        }

        if (q.question_data.difficulty === "a") {
          displayData.easy++;
        } else if (q.question_data.difficulty === "b") {
          displayData.medium++;
        } else if (q.question_data.difficulty === "c") {
          displayData.hard++;
        }

        if (
          !(q.total_votes >= VOTES_THRESHOLD && q.upvote > VOTES_THRESHOLD / 2)
        ) {
          setVulnerable(true);
        }
      });
      displayData.totalQues = questions.length;
      setData(displayData);
    }
  }, [questions]);

  return (
    <>
      {data ? (
        <Box sx={{ marginTop: 3 }}>
          <Box
            sx={{
              mt: 5,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StatsTable
              reqEasy={searchParams.get("easy")}
              reqMedium={searchParams.get("medium")}
              reqHard={searchParams.get("hard")}
              easy={data.easy}
              medium={data.medium}
              hard={data.hard}
              a={data.mcq}
              b={data.oneWord}
              c={data.fillInTheBlanks}
              d={data.match}
            />
          </Box>

          {vulnerable && (
            <Box
              sx={{
                mt: 3,
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Paper
                variant="outlined"
                elevation={8}
                sx={{ marginTop: 3, p: 2 }}
              >
                <Typography variant="h6" gutterBottom sx={{ p: 0, m: 0 }}>
                  {multi.vettedWarning}
                </Typography>
                {vulnerable && <CheckUnvettedQuestion ques={questions} />}
              </Paper>
            </Box>
          )}

          <Box
            sx={{
              mt: 10,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              required
              id="Name"
              label={multi.paperName}
              error={nameError}
              name="name"
              onChange={handleChange}
              sx={{ maxWidth: "400px", width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 1, marginLeft: 1 }}
            >
              {multi.savePaper}
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default SavePaper;
