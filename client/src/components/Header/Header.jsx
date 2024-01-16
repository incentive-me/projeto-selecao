import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <header className="h-14 w-full bg-[#424242] flex items-center justify-between">
      <h1 className="font-alata text-white ml-4 text-3xl">Payments</h1>
      <Avatar className="mr-4">f</Avatar>
    </header>
  );
};

export default Header;
