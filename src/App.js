import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import Todo from './routes/Todo';
import MyTasks from './routes/MyTasks';
import CompleteTasks from './routes/CompleteTasks';
import Calender from './routes/Calender';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <section style={{width: "80%", margin: "0 auto"}}>
        <Routes>
          <Route path='/' element={<Todo />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/myTasks' element={<MyTasks />} />
          <Route path='/completeTasks' element={<CompleteTasks />} />
          <Route path='/calender' element={<Calender />} />
        </Routes>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default App;
