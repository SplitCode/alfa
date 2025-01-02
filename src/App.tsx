import './App.css';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return <div className="d-flex flex-column h-100">{<Outlet />}</div>;
};

export default App;
