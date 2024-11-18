/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { courseEnroll, courseUnenroll } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  const dispatch = useDispatch();


  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentReducer.enrollments);

  const isFacultyRole = currentUser.role === "FACULTY";
  const isStudentRole = currentUser.role === "STUDENT";

  const [toggleCourseView, setCourseView] = useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFacultyRole && <h5> New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse} > Add </button>
        <button className="btn btn-warning float-end me-2"
          onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5>}
      {isFacultyRole && <br />}
      {isFacultyRole && <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />}
      {isFacultyRole && <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />}

      {isFacultyRole && <hr />}
      <div className="d-flex justify-content-between align-items-center" style={{ paddingLeft: '10px' }}>
        <h2 id="wd-dashboard-published">Published Courses ({courses.filter((course) =>
          enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          )).length})</h2>
        {isStudentRole && <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => setCourseView(!toggleCourseView)}>Enrollments</button>}
      </div>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {toggleCourseView ? courses.map((course) => {
            const isEnrolled = enrollments.some(
              (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
            );

            return (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src="/images/reactjs.jpg" width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      <button className="btn btn-primary"> Go </button>

                      {isFacultyRole && <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>}
                      {isFacultyRole && <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                      }
                      {(isStudentRole && isEnrolled) && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(courseUnenroll({ _id: enrollments.find((e: any) => e.user === currentUser._id && e.course === course._id)._id }));
                          }}
                          className={"btn btn-danger float-end"}
                          id="wd-enroll-course-btn"
                        >
                          Unenroll
                        </button>
                      )}
                      {(isStudentRole && !isEnrolled) && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(courseEnroll({ user: currentUser._id, course: course._id }));
                          }}
                          className={"btn btn-success float-end"}
                          id="wd-enroll-course-btn"
                        >
                          Enroll
                        </button>
                      )}


                    </div>
                  </Link>
                </div>
              </div>
            );
          })
            :
            courses
              .map((course) => (
                <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                  <div className="card rounded-3 overflow-hidden">
                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                      <img src="/images/reactjs.jpg" width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name} </h5>
                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                          {course.description} </p>
                        <button className="btn btn-primary"> Go </button>

                        {isFacultyRole && <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>}
                        {isFacultyRole && <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>}
                        {isStudentRole && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(courseUnenroll({ _id: enrollments.find((e: any) => e.user === currentUser._id && e.course === course._id)._id }));

                            }}
                            className="btn btn-danger float-end"
                            id="wd-enroll-course-btn"
                          >
                            Unenroll
                          </button>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>);
}