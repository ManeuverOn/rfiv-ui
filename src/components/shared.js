import "../css/App.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
