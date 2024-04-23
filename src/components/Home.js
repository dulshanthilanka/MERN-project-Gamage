import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Home() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/home");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/home", { id, name, age, status, image })
      .then((result) => {
        console.log(result);
        setData([...data, { id, name, age, status, image }]);
        setId("");
        setName("");
        setAge("");
        setStatus("");
      })
      .catch((err) => console.log(err));
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/data/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Home</title>
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
              flex-direction: column;
            }
            .table_div {
              margin-top: 20px;
              width: 90%;
              display: flex;
              justify-content: center;
            }
            .table_div table {
              width: 100%;
              margin-left: 19%;
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
                onChange={(e) => setId(e.target.value)}
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setAge(e.target.value)}
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
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputImage4">IMAGE</label>
            <br/>
              <input type="file" accept="image/*" className="btn btn-primary" id="inputImage4" onChange={(e) => setImage(e.target.value)}/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            CREATE
          </button>
        </form>
      </div>
      <div className="table_div">
        <table className="table table-bordered table-lg">
          <thead>
            <tr>
              <th scope="col" className="col-1">
                ID
              </th>
              <th scope="col" className="col-3">
                Name
              </th>
              <th scope="col" className="col-1">
                AGE
              </th>
              <th scope="col" className="col-3">
                STATUS
              </th>
              <th scope="col" className="col-2">
                IMAGE
              </th>
              <th scope="col" className="col-2">FUNCTION</th>
            </tr>
          </thead>
          <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">{item.id}</td>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">{item.age}</td>
                  <td className="align-middle">{item.status}</td>
                  <td className="align-middle">
                    <img src={item.image} width="50px" height="50px" />
                  </td>
                  <td className="text-center align-middle">
                    <button className="btn btn-danger" onClick={() => onDelete(item._id)}>
                      DELETE
                    </button>
                    <Link to={`/index/${item._id}`}>
                      <button className="btn btn-success">UPDATE</button>
                    </Link>
                  </td>
                </tr>
  ))}
</tbody>


        </table>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    </>
  );
}
