import "../css/App.css";

import { useState } from "react";
import { FormBox } from "./shared";

export const Add = () => {
  // notify user of invalid input
  let [validated, setValidated] = useState(false);
  // save user's form input
  let [state, setState] = useState({ name: "", id: "", tagId: "" });
  // error status of adding patient
  let [errorMsg, setErrorMsg] = useState("");
  // success status of adding patient
  let [successMsg, setSuccessMsg] = useState("");

  // handles saving changes on form input
  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  // handle submitting form to add patient to database
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // check that all fields are non-empty
    if (ev.currentTarget.checkValidity()) {
      const res = await fetch("http://localhost:8080/v1/patient", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        // successfully added patient
        setErrorMsg("");
        setSuccessMsg("Successfully added patient.");
        setState({ name: "", id: "", tagId: "" });
      } else {
        // failure in adding patient
        const data = await res.json();
        setErrorMsg(data.error);
        setSuccessMsg("");
      }
      setValidated(false);
    } else {
      // at least one field was empty
      setErrorMsg("");
      setSuccessMsg("");
      setValidated(true);
    }
  };

  // return form for adding new patient to database
  return (
    <div className="App">
      <div className="background">
        <div className="form-box">
          <p className="big-label">Add a patient:</p>
          <FormBox
            validated={validated}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            feedback={"Missing Field."}
            buttonLabel={"Add Patient"}
            fields={[
              { label: "Name", name: "name", value: state.name },
              { label: "Patient ID", name: "id", value: state.id },
              { label: "Tag ID", name: "tagId", value: state.tagId },
            ]}
          />
          <div className="error-message">{errorMsg}</div>
          <div className="success-message">{successMsg}</div>
        </div>
      </div>
    </div>
  );
};
