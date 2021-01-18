import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Add = () => {
  // notify user of invalid input
  let [validated, setValidated] = useState(false);
  // save user's form input
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  // error status of adding patient
  let [errorMsg, setErrorMsg] = useState("");
  // success status of adding patient
  let [successMsg, setSuccessMsg] = useState("");

  // save user's form input
  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  // try to add patient to database
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (ev.currentTarget.checkValidity()) {
      const res = await fetch("http://localhost:8080/v1/patient", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMsg("");
        setSuccessMsg("Successfully added patient.");
        setState({ name: "", id: "", tagId: "" });
      } else {
        setErrorMsg(data.error);
        setSuccessMsg("");
      }
      setValidated(false);
    } else {
      setErrorMsg("");
      setSuccessMsg("");
      setValidated(true);
    }
  };

  return (
    <div className="App">
      <div className="background">
        <div className="form-box">
          <p className="big-label">Add a patient:</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the patient's name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Patient ID"
                name="id"
                value={state.id}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the patient's ID.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tag ID (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tag ID"
                name="tagId"
                value={state.tagId}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <div className="error-message">{errorMsg}</div>
          <div className="success-message">{successMsg}</div>
        </div>
      </div>
    </div>
  );
};
