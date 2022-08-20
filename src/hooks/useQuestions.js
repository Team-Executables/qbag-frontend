import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedQues } from "../atoms";
import axiosInstance from "../axios";

const useQuestions = () => {
  const selectedQs = useRecoilValue(selectedQues);
  const [questions, setQuestions] = useState([]);

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

  return questions;
};

export default useQuestions;
