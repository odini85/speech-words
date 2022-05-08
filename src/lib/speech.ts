/* eslint-disable @typescript-eslint/no-explicit-any */
// @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
export const useSpeechRecognition = (
  lang = "ko-KR",
  resultCallback: (result: string) => void,
  changeStateMessage: (message: string) => void,
  failureCallback: () => void
) => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  // 인스턴스 생성
  const recognition = new SpeechRecognition();
  // 중간 결과 반환하지 않음
  recognition.interimResults = false;
  // 언어 설정
  recognition.lang = lang;
  // 연속 결과 반환 여부
  recognition.continuous = true;
  // 인식된 단어의 최대 대안 숫자
  recognition.maxAlternatives = 100;

  let isRun = false;

  let cancelId: NodeJS.Timeout | null = null;

  recognition.addEventListener("result", (e: any) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        isRun = false;
        resultCallback(transcript.toLocaleLowerCase());
        changeStateMessage("");
        recognition.stop();
        clearTimeout(cancelId as NodeJS.Timeout);
        break;
      }
    }
  });

  recognition.addEventListener("audiostart", () => {
    changeStateMessage("음성 감지!");
  });

  recognition.addEventListener("soundstart", () => {
    changeStateMessage("음성 인식중...");
    cancelId = setTimeout(() => {
      changeStateMessage("");
      failureCallback();
      console.log("음성인식 강제 취소 타이머");
      recognition.stop();
    }, 5000);
  });

  recognition.addEventListener("error", () => {
    changeStateMessage("음성 인식 오류!!");
    failureCallback();
  });

  recognition.addEventListener("nomatch", () => {
    changeStateMessage("매칭된 결과 없음");
    failureCallback();
  });

  return {
    start() {
      if (isRun) {
        return;
      }
      // 인식 시작
      recognition.start();
      changeStateMessage("");
    },
    stop() {
      if (!isRun) {
        return;
      }
      isRun = false;
      // 인식 종료
      recognition.stop();
    },
  };
};
