import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
/* Component */
import { Layout } from 'antd';
import Header from "./header"
import Section from "./section"
const { Content, Footer } = Layout;


const Main = () => {
  return(
    <>
      <Router>
        <Header/>
        <Content style={{ padding: '0 8%', minHeight: '79vh' }}>
          <Section />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'rgba(3,37,65, 1)', color: 'white' }}>©2020</Footer>
      </Router>
    </>
  )
}

export default Main
  

