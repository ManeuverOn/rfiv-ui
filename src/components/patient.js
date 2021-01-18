import "../css/App.css";

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Patient = ({ match }) => {
  // save user's search query
  let [state, setState] = useState({
    name: "",
    id: "",
    tagId: "",
    locations: [],
  });

  // load information of patient with corresponding ID
  useEffect(() => {
    const getPatient = async () => {
      const res = await fetch(
        `http://localhost:8080/v1/patient/${match.params.id}`
      );
      const data = await res.json();
      if (res.ok) {
        setState({
          name: data.name,
          id: data.id,
          tagId: data.tagId,
          locations: data.locations,
        });
      } else {
        console.log(data.error);
      }
    };
    getPatient();
  }, [match.params.id]);

  // display patient's info
  const PatientInfo = ({ info }) => {
    const locations = info.locations;
    let lastLocation = "";
    if (locations.length > 0) {
      const lastEntry = locations[locations.length - 1];
      lastLocation = lastEntry[1] + " at " + lastEntry[0];
    }

    return (
      <Container className="patient-box">
        <Row>
          <Col>Name</Col>
          <Col>{info.name}</Col>
        </Row>
        <Row>
          <Col>ID</Col>
          <Col>{info.id}</Col>
        </Row>
        <Row>
          <Col>Tag ID</Col>
          <Col>{info.tagId}</Col>
        </Row>
        <Row>
          <Col>Patient's Last Location</Col>
          <Col>{lastLocation}</Col>
        </Row>
      </Container>
    );
  };

  return (
    <div className="App">
      <div className="background">
        <PatientInfo info={state} />
      </div>
    </div>
  );
};
