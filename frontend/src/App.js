// import { Container } from '@chakra-ui/react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" component = {Homepage} exact/>
      <Route path="/chats" component = {Chatpage}/>
    </div>
  );
}

export default App;
