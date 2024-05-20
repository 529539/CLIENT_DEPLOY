import { backendClient } from ".";

// 면접 상세 조회 - Server Fetch
export const getInterview = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/interview/result/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("면접 상세 조회 fetch 실패");
  }
  const { data } = await res.json();
  return data as InterviewDetailType;
};

// 면접 리스트 조회 - React Query
export const getInterviewList = async (sort: number) => {
  const url = `/history/${sort}`;
  return backendClient.get(url);
};

// 질문 스크랩
export const patchQuestion = async (questionId: number) => {
  const url = `/questions/${questionId}`;
  return backendClient.patch(url, { refreshToken: "1234" });
};

// 질문 상세 조회 - Server Fetch
export const getQuestion = async (questionId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/studynote/detail/${questionId}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOCAL_TOKEN}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("질문 상세 조회 fetch 실패");
  }
  const { data } = await res.json();
  return data as QuestionDetailType;
};

// 질문 리스트 조회 - React Query
export const getQuestionList = async (
  filter: number,
  subjectText: CSSubjectType | "ALL",
  onlyWrong: number,
) => {
  const url = `/studynote/${filter}?subjectText=${subjectText}&onlyWrong=${onlyWrong}`;
  return backendClient.get(url);
};
