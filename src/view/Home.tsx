import React, { useCallback, useMemo, useState } from "react";

// import StepChooseLevel from "@/components/StepChooseLevel";
import StepQuiz from "@/components/StepQuiz";
import { Quiz } from "@/types/quiz";

const Home: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizList, setQuizList] = useState<Quiz[]>([
    // {
    //   text: "bike",
    //   id: 0,
    // },
    // {
    //   text: "cake",
    //   id: 1,
    // },
    // {
    //   text: "lake",
    //   id: 2,
    // },
    // {
    //   text: "cave",
    //   id: 3,
    // },
    // {
    //   text: "hive",
    //   id: 4,
    // },
    // {
    //   text: "five",
    //   id: 5,
    // },
    {
      text: "여름",
      id: 0,
    },
    {
      text: "사과",
      id: 1,
    },
    {
      text: "바나나",
      id: 2,
    },
  ]);

  const changeLevel = useCallback((newLevel: number) => {
    setLevel(newLevel);
  }, []);

  const nextQuiz = useCallback(
    (quiz: Quiz, tryCount: number) => {
      const nextIndex = currentQuizIndex + 1;
      console.log("이전 정답 문제 :", { quiz, tryCount });
      if (quizList[nextIndex]) {
        setCurrentQuizIndex(nextIndex);
        console.log({ currentQuizIndex, nextIndex });
      } else {
        console.log("모두 맞춤!");
      }
    },
    [currentQuizIndex, quizList, setCurrentQuizIndex]
  );

  const currentQuiz = useMemo(() => {
    return quizList[currentQuizIndex];
  }, [quizList, currentQuizIndex]);

  return (
    <>
      {/* <StepChooseLevel onSelec  tLevel={changeLevel} /> */}
      <StepQuiz quiz={currentQuiz} onNext={nextQuiz} />
    </>
  );
};

export default Home;
