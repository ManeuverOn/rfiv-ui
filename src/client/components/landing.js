import logo from '../images/rfiv.svg';
import '../css/App.css';

const Landing = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a>
          learn react
        </a>
      </header>
    </div>
  );
};

export default Landing;
