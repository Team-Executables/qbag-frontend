import { selectedQues, multilingual } from "../../atoms";
import { useRecoilValue } from "recoil";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  RadioGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Match from "./Match";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { useState } from "react";

const ReviewQuestions = () => {
  const selectedQs = useRecoilValue(selectedQues);
  const multi = useRecoilValue(multilingual);
  const [questions, setQuestions] = useState([]);

  const difficulty = {
    [multi.easy]: "a",
    [multi.medium]: "b",
    [multi.hard]: "c",
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  useEffect(() => {
    const promises = selectedQs.map((ele) =>
      axiosInstance.get(`questions/${ele}`)
    );
    Promise.all(promises).then((d) => {
      const qData = d.map((ele) => ele.data);
      console.log(qData);
      setQuestions(qData);
    });
  }, []);

  return (
    <>
      {questions && questions.length > 0
        ? questions.map((q, key) => (
            <Paper elevation={3} style={{ backgroundColor: "#e8f5e9" }}>
              <Box p={2} mt={3}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" sx={{ m: 0, p: 0 }}>
                      {"Question " + (key + 1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ mr: 2, mt: 0, mb: 1 }}>
                      {q.question_data.marks}{" "}
                      {q.question_data.marks > 1 ? <>marks</> : <>mark</>}{" "}
                      &nbsp;
                      {getKeyByValue(difficulty, q.question_data.difficulty)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6">{q.question_data.title}</Typography>
                {q.question_data.type === "d" && <Match data={q.match_data} />}
                {(q.question_data.type === "b" ||
                  q.question_data.type === "c") && (
                  <Typography variant="h6">
                    <b>Ans</b>: {q.option_data[0].option}
                  </Typography>
                )}
                {q.question_data.type === "a" && (
                  <FormControl component="fieldset">
                    <RadioGroup value={q.option_data[0].option}>
                      {q.option_data.map((l) => (
                        <FormControlLabel
                          value={l.option}
                          control={<Radio />}
                          label={l.option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            </Paper>
          ))
        : null}
    </>
  );
};

export default ReviewQuestions;
