import { ReactNode, useCallback, useState } from "react";
import { Signature } from "./components/signature/signature";
import { Navbar } from "./components/navbar/navbar";
import { MoodTracker } from "./components/mood-tracker/mood-tracker";
import { AuthModalsWrapper } from "./components/modals/auth-modals-wrapper";

import { MoodWrapper } from "./app-context";
import "./App.css";

interface IView {
  child: ReactNode;
}

const App = () => {
  // const [activeTab, setActiveTab] = useState("treker");
  const [activeTheme, setActiveTheme] = useState("trytest");
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const handleThemeToggle = () => {
    if (activeTheme === "white") setActiveTheme("trytest");
    if (activeTheme === "trytest") setActiveTheme("white");
  };

  const handleAuthModalToggle = () => {
    return setModalIsOpened((prev) => !prev);
  };

  // const renderApp = useCallback((app: string) => {
  //   switch (app) {
  //     case "mood":
  //       return (
  //         <MoodWrapper>
  //           <MoodTracker />
  //         </MoodWrapper>
  //       );
  //     case "notes":
  //       return <Notes />;
  //     case "treker":
  //       return <Treker />;
  //   }
  // }, []);

  // const View = () => {
  //   const view = renderApp(activeTab);

  //   return (
  //     <section className=" h-full w-full mt-8 rounded-md flex justify-center">
  //       {view}
  //     </section>
  //   );
  // };

  const renderApp = useCallback(() => {
    return (
      <>
        <MoodWrapper>
          <MoodTracker />
        </MoodWrapper>
        {/* <Notes />
        <Treker />; */}
      </>
    );
  }, []);

  const view = renderApp();

  const View = ({ child }: IView) => {
    return (
      <section className=" h-full w-full mt-8 rounded-md flex justify-center">
        {child}
      </section>
    );
  };

  // const Tabs = () => {
  //   const values = ["mood", "notes", "treker"];

  //   return (
  //     <div className="gap-4 px-1 flex w-full max-w-[400px] justify-evenly ">
  //       {values.map((item, index) => {
  //         return (
  //           <a
  //             key={index}
  //             onClick={() => setActiveTab(item)}
  //             className={`cursor-pointer text-xl font-thin ${
  //               item === activeTab ? "text-slate-900 " : "text-slate-300/50"
  //             }`}
  //           >
  //             {item}
  //           </a>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div
      className={`h-auto w-full max-w-[1240px] ${activeTheme} flex  flex-col items-center justify-between`}
    >
      <Navbar
        themeToggle={handleThemeToggle}
        modalToggle={handleAuthModalToggle}
      />
      {/* <Tabs /> */}
      <View child={view} />

      {modalIsOpened && (
        <AuthModalsWrapper modalToggle={handleAuthModalToggle} />
      )}

      {/* <Words /> */}
      <Signature />
    </div>
  );
};

export default App;
