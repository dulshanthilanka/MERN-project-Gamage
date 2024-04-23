import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Index() {

  const [name, setUpdatedName] = useState('');
  const [age, setUpdatedAge] = useState('');
  const [status, setUpdatedStatus] = useState('');
  const [image, setUpdatedImage] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/index/'+id, {
        name,
        age,
        status,
        image
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
    navigate('/home')
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>INDEX</title>
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
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputId4">ID</label>
              <input
                type="text"
                className="form-control"
                id="inputId4"
                placeholder="ID"
                value={id}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputName4">NAME</label>
              <input
                type="text"
                className="form-control"
                id="inputName4"
                placeholder="NAME"
                value={name}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAge4">AGE</label>
              <input
                type="number"
                className="form-control"
                id="inputAge4"
                placeholder="AGE"
                value={age}
                onChange={(e) => setUpdatedAge(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputStatus4">STATUS</label>
              <input
                type="text"
                className="form-control"
                id="inputStatus4"
                placeholder="STATUS"
                value={status}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputImage4">IMAGE</label>
            <br/>
              <input type="file" accept="image/*" className="btn btn-primary" id="inputImage4" onChange={(e) => setUpdatedImage(e.target.value)}/>
            </div>
            <div className="form-group col-md-6">
        
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            UPDATE
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
