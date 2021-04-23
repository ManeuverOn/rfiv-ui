import "../css/App.css";

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FormBox } from "./shared";

export const Edit = ({ history, match }) => {
  // notify user of invalid input
  let [validated, setValidated] = useState(true);
  // save user's form input
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  // error status of editing patient info
  let [errorMsg, setErrorMsg] = useState("");

  // handles saving changes on form input
  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  // get information of patient with the ID provided in the URL
  const getPatient = useCallback(async () => {
    const res = await fetch(
      `http://localhost:8080/v1/patient/${match.params.id}`
    );
    const data = await res.json();
    if (res.ok) {
      setState({
        name: data.patient.name,
        id: data.patient.id,
        tagId: data.patient.tagId,
      });
    } else {
      setErrorMsg(data.error);
    }
  }, [match.params.id]);

  // get patient information when page loads
  useEffect(() => {
    getPatient();
  }, [getPatient]);

  // handles editing patient info in database
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // make sure at least one field is non-empty
    if (ev.currentTarget.checkValidity()) {
      const res = await fetch(
        `http://localhost:8080/v1/patient/${match.params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: state.name, tagId: state.tagId }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        // edits successful, go to patient page
        history.push(`/patient/${state.id}`);
      } else {
        // error when editing info
        const data = await res.json();
        setErrorMsg(data.error);
        setValidated(false);
      }
    } else {
      // at least one field was empty
      setErrorMsg("");
      setValidated(true);
    }
  };

  // returns the form used for editing patient info
  return (
    <div className="App">
      <div className="background">
        <div className="form-box">
          <p className="big-label">Change one or more fields:</p>
          <FormBox
            validated={validated}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            feedback="Missing Field."
            buttonLabel="Save Changes"
            fields={[
              { label: "Name", name: "name", value: state.name },
              { label: "Tag ID", name: "tagId", value: state.tagId },
            ]}
          />
          <div style={{ marginTop: "1vh" }}>
            <Link to={`/patient/${state.id}`}>Cancel</Link>
          </div>
          <div className="error-message">{errorMsg}</div>
        </div>
      </div>
    </div>
  );
};
