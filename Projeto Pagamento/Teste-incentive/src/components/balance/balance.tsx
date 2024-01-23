import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Button, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export interface Balance {
  id: string;
  nome: string;
  descricao: string;
  valorInicial: number;
}

export default function Balance() {
  const [data, setData] = useState<Balance[]>([]);
  const navigate = useNavigate();

  const token = Cookies.get("authToken");

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
        console.log(error);
      }
    };

    fetchData();
  }, [token]);
  const handleNavigateNewBalance = () => {
    navigate("/balance/create");
  };

  const handleUpdate = async (id: string) => {
    navigate(`/balance/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/balance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.statusText);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    {
      field: "valorInicial",
      headerName: "Valor Inicial",
      type: "number",
      width: 150,
    },
    {
      field: "valorRestante",
      headerName: "Valor Restante",
      type: "number",
      width: 150,
    },
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
        <Typography>Saldos</Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={handleNavigateNewBalance}
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
