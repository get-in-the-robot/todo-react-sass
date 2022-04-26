import { useState } from 'react';
import ContextProviders from './store/ContextProviders';
import LocalStorage from './store/LocalStorage';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  const [searchStr, setSearchStr] = useState('');
  const searchHandler = (data) => setSearchStr(data);

  return (
    <ContextProviders>
      <LocalStorage />
      <Header />
      <Filters onSearch={searchHandler} />
      <TaskList search={searchStr} />
      <Footer />
    </ContextProviders>
  );
}

export default App;
