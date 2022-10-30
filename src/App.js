import './App.css';
import Navbar from './components/Navbar/Navbar';
import Record from './components/Record/Record';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <p>OVH React Interface</p>
      <Record />
    </div>
  );
}
