import React from "react";

import LottieConfetti from "@/components/lottie/LottieConfetti";
import LottieTryAgain from "@/components/lottie/LottieTryAgain";
import { LOTTIE_TYPE } from "@/constant";
import { ValueOf } from "@/types";

type Props = {
  type: ValueOf<typeof LOTTIE_TYPE>;
};

const ResultLottieAnimation: React.FC<Props> = ({ type }) => {
  if (type === LOTTIE_TYPE.SUCCESS) {
    return <LottieConfetti />;
  }
  if (type === LOTTIE_TYPE.FAILURE) {
    return <LottieTryAgain />;
  }

  return null;
};

export default ResultLottieAnimation;
