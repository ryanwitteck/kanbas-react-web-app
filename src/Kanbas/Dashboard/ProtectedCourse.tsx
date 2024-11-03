import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as db from "../Database";

export default function ProtectedCourse({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  //const { enrollments } = db;
  const enrollments = useSelector((state: any) => state.enrollmentReducer.enrollments); 

  const { cid } = useParams();

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (currentUser._id && isEnrolled) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
