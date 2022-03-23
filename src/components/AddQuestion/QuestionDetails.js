import { difficulty, questionTypes } from "../../utils";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ReactTagInput from "@pathofdev/react-tag-input";

const QuestionDetails = ({ questionDetails, setQuestionDetails }) => {
  const [kwords, setKwords] = useState([]);

  const handleChange = (e) => {
    setQuestionDetails((ques) => ({
      ...ques,
      [e.target.name]:
        typeof e.target.value === "string"
          ? e.target.value.trim()
          : e.target.value,
    }));
    console.log(questionDetails);
  };

  useEffect(() => {
    setQuestionDetails((ques) => ({
      ...ques,
      keywords: kwords,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kwords]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Question Details{console.log(kwords)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="board"
            name="board"
            label="Board"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={questionDetails.board}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="class"
            name="class"
            label="Class"
            fullWidth
            type="number"
            variant="standard"
            onChange={handleChange}
            value={questionDetails.class}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormControl variant="outlined" fullWidth> */}
          <InputLabel id="select-label">Question Type</InputLabel>
          <Select
            name="type"
            labelId="select-label"
            id="select"
            value={questionDetails.type}
            label="Question Type"
            required
            onChange={handleChange}
          >
            {Object.entries(questionTypes).map((type) => (
              <MenuItem key={type[0]} value={type[1]}>
                {type[0]}
              </MenuItem>
            ))}
          </Select>
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={12}>
          {/* <FormControl variant="outlined" fullWidth> */}
          <Box sx={{ w: "" }}>
            <InputLabel id="select-labell">Difficulty</InputLabel>
            <Select
              name="difficulty"
              labelId="select-labell"
              id="selectt"
              value={questionDetails.difficulty}
              label="Difficulty"
              required
              onChange={handleChange}
            >
              {Object.entries(difficulty).map((type) => (
                <MenuItem key={type[0]} value={type[1]}>
                  {type[0]}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="marks"
            name="marks"
            label="Marks"
            fullWidth
            type="number"
            variant="standard"
            onChange={handleChange}
            value={questionDetails.marks}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={questionDetails.subject}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <ReactTagInput
              tags={kwords}
              onChange={(newWords) => setKwords(newWords)}
              removeOnBackspace
              placeholder="Type keywords and press enter"
              id="Topic/Keywords"
              name="keywords"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionDetails;
