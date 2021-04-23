/* Implements components that are shared between other files */
import "../css/App.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/*
 * Generic form that takes in:
 * - validated - Boolean that if true, form is invalid and user is notified; else, no notification
 * - handleSubmit - function that gets called when submit button is clicked
 * - handleChange - function that gets called whenever a change is made in the form
 * - feedback - string which is displayed when validated is true (form is invalid)
 * - buttonLabel - string which is the label on the button
 * - fields - each form group to include in the form
 * 
 * See https://react-bootstrap.github.io/components/forms/ for more info
 */
export const FormBox = ({
  validated,
  handleSubmit,
  handleChange,
  feedback,
  buttonLabel,
  fields,
}) => {
  const formFields = fields.map((field, index) => (
    <Form.Group key={index}>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        autoFocus={index === 0}
        required
        type="text"
        placeholder={field.label}
        name={field.name}
        value={field.value}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.target.blur();
          }
        }}
      />
      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Group>
  ));

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {formFields}
      <Button type="submit">{buttonLabel}</Button>
    </Form>
  );
};
