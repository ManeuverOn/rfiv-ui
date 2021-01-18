import "../css/App.css";

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Patient = ({ match }) => {
  let [state, setState] = useState({ name: "", id: "", tagId: "" });

  useEffect(() => {
    const getPatient = async () => {
      const res = await fetch(
        `http://localhost:8080/v1/patient/${match.params.id}`
      );
      const data = await res.json();
      if (res.ok) {
        setState({ name: data.name, id: data.id, tagId: data.tagId });
      } else {
        console.log(data.error);
      }
    };
    getPatient();
  }, [match.params.id]);

  const PatientInfo = ({ info }) => {
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
