import React from 'react';

const Loader = () => {
    return(
        <section className='text-white text-center bg-dark'>
          <div className="container">
              <div className="row vh-100 align-items-center justify-content-center">
                  <div className="col-lg-8">
                      <h1 className='fw-bold mb-4'>Loading.....</h1>
                  </div>
              </div>
          </div>
        </section>
    )
}

export default Loader;