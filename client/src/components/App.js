
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/App.css';
import Login from './Login';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsContex';

function App() {
  const [id, setId] = useLocalStorage('username')

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  )

  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
