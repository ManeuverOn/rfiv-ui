import "../css/App.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { SyncIcon } from "@primer/octicons-react";

export const Patient = ({ match }) => {
  // patient info
  let [state, setState] = useState({
    name: "",
    id: "",
    tagId: "",
  });

  // patient location history
  let [locations, setLocations] = useState([]);

  // get information and locations of patient with the ID provided in the URL
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

  // get patient information when page loads
  useEffect(() => {
    getPatient();
  }, []);

  // Icon for refreshing info on page
  const RefreshIcon = () => {
    return (
      <div className="refresh-icon">
        <Row className="justify-content-md-center">
          <Link to={`/patient/${match.params.id}`} onClick={getPatient}>
            <SyncIcon size="24px" />
          </Link>
        </Row>
      </div>
    );
  };

  // component for displaying patient's info
  const PatientInfo = ({ info, locHistory }) => {
    let lastLocation = "";
    if (locHistory.length > 0) {
      const lastEntry = locHistory[locHistory.length - 1];
      lastLocation = lastEntry[1] + " at " + lastEntry[0];
    }

    return (
      <Container>
        <Table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{info.name}</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{info.id}</td>
            </tr>
            <tr>
              <td>Tag ID</td>
              <td>{info.tagId}</td>
            </tr>
            <tr>
              <td>Patient's Last Location</td>
              <td>{lastLocation}</td>
            </tr>
          </tbody>
        </Table>
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
        <Table hidden={locTable.length === 0} size="sm" striped bordered hover>
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
        <RefreshIcon />
        <PatientInfo info={state} locHistory={locations} />
        <LocationTable locHistory={locations} />
      </div>
    </div>
  );
};
