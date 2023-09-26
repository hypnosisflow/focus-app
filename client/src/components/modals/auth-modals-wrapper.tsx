import { useState } from "react";
import { LoginModal } from "./login-modal";
import { RegisterModal } from "./register-modal";

import closeIcon from "../../assets/close.svg";

interface IAuthModalsWrapper {
  modalToggle: () => void;
}

export const AuthModalsWrapper = ({ modalToggle }: IAuthModalsWrapper) => {
  const [activeScreen, setActiveScreen] = useState("login");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute bg-black/30 ">
      <div className="flex relative flex-col p-8 rounded-[15px] max-w-[420px] w-full bg-white">
        <button onClick={modalToggle}>
          <img
            src={closeIcon}
            alt="modal-close-icon"
            className="h-[32px] absolute right-0 top-0 m-4"
          />
        </button>

        {activeScreen === "login" && (
          <LoginModal screenToggle={() => setActiveScreen("register")} />
        )}
        {activeScreen === "register" && (
          <RegisterModal screenToggle={() => setActiveScreen("login")} />
        )}
      </div>
    </div>
  );
};
