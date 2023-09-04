import React, { useEffect, useState } from 'react';
import Clock from './Clock';

const Quiz = ({ showQuiz, question, quizs, checkAnswer, correctAnswer, selectedAnswer, questionIndex, nextQuestion, showTheResult, setQuestionIndex , setresultData}) => {

    const [quizOptions, setQuizOptions] = useState([])
    useEffect(() => {
        if (question?.incorrect_answers?.length) {
            let quizValues = question?.incorrect_answers
            quizValues.push(question?.correct_answer)
            quizValues = shuffle(quizValues)
            setQuizOptions(quizValues)
        }
    }, [question])

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <section className="bg-dark text-white" style={{ display: `${showQuiz ? 'block' : 'none'}` }}>
            <Clock/>
            <ul class="list-group list-group-horizontal bg-dark pt-4 d-flex justify-content-center">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) =>
                        <li class="list-group-item bg-dark text-light" onClick={() => setQuestionIndex(i - 1)} >{i}</li>
                    )}
            </ul>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            <div className="d-flex justify-content-between gap-md-3">
                                <h5 className='mb-2 fs-normal lh-base'>{question?.question}</h5>
                                <h5 style={{ color: '#60d600', width: '100px', textAlign: 'right' }}>{quizs.indexOf(question) + 1} / {quizs?.length}</h5>
                            </div>
                            <div>
                                {
                                    quizOptions?.length && quizOptions.map((item, index) => <button
                                        key={index}
                                        className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${correctAnswer === item && 'bg-success'}`}
                                        onClick={(event) => checkAnswer(event, item)}
                                    >
                                        {item}
                                    </button>)
                                }
                            </div>

                            {
                                (questionIndex + 1) !== quizs.length ?
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={nextQuestion} disabled={!selectedAnswer}>Next Question</button>
                                    :
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={showTheResult} disabled={!selectedAnswer}>Show Result</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;