import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { useRecoilState, useRecoilValue } from "recoil";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { ButtonGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useRef } from "react";
import { question, MCQoptions, matchPairs, multilingual } from "../../atoms";
import { CSVLink, CSVDownload } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
import ReactFileReader from "react-file-reader";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileUpload from "react-material-file-upload";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const EnterQuestion = ({ qType, bulkUploadSubmit, file, setFile }) => {
  const [ques, setQues] = useRecoilState(question);
  const [mcqs, setMcqs] = useRecoilState(MCQoptions);
  const tagz = mcqs.map((m) => m.option);
  const [tags, setTags] = useState([...tagz.splice(1)]);
  const [matchFields, setMatchFields] = useRecoilState(matchPairs);
  const multi = useRecoilValue(multilingual);
  const csvData = [
    [
      "type",
      "marks",
      "difficulty",
      "keywords",
      "title",
      "option1",
      "correct1",
      "option2",
      "correct2",
      "option3",
      "correct3",
      " option4",
      "correct4",
    ],
    [
      "a",
      "1",
      "easy",
      "trignometry; angles; triangles",
      "sum of angles of a triangle",
      "90",
      "0",
      "180",
      "1",
      "360",
      "0",
    ],
    ["b", "2", "medium", "mental math; addition", "1+1=?", "2"],
    ["c", "5", "hard", "algebra; BODMAS", "7-3=?", "4"],
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [value, setValue] = React.useState(0);
  const [mathInput, setMathInput] = React.useState("");
  const ref = useRef();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleFiles = (files) => {
    console.log(files);
  };

  const addMatchField = () => {
    setMatchFields([
      ...matchFields,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeMatchFields = (index) => {
    const rows = [...matchFields];
    rows.splice(index, 1);
    setMatchFields(rows);
  };

  const handleMatchChange = (index, evnt) => {
    const { name, value } = evnt.target;
    let list = [...JSON.parse(JSON.stringify(matchFields))];
    list[index][name] = value;
    console.log(list);
    setMatchFields(list);
  };

  const handleQuesChange = (e) => {
    console.log(ques.title);
    setQues((ques) => ({
      ...ques,
      title: e.target.value,
    }));
  };

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

  const handleCorrectMCQChange = (e) => {
    setMcqs((m) => {
      let newM = [...JSON.parse(JSON.stringify(m))];
      newM[0].option = e.target.value;
      console.log(newM);
      return newM;
    });
  };

  const handleWrongMCQChange = (newTags) => {
    console.log(newTags);
    const newWrongMcq = newTags.map((m) => ({
      option: m,
      correct: false,
    }));
    console.log(newWrongMcq);
    setMcqs((m) => {
      let newM = [];
      newM[0] = JSON.parse(JSON.stringify(m[0]));
      newM = newM.concat(newWrongMcq);
      console.log(newM);
      return newM;
    });
    setTags(newTags);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setQues((ques) => ({
      ...ques,
      title: transcript,
    }));
  };

  const resetCustomTranscript = () => {
    resetTranscript();
    setQues((ques) => ({
      ...ques,
      title: "",
    }));
  };

  const handleTabChange = (event, newValue) => setValue(newValue);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  setTimeout(() => {
    const mf = document.getElementById("formula");
    mf.addEventListener("input", (ev) => {
      console.log(JSON.stringify(ev.target.value));
      localStorage.setItem("mathInput", ev.target.value);
    });
  }, 0);

  //   const handleMathChange = (e) => {
  //     console.log(ques.title);
  //     // setQues((ques) => ({
  //     //   ...ques,
  //     //   title: mathInput,
  //     // }));
  //   };

  console.log(ref);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {multi.enterQuestion}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <<<<<<< Updated upstream
          <TextField
            required
            id="title"
            name="title"
            label={multi.question}
            fullWidth
            variant="standard"
            value={ques.title}
            onChange={handleQuesChange}
          />
          <Box sx={{ m: 2 }}>
            <p>Microphone: {listening ? "ON" : "OFF"}</p>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={SpeechRecognition.startListening}>Start</Button>
              <Button onClick={stopListening}>Stop</Button>
              <Button onClick={resetCustomTranscript}>Reset</Button>
            </ButtonGroup>
          </Box>
======= */}
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Math input" {...a11yProps(0)} />
            <Tab label="Speech to text" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, .3)",
                borderRadius: "5px",
              }}
            >
              <math-field
                id="formula"
                virtual-keyboard-mode="manual"
              ></math-field>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              ref={ref}
              required
              id="title"
              name="title"
              label={multi.question}
              fullWidth
              variant="standard"
              value={ques.title}
              disabled={mathInput.length !== 0}
              onChange={handleQuesChange}
            />
            <div>
              <p>Microphone: {listening ? "ON" : "OFF"}</p>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button onClick={SpeechRecognition.startListening}>
                  Start
                </Button>
                <Button onClick={stopListening}>Stop</Button>
                <Button onClick={resetCustomTranscript}>Reset</Button>
              </ButtonGroup>
            </div>
          </TabPanel>
          {/* >>>>>>> Stashed changes */}
        </Grid>
        <Grid item xs={12}>
          {qType === "a" ? (
            <>
              <TextField
                required
                id="corr-option"
                name="corr-option"
                label={multi.correctOption}
                value={mcqs[0].option}
                fullWidth
                variant="standard"
                onChange={handleCorrectMCQChange}
              />
              <Box sx={{ mt: 4 }}>
                <ReactTagInput
                  tags={tags}
                  onChange={(newTags) => handleWrongMCQChange(newTags)}
                  placeholder={multi.wrongOption}
                />
              </Box>
            </>
          ) : qType === "c" || qType === "b" ? (
            <TextField
              required
              id="Answer"
              name="Answer"
              label={multi.answer}
              fullWidth
              variant="standard"
              value={ques.options[0].option}
              onChange={handleTextAnsChange}
            />
          ) : (
            <div className="container">
              {matchFields.map((data, index) => {
                const { key, value } = data;
                return (
                  <Box key={index} sx={{ mt: 2 }}>
                    <div className="col">
                      <div className="form-group">
                        {/* <input type="text"  /> */}
                        <TextField
                          label={multi.key}
                          id="outlined-size-small"
                          defaultValue="Small"
                          size="small"
                          onChange={(evnt) => handleMatchChange(index, evnt)}
                          value={key}
                          name="key"
                          className="form-control"
                          placeholder={multi.key}
                          sx={{ mt: 1 }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        {/* <input type="text" onChange={(evnt) => handleMatchChange(index, evnt)} value={value} name="value" className="form-control" placeholder="value" /> */}
                        <TextField
                          label={multi.value}
                          id="outlined-size-small"
                          defaultValue="Small"
                          size="small"
                          className="form-control"
                          onChange={(evnt) => handleMatchChange(index, evnt)}
                          value={value}
                          name="value"
                          placeholder={multi.value}
                          sx={{ mt: 1 }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      {matchFields.length !== 1 ? (
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={removeMatchFields}
                        >
                          {multi.remove}
                        </Button>
                      ) : (
                        // <button className="btn btn-outline-danger" onClick={removeMatchFields}>Remove</button> :
                        ""
                      )}
                    </div>
                  </Box>
                );
              })}
              <div className="row">
                <div className="col-sm-12">
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{ mt: 3 }}
                    onClick={addMatchField}
                  >
                    {multi.addNew}
                  </Button>
                  {/* <button className="btn btn-outline-success" onClick={addMatchField}>Add New</button> */}
                </div>
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Bulk Upload Questions</Typography>
          {/* <Box textAlign="center" marginY={2}>
            <CSVLink
              style={{ textDecoration: "none", color: "black" }}
              data={csvData}
              filename={"Example Questions.csv"}
            >
              <DownloadIcon
                style={{ position: "relative", top: "8px" }}
              ></DownloadIcon>
              Download Sample
            </CSVLink>
          </Box> */}
          <FileUpload
            required
            value={file}
            onChange={setFile}
            buttonText="Upload CSV File"
            title="Upload/Drag and Drop Valid CSV File"
          />
          <Box textAlign="center" marginY={2}>
            <Button variant="outlined" onClick={bulkUploadSubmit}>
              Submit file
            </Button>
          </Box>
          {/* <ReactFileReader
            fileTypes={[".csv", ".xls"]}
            base64={true}
            multipleFiles={false}
            handleFiles={handleFiles}
          >
            <Box textAlign="center">
              <Button variant="outlined">
                <UploadFileIcon></UploadFileIcon>Upload
              </Button>
            </Box>
          </ReactFileReader> */}
        </Grid>
      </Grid>
    </>
  );
};

export default EnterQuestion;
