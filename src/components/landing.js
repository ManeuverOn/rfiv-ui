import logo from "../images/rfiv.svg";
import "../css/App.css";

// return the landing page which gives a brief introduction to the app
export const Landing = () => {
  return (
    <div className="App">
      <header className="background">
        <img src={logo} className="logo" alt="logo" />
        <div className="large-text">
          Welcome to the RFIV tracking web app. Use the Navbar at the top to
          test the different functions. <b>Search</b> for a patient by name or
          ID and <b>Add</b> a patient to the database.
        </div>
      </header>
    </div>
  );
};
