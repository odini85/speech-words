import { useLottie } from "lottie-react";
import React from "react";

import tryAgain from "@/assets/lottie/try-again.json";

const LottieTryAgain: React.FC = () => {
  const { View } = useLottie({
    animationData: tryAgain,
    loop: true,
    autoplay: true,
  });

  return <div className="lottie-layer">{View}</div>;
};

export default LottieTryAgain;
