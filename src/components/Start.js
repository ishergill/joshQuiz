import React, { useState } from 'react';

const Start = ({ startQuiz, showStart }) => {
    const [userId , setuserId] = useState('');
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8 d-flex flex-column ">
                        <h1 className='fw-bold mb-4 '>Josh Talks Quiz</h1>
                        <input className='mb-3 h-1' style={{height: '40px'}} value={userId} type='email' placeholder='Email' onChange={(e)=>setuserId(e.target.value)}/>
                        <button onClick={userId.length > 0 ? startQuiz : console.log('provide valid input to email')} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;