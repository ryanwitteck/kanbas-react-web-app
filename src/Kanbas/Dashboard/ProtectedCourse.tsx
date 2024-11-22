import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourse({ children, enrolled, courses }: { children: any; enrolled: boolean, courses: any[]}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { cid } = useParams();



  let isEnrolled = courses.some(
    (course: any) =>
      course._id === cid && course.enrolled
  );
  if(!isEnrolled){
    isEnrolled = courses.some(
      (course: any) =>
        course._id === cid && !enrolled
    );
  }
  console.log("isEnrolled", isEnrolled);
  console.log("courses", courses);
  console.log("enrolled val:", enrolled);
  

  if (currentUser._id && isEnrolled) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
