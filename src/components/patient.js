import "../css/App.css";

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { SyncIcon } from "@primer/octicons-react";
import { CSVLink } from "react-csv";

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
  const getPatient = useCallback(async () => {
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
  }, [match.params.id]);

  // get patient information when page loads
  useEffect(() => {
    getPatient();
  }, [getPatient]);

  // component for displaying patient's info
  const PatientInfo = ({ info, locHistory }) => {
    let lastLocation = "";
    if (locHistory.length > 0) {
      const lastEntry = locHistory[locHistory.length - 1];
      lastLocation =
        lastEntry[1] + " at " + new Date(lastEntry[0]).toLocaleString();
    }

    return (
      <Container>
        <Row className="justify-content-end">
          <Link to={`/edit/${match.params.id}`}>Edit Patient Info</Link>
        </Row>
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

  // Icon for refreshing info on page
  const RefreshIcon = () => {
    return (
      <div>
        <Link to="#" replace onClick={getPatient}>
          <SyncIcon size="small" />
        </Link>
      </div>
    );
  };

  // component for displaying patient's location history
  const LocationTable = ({ info, locHistory }) => {
    // table of locations
    const locTable = [];
    for (let i = locHistory.length - 1; i >= 0; i--) {
      locTable.push(
        <tr key={i}>
          <td>{new Date(locHistory[i][0]).toLocaleString()}</td>
          <td>{locHistory[i][1]}</td>
        </tr>
      );
    }

    // link to export to CSV
    const csvLink = (
      <CSVLink
        data={[["time", "location"]].concat(locHistory)}
        filename={`location-history-${info.id}`}
      >
        Export to CSV
      </CSVLink>
    );

    return (
      <div>
        <Row className="justify-content-end" style={{ margin: "auto" }}>
          {csvLink}
        </Row>
        <div className="table-box" hidden={locTable.length === 0}>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>{locTable}</tbody>
          </Table>
        </div>
      </div>
    );
  };

  // return patient location and location history
  return (
    <div className="App">
      <div className="background">
        <PatientInfo info={state} locHistory={locations} />
        <RefreshIcon />
        <LocationTable info={state} locHistory={locations} />
      </div>
    </div>
  );
};
