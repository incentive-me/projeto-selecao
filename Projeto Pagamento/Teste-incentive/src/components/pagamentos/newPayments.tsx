import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import Cookies from "js-cookie";
import { Balance } from "../balance/balance";
import { useNavigate } from "react-router-dom";

interface FormData {
  nome: string;
  descricao: string;
  valor: number;
  saldosId: string;
}

export default function NewPayment() {
  const [data, setData] = useState<Balance[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    valor: 0,
    saldosId: "",
  });
  const Navigate = useNavigate();

  const token = Cookies.get("authToken");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: ChangeEvent<{ value: string }>) => {
    setFormData({ ...formData, saldosId: event.target.value as string });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.balance);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post(
        "/payment",
        {
          nome: formData.nome,
          descricao: formData.descricao,
          valor: Number(formData.valor),
          saldos_Id: formData.saldosId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pagamento cadastro com sucesso");
      Navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: 1100, height: 500, marginLeft: 300, marginTop: 100 }}
    >
      <Typography>Criar pedido de pagamento</Typography>

      <TextField
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Valor"
        name="valor"
        type="number"
        value={formData.valor}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Saldo</InputLabel>
        <Select value={formData.saldosId} onChange={handleSelectChange}>
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
        <Button type="submit" variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
