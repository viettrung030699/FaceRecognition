import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import { Attendance } from "../Report/Report";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Dashboard.scss";
import axios from "axios";
import {
  useHistory,
  useRouteMatch,
  Link,
  Switch,
  Route,
} from "react-router-dom";

export const Dashboard = () => {
  const [session, setSession] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [show, setShow] = useState(false);
  const [uploadImages, setUploadImages] = useState();

  let { path, url } = useRouteMatch();

  const history = useHistory();

  useEffect(async () => {
    const result = await axios("http://localhost:8000/api/lessons");
    setSession(result.data);
    const response = await axios("http://localhost:8000/api/students");
    setStudents(response.data);
  }, []);

  const routeChange = (courseID) => {
    let path = "/dashboard/".concat(courseID);
    history.push(path);
  };

  async function getLessons(courseID, room) {
    let url = "http://localhost:8000/api/sessions/getSessionByLessonID/".concat(
      courseID
    );
    getListStudent(courseID);
    const response = await axios(url);
    setLesson(response.data);
    console.log("Lesson: ", lesson);
    localStorage.setItem("room", room);
  }

  async function getListStudent(courseID) {
    let url2 = "http://localhost:8000/api/listStudent/".concat(courseID);
    const listStudent = await axios(url2);
    // console.log(listStudent.data);
    setStudentList(listStudent.data);
    console.log("Student: ", students);
    // console.log("Get List Student Process: ", studentList);
  }

  async function getAttendance(sessionID, date) {
    let url3 = "http://localhost:8000/api/attendances/".concat(sessionID);
    const attendanceList = await axios(url3).then(function (response) {
      setAttendance(response.data);
      console.log(attendance);
    });
    localStorage.setItem("session", sessionID);
    localStorage.setItem("date", date);
  }

  const checkAttendance = (id, date) => {
    setShow(true);
    localStorage.setItem("id", id);
    localStorage.setItem("date", date);
  };
  const handleClose = () => setShow(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  // async function handleCheck(e) {
  //   const newData = {...data};
  //   newData[e.target.id] = e.target.value;
  //   setData(newData);
  //   console.log(newData);

  //   setShow(false);
  // }

  const uploadImage = async () => {
    console.log(typeof uploadImages);
    let formData = new FormData();
    for (let i = 0; i < uploadImages.length; i++) {
      formData.append("image", uploadImages.item(i));
    }
    formData.append("data", localStorage.getItem("id"));
    console.log(formData.get("image"));
    let dataForm = {
      image: uploadImages,
    };
    const config = {
      headers: {
        "Content-Type": uploadImages.type,
      },
    };
    await axios({
      method: "POST",
      url: "http://localhost:8000/api/demo1",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        alert("Check Attendance Success.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log(uploadImages);
    setShow(false);
    
  };

  return (
    <div className="Homepage">
      <div className="context">
        <div className="Dashboard">
          <div className="header">
            <Header />
          </div>
          <div className="body">
            {/* <div className="section_table">
              <h3>Course List</h3>
            </div> */}
            <Switch>
              <Route exact path={path}>
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
                        <h3 className="text-left font-weight-light">
                          {item.id}
                        </h3>
                      </td>
                      <td key={item.name}>
                        <h3 className="text-left font-weight-light">
                          {item.name}
                        </h3>
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
                          onClick={(e) => getLessons(item.id, item.room)}
                        >
                          <Link to={`${url}/lesson`}>View</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Route>
              {/*  Lesson part  */}
              <Route path={`${path}/lesson`}>
                <Table responsive="lg">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <h3>Session ID</h3>
                      </th>
                      <th>
                        <h3>Session Name</h3>
                      </th>
                      <th>
                        <h3>Date</h3>
                      </th>
                      <th>
                        <h3>Room</h3>
                      </th>
                      <th>
                        <h3>Attendance</h3>
                      </th>
                    </tr>
                  </thead>
                  {lesson.map((item, counter) => (
                    <tr>
                      <td key={counter}>{++counter}</td>
                      <td key={item.session}>
                        <h3 className="font-weight-light">{item.session}</h3>
                      </td>
                      <td key={item.name}>
                        <h3 className="font-weight-light">
                          {item.name.concat(" Week ", counter)}
                        </h3>
                      </td>
                      <td key={item.date}>{item.date}</td>
                      <td>{localStorage.getItem("room")}</td>
                      <td>
                        <button
                          className="btn btn-deep-orange"
                          onClick={(e) =>
                            checkAttendance(item.session, item.date)
                          }
                        >
                          Check Attendance
                        </button>
                        <button
                          className="btn btn-deep-orange"
                          onClick={(e) =>
                            getAttendance(item.session, item.date)
                          }
                        >
                          <Link to={`${url}/report`}>View report</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </Table>
                <Form onSubmit={handleSubmit} id="myForm" name="myForm">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Check Attendance on {localStorage.getItem("date")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <Form.Label size="lg">
                          Session: {localStorage.getItem("id")}
                        </Form.Label>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label size="lg">
                          Date: {localStorage.getItem("date")}
                        </Form.Label>
                      </Form.Group>
                      <Form.Group>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => {
                            setUploadImages(e.target.files);
                          }}
                          required
                          accept="image/*"
                        ></input>
                        <Form.Control.Feedback type="valid">
                          You did it!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={uploadImage}
                      >
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form>
              </Route>
              {/*  Report part  */}
              <Route path={`${path}/report`}>
                {/* <h3 className="text-center font-weight-bolder elegant-color-dark">
                  Attendance Report of {localStorage.getItem("session")}
                </h3> */}
                <Table responsive="lg">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <h3>StudentID</h3>
                      </th>
                      <th>
                        <h3>Student Name</h3>
                      </th>
                      <td>
                        <h3>Date</h3>
                      </td>
                      <th>
                        <h3>Attendance</h3>
                      </th>
                    </tr>
                  </thead>
                  {studentList.map((item, counter) => (
                    <tr>
                      <td key={counter}>{++counter}</td>
                      <td key={item.student}>
                        <h3 className="font-weight-normal">{item.student}</h3>
                      </td>
                      <td>
                        <h3 className="text-left font-weight-light">
                          {
                            students.find((student) => {
                              return student.student === item.student;
                            }).studentName
                          }
                        </h3>
                      </td>
                      <td>
                        <h3 className="font-weight-normal">
                          {localStorage.getItem("date")}
                        </h3>
                      </td>
                      <td>
                        {attendance.find((att) => {
                          return att.student === item.student;
                        }) !== undefined
                          ? "Checked"
                          : "Absence"}
                      </td>
                    </tr>
                  ))}
                </Table>
              </Route>
            </Switch>
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
