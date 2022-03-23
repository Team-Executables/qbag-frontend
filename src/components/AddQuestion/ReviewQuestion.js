import React from "react";
import { useRecoilValue } from "recoil";
import { question, MCQoptions } from "../../atoms";
import ReactTagInput from "@pathofdev/react-tag-input";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ReviewQuestion = ({ qType }) => {
  const ques = useRecoilValue(question);
  const mcqs = useRecoilValue(MCQoptions);
  const tagz = mcqs.map((m) => m.option);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="title"
          name="title"
          label="Question"
          fullWidth
          variant="outlined"
          value={ques.title}
          disabled
        />
      </Grid>
      {qType === "a" ? (
        <Grid item xs={12}>
          <TextField
            required
            id="corr-option"
            name="corr-option"
            label="Correct Option"
            value={tagz[0]}
            fullWidth
            variant="standard"
            disabled
          />
          <Box sx={{ mt: 4 }}>
            <div>Wrong Options</div>
            <ReactTagInput
              tags={tagz.splice(1)}
              placeholder="Type wrong options and press enter"
              readOnly
            />
          </Box>
        </Grid>
      ) : qType === "c" || qType === "b" ? (
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Answer"
            fullWidth
            variant="outlined"
            value={ques.options[0].option}
            disabled
          />
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default ReviewQuestion;
