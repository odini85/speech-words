import { useLottie } from "lottie-react";
import React from "react";

import confetti from "@/assets/lottie/confetti.json";

const LottieConfetti: React.FC = () => {
  const { View } = useLottie({
    animationData: confetti,
    loop: true,
    autoplay: true,
  });

  return <div className="lottie-layer">{View}</div>;
};

export default LottieConfetti;
