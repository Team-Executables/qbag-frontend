import { difficulty, questionTypes } from "../../utils";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { useRecoilState } from "recoil";
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
import { question } from "../../atoms";

const EnterQuestion = ({ qType }) => {
  const [ques, setQues] = useRecoilState(question);

  const handleQuesChange = (e) => {
    console.log(ques.title);
    setQues((ques) => ({
      ...ques,
      title: e.target.value,
    }));
  };

  // const handleCorrectMCQChange = (e) => {
  //   setQues((ques) => ({
  //     // console.log(ques.options);
  //     // const opts = ques.options.map((o) => {
  //     //   let newO = {};
  //     //   if (o.correct) {
  //     //     newO.option = e.target.value;
  //     //     newO.correct = o.correct;
  //     //     return newO;
  //     //   }
  //     //   return o;
  //     // });

  //     ...ques,
  //     option: e.target.value,
  //   }));
  // };

  // const handleWrongMCQChange = (e) => {
  //   setQues((ques) => {
  //     console.log(ques.options);
  //     const opts = ques.options.map((o) => {
  //       let newO = {};
  //       if (o.correct) {
  //         newO.option = e.target.value;
  //         newO.correct = o.correct;
  //         return newO;
  //       }
  //       return o;
  //     });

  //     const newQues = {
  //       title: ques.title,
  //       options: opts,
  //     };

  //     return newQues;
  //   });
  // };
  // console.log(question);

  const handleTextAnsChange = (e) => {
    setQues((q) => ({
      ...q,
      options: [
        {
          option: e.target.value,
          correct: true,
        },
      ],
    }));
    console.log(ques.options);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Enter Question
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Question"
            fullWidth
            variant="standard"
            value={ques.title}
            onChange={handleQuesChange}
          />
        </Grid>
        <Grid item xs={12}>
          {qType === "a" ? (
            <>
              {/* <TextField
                required
                id="corr-option"
                name="corr-option"
                label="Correct Option"
                value={ques.option}
                fullWidth
                variant="standard"
                onChange={handleCorrectMCQChange}
              />
              <Box sx={{ mt: 4 }}>
                <ReactTagInput
                  tags={ques.wrongOptions}
                  onChange={(newTags) =>
                    setQues((q) => ({ ...q, wrongOptions: newTags }))
                  }
                  placeholder="Type wrong options and press enter"
                />
              </Box> */}
            </>
          ) : qType === "c" || qType === "b" ? (
            <TextField
              required
              id="Answer"
              name="Answer"
              label="Answer"
              fullWidth
              variant="standard"
              value={ques.options[0].option}
              onChange={handleTextAnsChange}
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
