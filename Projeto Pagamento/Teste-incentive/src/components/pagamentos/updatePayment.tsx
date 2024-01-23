import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import Cookies from "js-cookie";
import { Balance } from "../balance/balance";
import { useNavigate, useParams } from "react-router-dom";

interface FormData {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  saldosId: string;
}

export default function UpdatePayment() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Balance[]>([]);
  const [updatePayment, setUpdatePayment] = useState<FormData>({
    id: "",
    nome: "",
    descricao: "",
    valor: 0,
    saldosId: "",
  });

  if (!id) {
    throw new Error("id nao definido");
  }

  const token = Cookies.get("authToken");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePayment({ ...updatePayment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBalance = await api.get("/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(responseBalance.data.balance);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const responsePayments = await api.get<{ payments: FormData[] }>(
          "/payment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const paymentToUpdate = responsePayments.data.payments.find(
          (pay) => pay.id === id
        );

        if (paymentToUpdate) {
          setUpdatePayment(paymentToUpdate);
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
        `/payment/${id}`,
        {
          nome: updatePayment.nome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pagamento atualizado com sucesso");
      Navigate("/payment");
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
        value={updatePayment.nome}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição"
        name="descricao"
        value={updatePayment.descricao}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Valor"
        name="valor"
        type="number"
        value={updatePayment.valor}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Saldo</InputLabel>
        <Select value={updatePayment.saldosId} disabled>
          {data.map((saldo) => (
            <MenuItem key={saldo.id} value={saldo.id}>
              {saldo.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
