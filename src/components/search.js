import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Search = () => {
  let [invalid, setInvalid] = useState(false);
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  let [errorMsg, setErrorMsg] = useState("");
  let [patientList, setPatientList] = useState([]);

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
    setInvalid(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (state.name !== "" || state.id !== "" || state.tagId !== "") {
      const res = await fetch(
        `http://localhost:8080/v1/patient?name=${state.name}&id=${state.id}&tagId=${state.tagId}`
      );
      const data = await res.json();
      if (res.ok) {
        setErrorMsg("");
        setPatientList(data);
      } else {
        setErrorMsg(data.error);
      }
    } else {
      setErrorMsg("");
      setInvalid(true);
    }
  };

  const ResultsBox = ({ results }) => {
    const resBox = results.map((r, i) => {
      return (
        <div key={i} className="result">
          {"Name: " + r.name + " ID: " + r.id + " Tag ID: " + r.tagId}
        </div>
      );
    });
    return <div className="results-box">{resBox}</div>;
  };

  return (
    <div className="App">
      <div className="background">
        <div className="form-box">
          <p className="big-label">
            Search for a patient by one or more fields:
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                isInvalid={invalid}
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide at least one field.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                isInvalid={invalid}
                type="text"
                placeholder="Patient ID"
                name="id"
                value={state.id}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide at least one field.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tag ID</Form.Label>
              <Form.Control
                isInvalid={invalid}
                type="text"
                placeholder="Tag ID"
                name="tagId"
                value={state.tagId}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide at least one field.
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <div className="error-message">{errorMsg}</div>
        </div>
        <ResultsBox results={patientList} />
      </div>
    </div>
  );
};
