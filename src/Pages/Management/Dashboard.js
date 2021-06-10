import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import Table from "react-bootstrap/Table";
import "./Dashboard.scss";
import axios from "axios";

export const Dashboard = () => {
  const [session, setSession] = useState([]);
  const [lesson, setLesson] = useState({});

  useEffect(async () => {
    const result = await axios("http://localhost:8000/api/lessons");
    setSession(result.data);
    console.log(session);
  }, []);

  return (
    <div className="Homepage">
      <div className="context">
        <div className="Dashboard">
          <div className="header">
            <Header />
          </div>
          <div className="body">
            <Table responsive="lg">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Session ID</th>
                  <th>Session Name</th>
                  <th>Period</th>
                  <th>Room</th>
                  <th>Lecturer ID</th>
                </tr>
              </thead>
              {session.map((item, counter) => (
                <tr>
                  <td>{++counter}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.period}</td>
                  <td>{item.room}</td>
                  <td>{item.lecturer}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
