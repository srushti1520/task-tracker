// SearchBox.tsx
import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks..."
      className="border px-3 py-2 rounded w-full focus:ring focus:ring-blue-300"
    />
  );
};

export default SearchBox;
