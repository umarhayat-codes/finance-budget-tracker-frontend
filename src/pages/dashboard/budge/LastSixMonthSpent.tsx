import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useBudgeHook } from "./useBudgeHook";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import { RadarTooltipProps } from "../../../../types";

const CustomTooltip = ({ active, payload }: RadarTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-budgeBorder min-w-[120px]">
        <p className="font-satoshi font-bold text-[6px] text-transactionSub uppercase">
          {data.fullMonth} {data.year}
        </p>
        <p className="font-satoshi font-bold text-[8px] text-budgeText">
          {data.spent}% spent in this month
        </p>
      </div>
    );
  }
  return null;
};

const LastSixMonthSpent: React.FC = () => {
  const { radarData, isFirstHalf, toggleSixMonths } = useBudgeHook();

  return (
    <div className="bg-budgeBg border-[0.81px] border-budgeBorder rounded-[9px] p-4 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-satoshi font-bold text-[12px] text-budgeText">
            {isFirstHalf ? "First 6 Months" : "Last 6 Months"}
          </h2>
          <div className="flex flex-col -space-y-1">
            <button
              onClick={() => toggleSixMonths("up")}
              className={`p-0.5 rounded hover:bg-gray-200 transition-colors ${
                isFirstHalf ? "text-budgeText" : "text-transactionSub"
              }`}
            >
              <LuChevronUp size={10} />
            </button>
            <button
              onClick={() => toggleSixMonths("down")}
              className={`p-0.5 rounded hover:bg-gray-200 transition-colors ${
                !isFirstHalf ? "text-budgeText" : "text-transactionSub"
              }`}
            >
              <LuChevronDown size={10} />
            </button>
          </div>
        </div>
        <button className="p-2 bg-white rounded-lg border border-budgeBorder hover:bg-gray-50 transition-colors shadow-sm">
          <FiMoreVertical className="text-budgeText" size={16} />
        </button>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        {radarData.length > 0 && radarData.some((d) => d.totalSpent > 0) ? (
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#EBEBEB" strokeWidth={1} />
              <PolarAngleAxis
                dataKey="month"
                tick={{
                  fill: "#727272",
                  fontSize: 9,
                  fontWeight: "bold",
                  fontFamily: "Satoshi",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Spent"
                dataKey="spent"
                stroke="#588D73"
                fill="#588D73"
                fillOpacity={0.5}
                dot={{ r: 2, fill: "#588D73" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-satoshi font-bold text-[14px] text-budgeText">
              budget spend is not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LastSixMonthSpent;
