import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const urltemp =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); // cheackBox user
  const [loading, setLoading] = useState(false); // loading api
  const [questions, setQuestions] = useState([]); // empty arr
  const [index, setIndex] = useState(0); // start index of array
  const [error, setError] = useState(false); // if we have error apis
  const [correct, setcorrect] = useState(0); // how much user answer corrrect
  const [isModalOpen, setIsModalOpen] = useState(false); // ModalOpen || not
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setWaiting(false);
    setLoading(true);
    try {
      const res = await axios(url);
      const data = res.data;
      if (data.response_code === 1) throw new Error("Sorry");

      if (data.results.length > 0) {
        setQuestions(data.results);
        setWaiting(false);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      console.error(error);
      setWaiting(true);
      setError(true);
    }
  };

  const nextQuestions = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;

      // questions 9
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else return index;
    });
  };

  const cheackAnswer = (value) => {
    if (value) {
      setcorrect((oldState) => oldState + 1);
    }
    nextQuestions();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setIsModalOpen(false);
    setcorrect(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz; // object destructure

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // we use [name] beacuse if we dont use [name] The variable will not select
    setQuiz({ ...quiz, [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        error,
        correct,
        isModalOpen,
        nextQuestions,
        cheackAnswer,
        closeModal,
        quiz,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
