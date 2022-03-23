import { difficulty, questionTypes } from "../../utils";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useState } from "react";

const EnterQuestion = ({ qType, question, setQuestion }) => {
  const [MCQoptions, setMCQOptions] = useState([]);

  const handleMCQChange = (e) => {
    setQuestion({
      title: e.target.value.trim(),
      options: {},
    });
  };

  // const handleChange =

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Enter Question
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="question"
            name="title"
            label="Question"
            fullWidth
            variant="standard"
            value={question.title}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {qType === "a" ? (
            <>
              <TextField
                required
                id="corr-option"
                name="corr-option"
                label="Correct Option"
                fullWidth
                variant="standard"
                onChange={handleMCQChange}
              />
              <Box sx={{ mt: 4 }}>
                <ReactTagInput
                  tags={MCQoptions}
                  onChange={(newTags) => setMCQOptions(newTags)}
                  placeholder="Type wrong options and press enter"
                />
              </Box>
            </>
          ) : qType === "c" || qType === "b" ? (
            <TextField
              required
              id="Answer"
              name="Answer"
              label="Answer"
              fullWidth
              variant="standard"
              // onChange={handleChange}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default EnterQuestion;
