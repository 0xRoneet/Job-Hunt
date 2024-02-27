import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: 20,
    Gender: 1,
    Stream: 1,
    Internships: 1,
    CGPA: 8,
    Certification: 4,
    HistoryOfBacklogs: 1,
  });

  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue;

    if (name === "Gender") {
      updatedValue = value.toLowerCase() === "male" ? 1 : 0;
    } else if (name === "Stream") {
      switch (value.toLowerCase()) {
        case "civil":
          updatedValue = 0;
          break;
        case "computer science":
          updatedValue = 1;
          break;
        case "electrical":
          updatedValue = 2;
          break;
        case "electronics and telecommunication":
          updatedValue = 3;
          break;
        case "information technology":
          updatedValue = 4;
          break;
        case "mechanical":
          updatedValue = 5;
          break;
        default:
          updatedValue = value;
      }
    } else {
      updatedValue = value;
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://588d-45-115-54-83.ngrok.io/placement_prediction',
        formData
      );

      console.log('Prediction Result:', response.data);
      setResult(response.data) // Fixed the typo here
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "600px" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "blue", fontSize: "2em" }}><b>Prediction Form :</b></h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Age:
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Gender:
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
                Stream:
                <select
                  name="Stream"
                  value={formData.Stream}
                  onChange={handleInputChange}
                >
                  <option value="0">Civil</option>
                  <option value="1">CS</option>
                  <option value="2">EE</option>
                  <option value="3">EXTC</option>
                  <option value="4">IT</option>
                  <option value="5">Mech</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Internships:
                <input
                  type="number"
                  name="Internships"
                  value={formData.Internships}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
                CGPA:
                <input
                  type="number"
                  name="CGPA"
                  value={formData.CGPA}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Certification:
                <input
                  type="number"
                  name="Certification"
                  value={formData.Certification}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>
              HistoryOfBacklogs:
              <input
                type="number"
                name="HistoryOfBacklogs"
                value={formData.HistoryOfBacklogs}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button className="button" type="submit">Submit</button>
        </form>
      </div>
      <h2 className='tag' > Result: {result} </h2>
    </div>
  );
};

export default PredictionForm;