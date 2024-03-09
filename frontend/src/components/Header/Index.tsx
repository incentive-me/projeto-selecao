import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#424242] p-2 h-[64px]">
      <div className="flex justify-between items-center">
        <h5 className="text-white text-xl">Payments</h5>
        <PersonIcon />
      </div>
    </header>
  );
};

export default Header;
