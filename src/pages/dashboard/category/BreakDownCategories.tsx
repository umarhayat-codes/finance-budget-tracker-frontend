import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryBreakdownItem, IconType } from "../../../../types";

const BreakDownCategories: React.FC = () => {
  const MoreIcon = FiMoreVertical as IconType;

  const data: CategoryBreakdownItem[] = [
    {
      id: "1",
      label: "Needs (Wsnts",
      subLabel: "(Royts Lopttrs)",
      percentage: "15%",
      color: "#8FAB33",
      value: 62,
    },
    {
      id: "2",
      label: "Doa ranusuot cia an Dnims",
      color: "#ABC656",
      value: 12,
    },
    {
      id: "3",
      label: "Aoger Hi Dreoord Btons",
      color: "#5B7511", // Darker green
      value: 18,
    },
    {
      id: "4",
      label: "Lregortd the son Eitian",
      color: "#ABC656",
      value: 8,
    },
    {
      id: "5",
      label: "Neep Sciing)",
      color: "#8FAB33",
      value: 8,
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-[10px] border border-categorySidebarBorder bg-categorySidebarBg p-6 h-full shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-inter font-bold text-[15px] text-categoryTitleSidebar">
          Category Breakdown
        </h2>
        <button className="text-categoryTextMuted p-1 hover:bg-gray-100 rounded-full">
          <MoreIcon />
        </button>
      </div>

      {/* Donut Chart */}
      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col gap-4">
        {/* Top Legend Item (Special) */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center text-xs text-categoryTextSecondary">
              🎒
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-light text-[9px] text-categoryLegendWeak">
                {data[0].label}
              </span>
              <span className="font-inter font-light text-[9px] text-categoryLegendSub">
                {data[0].subLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center text-xs text-categoryTextSecondary">
              💸
            </div>
            <span className="font-inter font-light text-[9px] text-categoryLegendWeak">
              {data[0].percentage})
            </span>
          </div>
        </div>

        {/* Regular List */}
        <div className="flex flex-col gap-3 mt-2">
          {data.slice(1).map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-inter font-normal text-[11px] text-categoryLegendMain">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakDownCategories;
