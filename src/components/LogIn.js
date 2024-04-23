import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn() {

  const googleAuth = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        "_self"
    );
}

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/', { email, password})
        .then(result => {
          console.log(result)
          if(result.data === "Success"){
            navigate('/home')
          }
        })
        .catch(err => console.log(err));
}


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LOG IN</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <style>
          {`
            .form-group {
              margin-bottom: 1.5rem;
            }
            .container {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .btn.btn-primary { /* corrected */
      margin: 10px;
      padding: 10px;
    }
          `}
        </style>
      </Helmet>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/Register"><button type="button" className="btn btn-primary">
            Register
          </button></Link>
          <button className="btn btn-primary" onClick={googleAuth}>
						<span>Sing in with Google</span>
					</button>
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
