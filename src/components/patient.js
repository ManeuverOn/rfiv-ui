import "../css/App.css";

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export const Patient = ({ match }) => {
  // patient info
  let [state, setState] = useState({
    name: "",
    id: "",
    tagId: "",
  });

  // patient location history
  let [locations, setLocations] = useState([]);

  // load information and locations of patient with the ID provided in the URL
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
        });
        setLocations(data.locations);
      } else {
        console.log(data.error);
      }
    };
    getPatient();
  }, [match.params.id]);

  // component for displaying patient's info
  const PatientInfo = ({ info, locHistory }) => {
    let lastLocation = "";
    if (locHistory.length > 0) {
      const lastEntry = locHistory[locHistory.length - 1];
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

  // component for displaying patient's location history
  const LocationTable = ({ locHistory }) => {
    const locTable = [];
    for (let i = locHistory.length - 1; i >= 0; i--) {
      locTable.push(
        <tr key={i}>
          <td>{locHistory[i][0]}</td>
          <td>{locHistory[i][1]}</td>
        </tr>
      );
    }

    return (
      <div className="table-box">
        <Table hidden={locTable.length === 0} striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>{locTable}</tbody>
        </Table>
      </div>
    );
  };

  // return patient location and location history
  return (
    <div className="App">
      <div className="background">
        <PatientInfo info={state} locHistory={locations} />
        <LocationTable locHistory={locations} />
      </div>
    </div>
  );
};
