
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/App.css';
import Login from './Login';

function App() {
  const [id, setId] = useLocalStorage('username')

  return (
    <>
      {id ? <h1>hello</h1>: <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
