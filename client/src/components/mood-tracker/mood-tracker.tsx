import { useCallback, useContext, useEffect } from "react";
import { Card } from "../../ui/mood-card";
import { MoodContext } from "../../app-context";

//@ts-ignore
import axios from "../../utils/axios";

export const MoodTracker = () => {
  const { step } = useContext(MoodContext);
  
  useEffect(() => {
    axios.get('/')
  }, []);

  const renderCard = useCallback((i: number) => {
    switch (i) {
      case 1:
        return <Card title={"how do you feel today?"} type="card" />;
      case 2:
        return <Card title={"add some extra conditions"} type="conditions" />;
      case 3:
        return <Card title={"preview settings"} type="preview" />;
      case 4:
        return <Card title={"loading state"} type={"loader"} />;
      case 5:
        return <Card title={"last 7 days mood"} type={"total"} />;
    }
  }, []);

  const view = renderCard(step);

  return (
    <div className="flex flex-col text gap-2 mt-2 w-full max-w-[420px] rounded-[15px] mood">
      {view}
    </div>
  );
};
