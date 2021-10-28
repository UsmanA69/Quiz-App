import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Questions from "./questions";
import ButtonAppBar from "./navbar";

export default function Quizapp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const resetQuiz = () => {
    setShowScore(!showScore);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <>
      <ButtonAppBar />
      <Grid sx={{ margin: "10%" }}>
        {showScore ? (
          <>
            <div style={{textAlign:'right',height:'50vh'}}>
              <div className="score-section">
                You scored {score} out of {Questions.length}
              </div>
              <Button
                variant="outlined"
                sx={{ position:'relative',top:'90%',right:'0'}}
                onClick={resetQuiz}
              >
                Reset
              </Button>
            </div>
          </>
        ) : (
          <Grid container maxWidth="xl" className="main-container">
            <Grid item xs="12" sm="5" sx={{ margin: "5px" }}>
              <Grid container>
                <Grid item xs="12">
                  <span>
                    <h4>Question {currentQuestion + 1}</h4>
                  </span>
                  /{Questions.length}
                </Grid>
                <Grid item xs="12">
                  <Typography variant="h5">
                    {Questions[currentQuestion].questionText}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs="12" sm="5"
              sx={{ margin: "5px", paddingTop: "35px !important" }}
            >
              {Questions[currentQuestion].answerOptions.map((answerOptions) => (
                <Button
                  className='options'
                  variant="contained"
                  onClick={() => handleButtonClick(answerOptions.isCorrect)}
                  sx={{ margin: "5px" }}
                >
                  {answerOptions.answerText}
                </Button>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
