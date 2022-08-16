import Match from "./Match";
import { useRecoilValue } from "recoil";
import { multilingual } from "../../atoms";
import axiosInstance from "../../axios";

import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  RadioGroup,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Question = ({ q, qkey }) => {
  const multi = useRecoilValue(multilingual);
  const [upvotes, setUpVotes] = useState(q.upvote);
  const [downvotes, setDownVotes] = useState(q.downvote);

  const difficulty = {
    [multi.easy]: "a",
    [multi.medium]: "b",
    [multi.hard]: "c",
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function handleVote(str, id) {
    if (str === "up") {
      axiosInstance
        .post(`questions/vote`, {
          question: id,
          vote: 1,
        })
        .then((res) => {
          setUpVotes((d) => d + 1);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => window.location.reload())
    } else {
      axiosInstance
        .post(`questions/vote`, {
          question: id,
          vote: 0,
        })
        .then((res) => {
          setDownVotes((d) => d + 1);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => window.location.reload())
    }
  }

  return (
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
              {multi.question + " " + (qkey + 1)}
            </Typography>
            <Box sx={{ display: "flex" }} displayPrint="none">
              <Box sx={{ mr: 1, mt: 1 }}>
                <IconButton color="primary">
                  {q.question_data.setbyTeacher ? <VerifiedIcon /> : ""}
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  aria-label="upvote"
                  component="span"
                  onClick={() => handleVote("up", q.id)}
                >
                  <ThumbUpIcon />
                  &nbsp;<span>{upvotes}</span>
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  aria-label="downvote"
                  component="span"
                  onClick={() => handleVote("down", q.id)}
                >
                  <ThumbDownIcon />
                  &nbsp;<span>{downvotes}</span>
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" sx={{ mr: 2, mt: 0, mb: 1 }}>
              {q.question_data.marks}{" "}
              {q.question_data.marks > 1 ? (
                <>{multi.marks}</>
              ) : (
                <>{multi.mark}</>
              )}{" "}
              &nbsp;
              {getKeyByValue(difficulty, q.question_data.difficulty)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6">{q.question_data.title}</Typography>
        {q.question_data.type === "d" && <Match data={q.match_data} />}
        {(q.question_data.type === "b" || q.question_data.type === "c") && (
          <Typography variant="h6">
            <b>{multi.answer}</b>: {q.option_data[0].option}
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
                  key={l.option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
    </Paper>
  );
};

export default Question;
