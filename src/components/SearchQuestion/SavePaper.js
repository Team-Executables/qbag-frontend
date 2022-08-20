import useQuestions from "../../hooks/useQuestions";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { multilingual, selectedQues } from "../../atoms";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../../axios";

const SavePaper = () => {
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

  const selectedQs = useRecoilValue(selectedQues);
  const questions = useQuestions();
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [vulnerable, setVulnerable] = useState(false);
  const multi = useRecoilValue(multilingual);

  const handleChange = (e) => setName(e.target.value.trim());

  const handleSubmit = () => {
    axiosInstance
      .post("questions/create-paper", { name, questions: selectedQs })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
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

        if (!q.question_data.setbyTeacher && q.total_votes < 200) {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          {/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}
          <Box>
            <TextField
              variant="outlined"
              required
              id="Name"
              label={multi.paperName}
              name="name"
              onChange={handleChange}
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
          {vulnerable && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Typography display="block" fontSize={14} variant="overline">
                {multi.vettedWarning}
              </Typography>
              <ol>
                {questions.map((qs) => {
                  if (!qs.question_data.setbyTeacher && qs.total_votes < 200) {
                    return (
                      <Typography
                        display="block"
                        fontSize={14}
                        variant="overline"
                      >
                        <li>{qs.question_data.title}</li>
                      </Typography>
                    );
                  }
                })}
              </ol>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.easyQuestions}: ${data.easy}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.mediumQuestions}: ${data.medium}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.hardQuestions}: ${data.hard}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.mcqs}: ${data.mcq}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.oneWords}: ${data.oneWord}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.fillInTheBlankss}: ${data.fillInTheBlanks}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.matchTheFollowings}: ${data.match}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.totalQuestions}: ${data.totalQues}`}</Typography>
            <Typography
              display="block"
              fontSize={14}
              variant="overline"
            >{`${multi.totalMarks}: ${data.marks}`}</Typography>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default SavePaper;
