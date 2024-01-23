import { Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

interface FormData {
  id: string;
  nome: string;
  descricao: string;
  valorInicial: number;
}

export default function UpdateBalance() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [updateBalance, setUpdateBalance] = useState<FormData>({
    id: "",
    nome: "",
    descricao: "",
    valorInicial: 0,
  });

  if (!id) {
    throw new Error("id nao definido");
  }

  const token = Cookies.get("authToken");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateBalance({ ...updateBalance, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const responseBalance = await api.get<{ balance: FormData[] }>(
          "/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const paymentToUpdate = responseBalance.data.balance.find(
          (bal) => bal.id === id
        );

        if (paymentToUpdate) {
          setUpdateBalance(paymentToUpdate);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchPayment();
  }, [token, id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.patch(
        `/balance/${id}`,
        {
          nome: updateBalance.nome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pagamento atualizado com sucesso");
      Navigate("/balance");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: 1100, height: 500, marginLeft: 300, marginTop: 100 }}
    >
      <Typography>Editar pedido de pagamento</Typography>

      <TextField
        label="Nome"
        name="nome"
        value={updateBalance.nome}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição"
        name="descricao"
        value={updateBalance.descricao}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Valor"
        name="valor"
        type="number"
        value={updateBalance.valorInicial}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 180,
        }}
      >
        <Button variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </div>
    </form>
  );
}
