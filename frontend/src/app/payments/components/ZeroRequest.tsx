import Button from "@/components/Button";

const ZeroRequest = () => {
  return (
    <div className="max-w-xs mt-[20%] h-fit flex  items-center flex-col">
      <div className="text-base">Você não possui pedidos abertos.</div>
      <Button className="rounded-full">Criar Pedido</Button>
    </div>
  );
};

export default ZeroRequest;
