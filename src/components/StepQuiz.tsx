import React, { useCallback, useEffect, useRef, useState } from "react";

import "./Speech.scss";
import MikeIcon from "@/assets/mike-icon.svg";
import ResultLottie from "@/components/ResultLottie";
import { LOTTIE_TYPE } from "@/constant";
import { useSpeechRecognition } from "@/lib/speech";
import { ValueOf } from "@/types";
import { Quiz } from "@/types/quiz";

type Props = {
  quiz: Quiz;
  onNext: (quiz: Quiz, tryCount: number) => void;
};
const StepQuiz: React.FC<Props> = ({ quiz, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [stateMessage, setStateMessage] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [showLottieType, setShowLottieType] = useState<
    ValueOf<typeof LOTTIE_TYPE>
  >(LOTTIE_TYPE.EMPTY);

  const speechRecognition = useRef<ReturnType<
    typeof useSpeechRecognition
  > | null>(null);

  useEffect(() => {
    speechRecognition.current = useSpeechRecognition(
      "ko-KR", //"en-US",
      successCallback,
      changeStateMessageCallback,
      failureCallback
    );
  }, [quiz, tryCount]);

  const successCallback = useCallback(
    (result: string) => {
      setSpeechText(result);
      const nextTryCount = tryCount + 1;
      setTryCount(nextTryCount);

      if (quiz.text === result) {
        setSpeechText("");
        setTryCount(0);
        setShowLottieType(LOTTIE_TYPE.SUCCESS);
        console.log("정답");
      } else {
        setShowLottieType(LOTTIE_TYPE.FAILURE);
        console.log("오답!", quiz.text, result);
      }

      setTimeout(() => {
        setShowLottieType(LOTTIE_TYPE.EMPTY);
        if (quiz.text === result) {
          onNext(quiz, nextTryCount);
        }
        setIsLoading(false);
      }, 2000);
    },
    [quiz, tryCount]
  );

  const changeStateMessageCallback = useCallback((message: string) => {
    setStateMessage(message);
  }, []);

  const failureCallback = useCallback(() => {
    setIsLoading(false);
  }, []);

  const speechStartHandler = useCallback(() => {
    if (isLoading) {
      return;
    }
    speechRecognition.current?.start();
    setIsLoading(true);
  }, [isLoading]);

  return (
    <div className="speech">
      <div className="speech__question">
        <div className="speech__question-word">{quiz?.text || "?"}</div>
      </div>
      <div className="speech__recognition">{speechText}</div>
      <div className="speech__count">{tryCount}</div>
      <p className="speech__state-message">{stateMessage}</p>

      <ResultLottie type={showLottieType} />
      <button
        type="button"
        disabled={isLoading}
        className="speech__recoding"
        onClick={speechStartHandler}
      >
        <img src={MikeIcon} />
      </button>
    </div>
  );
};

export default StepQuiz;
