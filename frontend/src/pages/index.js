import React, { Component } from "react";

//Imports de outros arquivos
import Routes from "../routes";
import Sidebar from '../components/Sidebar'
import Form from './styles'

export default class Content extends Component {
  render() {
    return (
        <Form>
            <div className='Sidebar'>
              <Sidebar/>
            </div>
            <div className='Content'>
              <Routes/>
            </div>
        </Form>
    )
  }
}