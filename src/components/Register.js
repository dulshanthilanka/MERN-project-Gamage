import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cpassword, setCpassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
      e.preventDefault();
      if (password !== cpassword) {
          console.log("Passwords do not match");
          return;
      }
      axios.post('http://localhost:3001/register', { email, password})
          .then(result => {console.log(result)
          navigate('/')
          })
          .catch(err => console.log(err));
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>REGISTER</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <style>
          {`
            .form-group {
              margin-bottom: 1.5rem; /* Added margin */
            }
            .container {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </Helmet>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputConfirmPassword4">Confirm Password</label>
              <input type="password" className="form-control" id="inputConfirmPassword4" placeholder="Confirm Password" onChange={(e)=> setCpassword(e.target.value)}/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
