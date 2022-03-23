import React from "react";
import { useRecoilValue } from "recoil";
import { question } from "../../atoms";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const ReviewQuestion = () => {
  const ques = useRecoilValue(question);

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
      <Grid item xs={12}>
        <TextField
          required
          id="title"
          name="title"
          label="Question"
          fullWidth
          variant="outlined"
          value={ques.options[0].option}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default ReviewQuestion;
