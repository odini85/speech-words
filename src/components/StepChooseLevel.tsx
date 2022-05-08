import React from "react";

type Props = {
  onSelectLevel: (level: number) => void;
};
const StepChooseLevel: React.FC<Props> = ({ onSelectLevel }) => {
  return (
    <div className="step-choose">
      <h1>단계를 선택하세요</h1>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              onSelectLevel(1);
            }}
          >
            1단계
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              onSelectLevel(2);
            }}
          >
            2단계
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              onSelectLevel(1);
            }}
          >
            3단계
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StepChooseLevel;
