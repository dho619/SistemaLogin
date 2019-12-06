import React from "react";
import "./styles/global";
import Content from './pages/'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Form } from "./styles";

//Header, Footer e Routes, estao sendo criados em outras pastas, para facilitar manutencao
const App = () => (
    <Form>
      <Header className="header"/>
      <div className="master">
        <Content/>
      </div>
      <Footer />
    </Form>
  );

export default App;
