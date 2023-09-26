import { useEffect, useState, useContext } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import { Button } from "../../../ui/button";
import { MoodContext } from "../../../app-context";
import { History } from "../../history/history";
import { getPopularEmojis } from "../../../helpers/emojis";
import "chart.js/auto";

export const Total = () => {
  const { moodList, onNextStep, history } = useContext(MoodContext);

  const [activeTab, setActiveTab] = useState("graph");

  const [xLabels, setXLabels] = useState<number[]>([]);
  const [yLabels] = useState<string[]>(["", "🙁", "😐", "🙂", "😄", "🤗"]);

  useEffect(() => {
    setXLabels([1, 2, 3, 4, 5, 6, 7]);
  }, []);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "mood flow",
        data: moodList,
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(250,174,50,1)");
          gradient.addColorStop(1, "rgba(250,174,50,0)");
          return gradient;
        },
        borderColor: "rgba(255, 255, 255,1)",
        color: "white",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        rtl: true,
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          padding: 10,
          color: "#FFF",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value: number) {
            return xLabels[value];
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 5,
        labels: yLabels,
        ticks: {
          stepSize: 1,
          callback: function (value: number) {
            return yLabels[value];
          },
        },
      },
    },
  };

  const popularEmojis = getPopularEmojis(history);

  const donData = {
    labels: Array.from(popularEmojis.emojisUnique),
    datasets: [
      {
        label: "times used",
        data: popularEmojis.emojisStatsValue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const Graph = () => {
    return (
      <div className="flex flex-col mt-8 ">
        <span className="text-xl">overall scale:</span>

        <div className="mt-2 mx-2  h-[250px] text-black  bg-slate-50/50 outline-none rounded-[15px] p-2 resize-none ">
          <Line
            className=" text-black"
            data={data}
            // @ts-ignore
            options={options}
          />
        </div>
        <span className="mt-8 text-xl">
          mose used emojis:{" "}
        </span>
        <Doughnut
          data={donData}
          className="mx-2 mt-2 p-2 rounded-[15px] bg-slate-50/50 text-2xl"
        />
      </div>
    );
  };

  return (
    <div className="w-full h-full mt-4">
      <div className="flex gap-2 mb-2">
        <Button
          handler={() => setActiveTab("graph")}
          classes="w-full "
          bgColor="bg-slate-50"
          textValue="graph"
          textColor="text-slate-400"
        />
        <Button
          handler={() => setActiveTab("history")}
          classes="w-full "
          bgColor="bg-slate-50"
          textValue="history"
          textColor="text-slate-400"
        />
      </div>

      {activeTab === "graph" && <Graph />}
      {activeTab === "history" && <History history={history} />}

      <div className="mt-8 w-full justify-center flex">
        <Button
          handler={() => onNextStep()}
          textValue="repeat"
          w={"fit"}
          classes="w-full text-slate-400 lowercase "
          bgColor="bg-slate-50"
          textColor="text-slate-400"
        />
      </div>
    </div>
  );
};
