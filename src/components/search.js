import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export const Search = ({ history }) => {
  // notify user of invalid input
  let [invalid, setInvalid] = useState(false);
  // save user's form input
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  // error status of searching for patient
  let [errorMsg, setErrorMsg] = useState("");
  // save patient list from search results
  let [patientList, setPatientList] = useState([]);

  // handles saving changes on form input
  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
    setInvalid(false);
  };

  // handles search for patients in database
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // make sure at least one field is non-empty
    if (state.name !== "" || state.id !== "" || state.tagId !== "") {
      const res = await fetch(
        `http://localhost:8080/v1/patients?name=${state.name}&id=${state.id}&tagId=${state.tagId}`
      );
      const data = await res.json();
      if (res.ok) {
        // patient found
        setErrorMsg("");
        setPatientList(data);
      } else {
        // error when searching for patient
        setErrorMsg(data.error);
        setPatientList([]);
      }
    } else {
      // all fields empty
      setPatientList([]);
      setErrorMsg("");
      setInvalid(true);
    }
  };

  // handles click to to patient's info page from search results
  const handleClick = (name, id, tagId) => {
    history.push(`/patient/${id}`);
  };

  // component for displaying patient list
  const ResultsTable = ({ results }) => {
    const resTable = results.map((r, i) => {
      return (
        <tr
          key={i}
          role="button"
          onClick={() => handleClick(r.name, r.id, r.tagId)}
        >
          <td>{r.name}</td>
          <td>{r.id}</td>
          <td>{r.tagId}</td>
        </tr>
      );
    });
    return (
      <div className="table-box">
        <Table hidden={results.length === 0} striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Tag ID</th>
            </tr>
          </thead>
          <tbody>{resTable}</tbody>
        </Table>
      </div>
    );
  };

  // returns the form used for searching for a patient
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
                autoFocus
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
        <ResultsTable results={patientList} />
      </div>
    </div>
  );
};
