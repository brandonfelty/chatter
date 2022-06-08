
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/App.css';
import Login from './Login';
import Dashboard from './Dashboard'

function App() {
  const [id, setId] = useLocalStorage('username')

  return (
    <>
      {id ? <Dashboard id={id}/>: <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
