import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userData, resQues, multilingual } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Question from "./Question";

// MUI
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  RadioGroup,
  IconButton,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../axios";

const ListQuestions = () => {
  const navigate = useNavigate();
  const uData = useRecoilValue(userData);
  // const questions = useRecoilValue(resQues);
  const multi = useRecoilValue(multilingual);

  const difficulty = {
    [multi.easy]: "a",
    [multi.medium]: "b",
    [multi.hard]: "c",
  };

  const [questions, setQuestions] = useRecoilState(resQues);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  useEffect(() => {
    if (uData.user_type === "other") {
      navigate("/dashboard/question/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Questions
    let total_marks = 0;
    for (let question of questions) {
      total_marks = total_marks + question.question_data.marks;
    }

    let x = 20;
    pdf.setFontSize(16);
    pdf.setFont("times", "bold");
    pdf.text(
      20,
      x,
      `${questions[0].question_data.board} Class ${questions[0].question_data.grade} ${questions[0].question_data.subject} Question Paper`
    );
    pdf.setFont("times", "normal");

    pdf.setFontSize(12);
    x = x + 20;
    pdf.setFont("times", "bolditalic");
    pdf.text(20, x, "Number of Questions: " + questions.length);
    x = x + 8;
    pdf.text(20, x, "Total Marks: " + total_marks);
    pdf.setFont("times", "normal");

    // const loremipsum = "Total Marks Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,s from a line in section 1.10.32."
    // let lines = pdf.splitTextToSize(loremipsum, 180)
    // pdf.text(20, x, lines)
    // x = x + lines.length * 4

    let q_num = 0;

    for (let question of questions) {
      var pageHeight1 = pdf.internal.pageSize.height;
      if (x > pageHeight1 - 50) {
        x = 0;
        pdf.addPage();
      }
      x = x + 20;
      q_num++;
      let question_text = `Q${q_num}) ${question.question_data.title}   (${question.question_data.marks}marks)`;
      let lines = pdf.splitTextToSize(question_text, 180);
      pdf.text(20, x, lines);
      x = x + lines.length * 4;

      if (question.question_data.type === "a") {
        for (let option of question.option_data) {
          x = x + 8;
          pdf.text(30, x, "\u2022 " + option.option);
        }
      } else if (question.question_data.type === "d") {
        x = x + 8;
        let flag = false;
        pdf.text(30, x, "ColumnA");
        pdf.text(130, x, "ColumnB");
        for (let match of question.match_data) {
          let match_key = pdf.splitTextToSize(match.key, 80);
          let match_value = pdf.splitTextToSize(match.value, 80);
          if (Math.max(match_key.length, match_value.length) > 1) {
            flag = true;
          }
          x = x + Math.max(match_key.length, match_value.length) * 4 + 4;
          pdf.text(30, x, match_key);
          pdf.text(130, x, match_value);
        }
        if (flag) {
          x = x + 20;
        }
      }
    }

    // Answers
    pdf.addPage();
    x = 20;

    pdf.setFontSize(16);
    pdf.setFont("times", "bold");
    pdf.text(20, x, `Answers`);

    pdf.setFont("times", "normal");
    pdf.setFontSize(12);

    q_num = 0;
    for (let question of questions) {
      if (x > pageHeight1 - 50) {
        x = 0;
        pdf.addPage();
      }
      x = x + 15;
      q_num++;
      pdf.setFont("times", "bold");
      pdf.text(20, x, `Answer ${q_num}: `);
      pdf.setFont("times", "normal");
      if (question.question_data.type === "d") {
        x = x + 8;
        let flag = false;
        pdf.text(20, x, "ColumnA");
        pdf.text(120, x, "ColumnB");
        for (let match of question.match_data) {
          let match_key = pdf.splitTextToSize(match.key, 80);
          let match_value = pdf.splitTextToSize(match.value, 80);
          if (Math.max(match_key.length, match_value.length) > 1) {
            flag = true;
          }
          x = x + Math.max(match_key.length, match_value.length) * 4 + 4;
          pdf.text(20, x, match_key);
          pdf.text(120, x, match_value);
        }
        if (flag) {
          x = x + 20;
        }
      } else {
        x = x + 8;
        for (let option of question.option_data) {
          if (option.correct === true) {
            pdf.text(20, x, option.option);
          }
        }
      }
    }

    pdf.save(
      `${questions[0].question_data.board} Class ${questions[0].question_data.grade} ${questions[0].question_data.subject} Question Paper.pdf`
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* <pre>{JSON.stringify(questions, null, 4)}</pre> */}
        <Box sx={{ mt: 3, mb: 3 }}>
          {questions && questions.length > 0 && (
            <Typography variant="h5">{`${multi.board}: ${questions[0].question_data.board}`}</Typography>
          )}
          {questions && questions.length > 0 && (
            <Typography variant="h5">{`${multi.grade}: ${questions[0].question_data.grade}`}</Typography>
          )}
          {questions && questions.length > 0 && (
            <Typography variant="h5">
              {`${multi.subject}: ${questions[0].question_data.subject}`}
            </Typography>
          )}
          {questions && questions.length > 0 && (
            <Typography variant="h5">{`${multi.numQuestions}: ${questions.length}`}</Typography>
          )}
        </Box>
        <Box displayPrint="none">
          <Button variant="contained" onClick={() => window.print()}>
            {multi.exportPDF}
          </Button>
        </Box>
        <Box displayPrint="none">
          <Button variant="contained" onClick={generatePDF}>
            Generate Question Paper
          </Button>
        </Box>
      </Box>
      <Divider />
      {questions && questions.length > 0 ? (
        questions.map((q, key) => <Question q={q} qkey={key} />)
      ) : (
        <p>No questions for this category :(</p>
      )}
    </Box>
  );
};

export default ListQuestions;
