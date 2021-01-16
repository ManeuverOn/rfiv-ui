import "../css/App.css";
import Form from "react-bootstrap/Form";

export const Search = () => {
  return (
    <div className="App">
      <div className="background">
        <div className="content-box">
          Search for a patient:
          <Form>
            <div key="default-radio" className="mb-3">
              <Form.Check
                type="radio"
                id="default-radio"
                label="This is a radio"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
