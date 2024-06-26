"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@store/auth";
import { patchQuestion } from "@service/api/interviewAfter";
import { loginToUse } from "@utils/alerts/auth";

const usePin = (id: number, isTrue: boolean) => {
  const router = useRouter();
  const isLogin = useRecoilValue<boolean>(isLoginState);
  const [state, setState] = useState<boolean>(isTrue);
  const [trigger, setTrigger] = useState<number>(0);
  const toggle = () => setTrigger(trigger + 1);

  useEffect(() => {}, []);

  useEffect(() => {
    setState(isTrue);
  }, [isTrue]);

  useEffect(() => {
    if (trigger !== 0) {
      if (isLogin) {
        patchQuestion(id)
          .then(res => setState(!state))
          .catch(err => console.log(err));
      } else {
        loginToUse(() => router.push("/login"));
      }
    }
  }, [trigger]);

  return { state, toggle };
};

export default usePin;
