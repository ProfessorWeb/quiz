import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    loading,
    questions,
    index,
    nextQuestions,
    waiting,
    correct,
    cheackAnswer,
  } = useGlobalContext();

  if (waiting) return <SetupForm />;
  if (loading) return <Loading />;

  const { incorrect_answers, correct_answer, question } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]; // spread because we need map loop this is array to show the answers to the user

  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) answers.push(correct_answer);
  else {
    // We take the result that came out of the array.Then we put it at the end of the array.
    answers.push(answers[tempIndex]);

    /* 
    We take the result from the array.
    and replace it with correct_answer.

    Look at the first logic.
    We took the result that came out of the array, and then moved it to the end.
    Now we want to take the correct_answer instead of the same result that was before.
    */
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct Answers {correct} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }} // we dont use {answer} beacuse we have already object {{ __html: answer }}
                  onClick={() => cheackAnswer(answer === correct_answer)}
                />
              );
            })}
          </div>
          <button className="next-question" onClick={nextQuestions}>
            next question
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
