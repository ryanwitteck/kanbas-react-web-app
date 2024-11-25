import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

///QUESTIONS:

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};
export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const submitScore = async (userId: string, quizId: string, score: number, answers: any) => {
  const response = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/${userId}/scores/${quizId}/${score}`,
    { answers }
  );
  return response.data;
};
export const getScore = async (userId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users/${userId}/scores/${quizId}`
  );
  return response.data;
};
export const updateScore = async (score: any) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/scores/${score._id}`,
    score
  );
  return data;
};