import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(`${ENROLLMENTS_API}`, {
    userId,
    courseId,
  });
  return data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
  const { data } = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return data;
};
