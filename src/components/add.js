import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Add = () => {
  let [validated, setValidated] = useState(false);
  let [state, setState] = useState({ name: "", id: "", tagId: "" });

  const onChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (ev.currentTarget.checkValidity()) {
      const res = await fetch("http://localhost:8080/v1/patient", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "content-type": "application/json",
        },
      })
      const data = await res.json();
      if (res.ok) {
        console.log("Successfully added patient.")
        console.log(data);
        setState({ name: "", id: "", tagId: "" });
        setValidated(false);
      } else {
        console.log(data.error);
        setValidated(true);
      }
    } else {
      console.log("Invalid entry.")
      setValidated(true);
    }
  };

  return (
    <div className="App">
      <div className="background">
        <div className="content-box">
          <strong>Add a patient:</strong>
          <br />
          <br />
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
