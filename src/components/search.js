import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Search = () => {
  let [invalid, setInvalid] = useState(false);
  let [state, setState] = useState({ name: "", id: "", tagId: "" });

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
        console.log(data);
      } else {
        console.log(data.error);
      }
    } else {
      console.log("Invalid entry.");
      setInvalid(true);
    }
  };

  return (
    <div className="App">
      <div className="background">
        <div className="content-box">
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
        </div>
      </div>
    </div>
  );
};
