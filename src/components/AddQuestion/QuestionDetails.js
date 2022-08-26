import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { multilingual } from "../../atoms";
import { multilingualSupport } from "../../utils";
import ReactTagInput from "@pathofdev/react-tag-input";

//MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const QuestionDetails = ({
  questionDetails,
  setQuestionDetails,
  kwords,
  setKwords,
}) => {
  const multi = useRecoilValue(multilingual);

  const difficulty = {
    [multi.easy]: "a",
    [multi.medium]: "b",
    [multi.hard]: "c",
  };

  const questionTypes = {
    [multi.mcq]: "a",
    [multi.oneWord]: "b",
    [multi.fillInTheBlanks]: "c",
    [multi.matchTheFollowing]: "d",
  };

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
        {multi.questionDetails}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="board"
            name="board"
            label={multi.board}
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={questionDetails.board}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="grade"
            name="grade"
            label={multi.grade}
            fullWidth
            type="number"
            variant="standard"
            onChange={handleChange}
            value={questionDetails.grade}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-label">{multi.questionType}</InputLabel>
            <Select
              name="type"
              labelId="select-label"
              id="select"
              value={questionDetails.type}
              label={multi.questionType}
              required
              onChange={handleChange}
            >
              {Object.entries(questionTypes).map((type) => (
                <MenuItem key={type[0]} value={type[1]}>
                  {type[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-labelll">{multi.langMedium}</InputLabel>
            <Select
              name="medium"
              labelId="select-labelll"
              id="selecttt"
              value={questionDetails.medium}
              label={multi.langMedium}
              required
              onChange={handleChange}
            >
              {Object.keys(multilingualSupport).map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-labell">{multi.difficulty}</InputLabel>
            <Select
              name="difficulty"
              labelId="select-labell"
              id="selectt"
              value={questionDetails.difficulty}
              label={multi.difficulty}
              required
              onChange={handleChange}
            >
              {Object.entries(difficulty).map((type) => (
                <MenuItem key={type[0]} value={type[1]}>
                  {type[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="marks"
            name="marks"
            label={multi.marks}
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
            label={multi.subject}
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={questionDetails.subject}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <ReactTagInput
              tags={questionDetails.keywords}
              onChange={(newWords) => setKwords(newWords)}
              removeOnBackspace
              placeholder={multi.typeKeywordsAndPressEnter}
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
