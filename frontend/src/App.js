import React from "react";
import "./styles/global";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./routes";
import Sidebar from './components/Sidebar'
import { Div } from "./styles";

//Header, Footer e Routes, estao sendo criados em outras pastas, para facilitar manutencao
const App = () => (
    <Div>
      <Header className="header"/>
      <div className="master">
        <div className='Sidebar'>
          <Sidebar/>
        </div>
        <div className='Content'>
          <Routes/>
        </div>
      </div>
      <Footer />
    </Div>
  );

export default App;
