import Button from "@/components/Button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full p-4">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl">Pagamentos</h5>
        <Button>
          <Link href="/payments/create">Criar</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
