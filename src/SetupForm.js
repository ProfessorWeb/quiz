import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleSubmit, handleChange, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>
          {/* Amount */}
          <div className="form-control">
            <label htmlFor="amount">Number Of Questions</label>
            <input
              type="number"
              className="form-input"
              name="amount"
              id="amount"
              min={1}
              max={50}
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>

          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button className="submit-btn" onClick={handleSubmit}>
            submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
