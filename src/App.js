import React, { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from "axios";
import Loader from './components/Loader';
function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [question, setQuestion] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showLoader, setShowLoader] = useState(false)
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    const baseURL= "https://opentdb.com/api.php?amount=15"
    setShowLoader(true)
    axios.get(baseURL).then((response) => {
      setShowStart(true);
      setQuizData(response.data.results);
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setShowLoader(false);
    })
  },[]);

  useEffect(() => {
    if (quizData?.length > questionIndex) {
      const question = quizData[questionIndex]
      setQuestion(question);
    }
  }, [quizData, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }


  // Check Answer
  const checkAnswer = (event, selected) => {
    if (selected) {
      const correctAnswer = question.correct_answer
      setCorrectAnswer(correctAnswer);
      setSelectedAnswer(selected);

      if (selected === correctAnswer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  return (
    <>
      {
        showLoader ? 
        <Loader /> :
        <>
          {/* Welcome Page */}
          <Start
            startQuiz={startQuiz}
            showStart={showStart}
          />

          {/* Quiz Page */}
          {
            <Quiz
              showQuiz={showQuiz}
              question={question}
              quizs={quizData}
              checkAnswer={checkAnswer}
              correctAnswer={correctAnswer}
              selectedAnswer={selectedAnswer}
              questionIndex={questionIndex}
              nextQuestion={nextQuestion}
              showTheResult={showTheResult}
              setQuestionIndex={setQuestionIndex}
            />
          }

          {/* Result Page */}
          <Result
            showResult={showResult}
            quizs={quizData}
            marks={marks}
            startOver={startOver} 
          />
        </>
    
      }
    </>
  );
}

export default App;
