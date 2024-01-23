import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../lib/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface FormData {
  nome: string;
  descricao: string;
  valorInicial: number;
}

export default function NewBalance() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    valorInicial: 0,
  });
  const Navigate = useNavigate();

  const token = Cookies.get("authToken");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post(
        "/balance",
        {
          nome: formData.nome,
          descricao: formData.descricao,
          valorInicial: Number(formData.valorInicial),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Saldos cadastrado com sucesso");
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
        label="Valor inicial"
        name="valorInicial"
        type="number"
        value={formData.valorInicial}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
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
