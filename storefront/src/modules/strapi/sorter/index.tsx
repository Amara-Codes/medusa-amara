"use client";

import { Select } from "@medusajs/ui";

type SorterProps = {
  onSortChange: (value: "asc" | "desc") => void;
};

export function Sorter({ onSortChange }: SorterProps) {
  const options = [
    {
      value: "desc",
      label: "Newest first",
    },
    {
      value: "asc",
      label: "Oldest first",
    },
  ];

  return (
    <div className="w-[200px] mb-8">
      <Select onValueChange={(value) => onSortChange(value as "asc" | "desc")}>
        <Select.Trigger className="focus:ring-2 focus:ring-koiOrange focus:shadow-koiRed">
          <Select.Value placeholder="Select sorting" />
        </Select.Trigger>
        <Select.Content className="bg-koiBlack text-koiWhite border-1 border-koiWhite">
          {options.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              className=" hover:text-koiOrange text-koiWhite !bg-koiBlack"
            >
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}