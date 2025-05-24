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
  const [result, setResult] = useState(null);

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
    e.preventDefault();    try {
      const response = await axios.post(
        'https://8778-182-48-212-244.ngrok-free.app/placement_prediction',
        formData
      );

      console.log('Prediction Result:', response.data);
      setResult(response.data)
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
        </form>      </div>
        {result && (
        <div className="result-container">
          <h2 className='tag'>Prediction Result:</h2>
          
          {result.status === "success" ? (
            <div className={result.placed ? "success-result" : "warning-result"}>
              <h3>{result.plainMessage || result.message}</h3>
                {result.placed ? (
                <div>
                  {result.strengths && result.strengths.length > 0 && (
                    <>
                      <h4>Your Strengths:</h4>
                      <ul>
                        {result.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {result.next_steps && result.next_steps.length > 0 && (
                    <>
                      <h4>Next Steps:</h4>
                      <ul>
                        {result.next_steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {result.trending_skills && (
                    <>
                      <h4>Trending Skills:</h4>
                      <div className="skills-container">
                        {result.trending_skills.tech && (
                          <div>
                            <h5>Technical Skills:</h5>
                            <ul>
                              {result.trending_skills.tech.map((skill, index) => (
                                <li key={index}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.trending_skills.soft_skills && (
                          <div>
                            <h5>Soft Skills:</h5>
                            <ul>
                              {result.trending_skills.soft_skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  {result.areas_to_improve && result.areas_to_improve.length > 0 && (
                    <>
                      <h4>Areas to Improve:</h4>
                      <ul>
                        {result.areas_to_improve.map((area, index) => (
                          <li key={index}>{area}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {result.recommendations && result.recommendations.length > 0 && (
                    <>
                      <h4>Recommendations:</h4>
                      <ul>
                        {result.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {result.trending_skills_to_learn && (
                    <>
                      <h4>Skills to Learn:</h4>
                      <div className="skills-container">
                        {result.trending_skills_to_learn.tech && (
                          <div>
                            <h5>Technical Skills:</h5>
                            <ul>
                              {result.trending_skills_to_learn.tech.map((skill, index) => (
                                <li key={index}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.trending_skills_to_learn.courses && (
                          <div>
                            <h5>Recommended Courses:</h5>
                            <ul>
                              {result.trending_skills_to_learn.courses.map((course, index) => (
                                <li key={index}>{course}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.trending_skills_to_learn.resources && (
                          <div>
                            <h5>Helpful Resources:</h5>
                            <ul>
                              {result.trending_skills_to_learn.resources.map((resource, index) => (
                                <li key={index}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (            <div className="error-result">
              <p>{result.plainMessage || result.error || "An error occurred during prediction."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;