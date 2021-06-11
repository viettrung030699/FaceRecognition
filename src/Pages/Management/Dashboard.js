import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header/Header";
// import { Footer } from "../../Components/Footer/Footer";
import Table from "react-bootstrap/Table";
import "./Dashboard.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
  const [session, setSession] = useState([]);
  const [lesson, setLesson] = useState([]);
  // const [currentSession, setCurrentSession] = useState("");

  const history = useHistory();

  useEffect(async () => {
    const result = await axios("http://localhost:8000/api/lessons");
    setSession(result.data);
  }, []);

   const routeChange = (courseID) => {
     let path = '/dashboard/'.concat(courseID);
     history.push(path);
   };

  async function getLessons(courseID) {
    let url = "http://localhost:8000/api/sessions/getSessionByLessonID/".concat(
      courseID
    );
    const response = await axios(url);
    setLesson(response.data);
    console.log("Lesson: ", lesson);
    routeChange(courseID);
  }

  return (
    <div className="Homepage">
      <div className="context">
        <div className="Dashboard">
          <div className="header">
            <Header />
          </div>
          <div className="body">
            <div className="section_table">
              <h3>Course List</h3>
            </div>
            <Table responsive="lg">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <h3>Course ID</h3>
                  </th>
                  <th>
                    <h3>Course Name</h3>
                  </th>
                  <th>
                    <h3>Period</h3>
                  </th>
                  <th>
                    <h3>Room</h3>
                  </th>
                  <th>
                    <h3>Lecturer ID</h3>
                  </th>
                  <th>
                    <h3>Attendance</h3>
                  </th>
                </tr>
              </thead>
              {session.map((item, counter) => (
                <tr>
                  <td key={counter}>{++counter}</td>
                  <td key={item.id}>
                    <h3 className="text-left font-weight-light">{item.id}</h3>
                  </td>
                  <td key={item.name}>
                    <h3 className="text-left font-weight-light">{item.name}</h3>
                  </td>
                  <td key={item.period}>{item.period}</td>
                  <td key={item.room}>
                    <h3 className="text-center font-weight-bold">
                      {item.room}
                    </h3>
                  </td>
                  <td key={item.lecturer}>{item.lecturer}</td>
                  <td>
                    <button
                      className="btn btn-deep-orange"
                      onClick={(e) => getLessons(item.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
          {/* <Footer /> */}
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
