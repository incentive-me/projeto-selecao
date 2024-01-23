import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Button, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export interface Payment {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  saldos_Id: string;
}

export default function Payment() {
  const [data, setData] = useState<Payment[]>([]);
  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/payment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.payments);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/payment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Empresa Excluida com sucesso");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateNewPayment = () => {
    navigate("/payment/create");
  };

  const handleUpdate = async (id: string) => {
    navigate(`/payment/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "valor", headerName: "Valor", type: "number", width: 150 },
    { field: "saldos_Id", headerName: "Saldo ID", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleUpdate(params.row.id)}
            size="small"
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            size="small"
            color="error"
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: 1100, marginLeft: 300, marginTop: 100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Typography>Pagamentos</Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={handleNavigateNewPayment}
        >
          Criar
        </Button>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
