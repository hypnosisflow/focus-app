import { Button } from "../../ui/button";

interface ILoginModal {
  screenToggle: () => void;
}

export const LoginModal = ({ screenToggle }: ILoginModal) => {
  return (
    <>
      <span className="text-4xl mb-8">sign in</span>
      <label htmlFor="email" className=" text-sm text-left text-pink-500">
        email
      </label>
      <input
        type="text"
        placeholder="your email"
        name="email"
        className=" h-[42px] border-slate-200 border px-4 rounded-[15px]"
      />
      <label
        htmlFor="password"
        className="mt-4 text-sm text-left text-pink-500"
      >
        password
      </label>
      <input
        type="text"
        placeholder="your password"
        className=" mb-8 h-[42px] border-slate-200 border px-4 rounded-[15px]"
      />
      <Button
        handler={() => console.log("login logic")}
        textValue="sign in"
        bgColor="btn-auth"
        textColor="text-slate-700"
        classes="max-w-[160px] self-center"
      />

      <div className="flex flex-row  justify-center items-center mt-16 gap-2">
        <span className="text-left text-sm text-pink-500">
          dont have an account?
        </span>
        <Button
          handler={screenToggle}
          textValue="sign up"
          bgColor="bg-pink-500"
          textColor="text-slate-50"
          classes="max-w-[160px] fond-bold "
        />
      </div>
    </>
  );
};
