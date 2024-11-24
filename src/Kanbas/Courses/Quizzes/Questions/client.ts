import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuestion = async (quesID: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${quesID}`
  );
  return response.data;
};
export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return data;
};
