/* Implements component for page to search for patients in database */
import "../css/App.css";

import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { FormBox } from "./shared";

export const Search = ({ history, location }) => {
  // whether user's form input is invalid and should be notified
  let [validated, setValidated] = useState(false);
  // user's form input
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  // error status of searching for patient
  let [errorMsg, setErrorMsg] = useState("");
  // save patient list from search results
  let [patientList, setPatientList] = useState([]);

  // load search query from URL when page loads
  useEffect(() => {
    const getSearchQuery = async () => {
      if (location.search !== "") {
        // if search query in URL is not empty, load the search query
        const res = await fetch(
          `http://localhost:8080/v1/patients${location.search}`
        );
        const data = await res.json();
        if (res.ok) {
          // patient found
          setErrorMsg("");
          setPatientList(data.patients);
        } else {
          // error when searching for patient
          setErrorMsg(data.error);
          setPatientList([]);
        }
        // load the search query into the search form
        setState({ ...{ name: "", id: "", tagId: "" }, ...data.query });
      } else {
        // no search query, show default empty search form
        setValidated(false);
        setState({ name: "", id: "", tagId: "" });
        setErrorMsg("");
        setPatientList([]);
      }
    };
    getSearchQuery();
  }, [location.search]);

  // handles saving changes on form input
  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
    setValidated(false);
  };

  // handles search for patients in database
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (state.name !== "" || state.id !== "" || state.tagId !== "") {
      // make sure at least one field is non-empty
      const newLocation = `/search?name=${state.name}&id=${state.id}&tagId=${state.tagId}`;
      if (newLocation !== location.pathname + location.search) {
        // only search if current query is different from the previous one
        history.push(newLocation);
      }
    } else {
      // all fields empty
      setErrorMsg("");
      setValidated(true);
    }
  };

  // handles clicking a patient in the search results
  const handleClick = (id) => {
    history.push(`/patient/${id}`);
  };

  // component for displaying patient list
  const ResultsTable = ({ results }) => {
    const resTable = results.map((r, i) => {
      return (
        <tr key={i} role="button" onClick={() => handleClick(r.id)}>
          <td>{r.name}</td>
          <td>{r.id}</td>
          <td>{r.tagId}</td>
        </tr>
      );
    });
    return (
      <div className="table-box" hidden={results.length === 0}>
        <Table striped bordered hover>
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
          <FormBox
            validated={validated}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            feedback="Please provide at least one field."
            buttonLabel="Search"
            fields={[
              { label: "Name", name: "name", value: state.name },
              { label: "Patient ID", name: "id", value: state.id },
              { label: "Tag ID", name: "tagId", value: state.tagId },
            ]}
          />
          <div className="error-message">{errorMsg}</div>
        </div>
        <ResultsTable results={patientList} />
      </div>
    </div>
  );
};
