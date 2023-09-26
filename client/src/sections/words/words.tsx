import { useState } from "react";
// import { Button } from "../../ui/button";

// import { fetchDeepl } from "../../helpers/api";

// const DEEPL_API_KEY = "279a2e9d-83b3-c416-7e2d-f721593e42a0:fx";

export const Words = () => {
  const [searchWord, setSearchWord] = useState("");

  // const formData = {
  //   auth_key: DEEPL_API_KEY,
  //   source_lang: "EN",
  //   target_lang: "DE",
  //   text: searchWord,
  // };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // fetchDeepl();
  };

  return (
    <div className=" h-full max-w-[400px] w-full ">
      <span>Words</span>
      <form
        onSubmit={(e) => submit(e)}
        action="POST"
        className="border shadow-sm border-slatel-100 rounded-full mt-8 p-2 flex flex-col  justify-center items-center"
      >
        <input
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
          className="bg-black/10 px-4 rounded-full h-[36px] mt-4"
        />
        <input
          //   onSubmit={(e) => submit(e)}
          type="submit"
          value={"search"}
          //   textValue="search"
          //   classes="lowercase mb-4    w-full mt-2"
          //   textColor="text-indigo-500/50"
        />
      </form>
    </div>
  );
};
