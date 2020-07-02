import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="pt-4 pt-md-2 border-top">
        <div className="row justify-content-around">
          <div className="col-md col-12">
            <img
              alt="logo rifandani"
              height="48"
              width="48"
              src="/background.svg"
              className="mb-2"
            />
            <small className="d-block mb-3 text-muted">Rifandani</small>
          </div>
          <div className="col-md col-6">
            <h5>Links</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a href="/" className="text-muted">
                  Test
                </a>
              </li>
              <li>
                <a href="/" className="text-muted">
                  Test2
                </a>
              </li>
              <li>
                <a href="/" className="text-muted">
                  Test3
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md col-6">
            <h5>Links</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a href="/" className="text-muted">
                  Test
                </a>
              </li>
              <li>
                <a href="/" className="text-muted">
                  Test2
                </a>
              </li>
              <li>
                <a href="/" className="text-muted">
                  Test3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
