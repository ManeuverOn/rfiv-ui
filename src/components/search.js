import "../css/App.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export const Search = ({ history }) => {
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
        `http://localhost:8080/v1/patients?name=${state.name}&id=${state.id}&tagId=${state.tagId}`
      );
      const data = await res.json();
      if (res.ok) {
        setErrorMsg("");
        setPatientList(data);
      } else {
        setPatientList([]);
        setErrorMsg(data.error);
      }
    } else {
      setPatientList([]);
      setErrorMsg("");
      setInvalid(true);
    }
  };

  const handleClick = (name, id, tagId) => {
    history.push(`/patient/${id}`);
  };

  const ResultsTable = ({ results }) => {
    const resultEntry = results.map((r, i) => {
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
          <tbody>{resultEntry}</tbody>
        </Table>
      </div>
    );
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
        <ResultsTable results={patientList} />
      </div>
    </div>
  );
};
