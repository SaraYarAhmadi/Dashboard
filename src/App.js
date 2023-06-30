import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import routes from "./routes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './App.css'

export default function App() {

  const router = useRoutes(routes)
  const [loading, setLoading] = useState(true);
  const [isDark, setIsdark] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const changeTheme = (event) => {
    const isDark = event.target.checked;
    setIsdark(isDark)
  };

  return (
    loading ?
      <div className="w-100 d-flex justify-content-center align-items-center loading" style={{ height: '100vh' }}>
        <img src="img/Loading_icon.gif" />
      </div> :
       <Row className="m-0" >
         <Col xs={12} sm={12} md={2} className="p-0" >
           <Sidebar isDark={isDark} />
         </Col>
         <Col xs={12} sm={12} md={10} className="p-0" >
           <div className={`main ${isDark ? 'main-dark' : 'main-light'}`}>

             <Header onClick={changeTheme} isDark={isDark} />

             {router}
           </div>
         </Col>
       </Row>
  );
}
