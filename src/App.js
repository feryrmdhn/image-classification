import logo from './logo.svg';
import './App.css';
import ImageClassification from './components';

function App() {
  return (
    <div className="App">
      <section className="App-wrapper">
        <img src={logo} className="App-logo" alt="logo" />
        <ImageClassification />
      </section>
    </div>
  );
}

export default App;
