/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Account from "./Account";
import { Navigate, Route, Routes, useRouteLoaderData } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Courses from "./Courses";
import "./style.css";
import KanbasNavigation from "./Navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourse from "./Dashboard/ProtectedCourse";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import { courseEnroll, courseUnenroll, setEnrollemnts } from "./Dashboard/reducer";


export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const dispatch = useDispatch();



  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    const users = await userClient.findAllUsers();
    users.forEach(async (user: { _id: string; }) => {
      await userClient.unenrollFromCourse(user._id, courseId);
    });
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };


  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
      dispatch(courseEnroll({ user: currentUser._id, course: courseId }));

    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(courseUnenroll({ user: currentUser._id, course: courseId }));
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };

        } else {
          return course;
        }
      })
    );
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              enrolling={enrolling}
              setEnrolling={setEnrolling}
              updateEnrollment={updateEnrollment} /></ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedCourse enrolled={enrolling}
              courses={courses}><Courses courses={courses} /></ProtectedCourse>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
