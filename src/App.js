import logo from './logo.svg';
import './App.css';
import ImageClassification from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ImageClassification />
      </header>
    </div>
  );
}

export default App;
