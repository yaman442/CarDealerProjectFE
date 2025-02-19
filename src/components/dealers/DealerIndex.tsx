import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dealer from "../../types/Dealer";

const paginationModel = { page: 0, pageSize: 25 };

const DealerIndex = () => {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {
            field: 'dealerId',
            headerName: "ID",
            minWidth: 70,
            flex: 1
        },
        {
            field: 'dealerName',
            headerName: "Dealer Name",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'actions',
            headerName: "Actions",
            minWidth: 120,
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => navigate("/update-dealer/" + params.row.dealerId, { state: params.row })}
                        color="primary"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDelete(params.row)}
                        color="error"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Stack>
            )
        }
    ];

    const getAllDealers = async () => {
        const request = await axios.get("http://localhost:8080/api/dealers/all");
        return request.data;
    };

    const deleteDealerById = async (id: number) => {
        const request = await axios.delete(`http://localhost:8080/api/dealers/delete/${id}`);
        return request.status;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteDealerById,
        onSuccess: () => {
            queryClient.invalidateQueries();
            setDeleteDialog(false);
        }
    });

    const handleDelete = (dealer: Dealer) => {
        console.log("Selected Dealer:", dealer);
        setSelectedDealer(dealer);
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedDealer) {
            deleteMutation.mutate(selectedDealer.dealerId);
        }
    };

    const { data, error, isLoading } = useQuery<Dealer[], Error>({
        queryKey: ['dealers'],
        queryFn: getAllDealers
    });

    if (isLoading) return <div>Loading dealers, please wait...</div>;

    if (error) return <div>Error loading dealers: {error.message}</div>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h2">
                Dealer Index
            </Typography>
            <Link to="/create-dealer">
                <Button variant="contained" color="primary">
                    Create New Dealer
                </Button>
            </Link>
            <Paper sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.dealerId}
                    initialState={{ pagination: { paginationModel } }}
                    sx={{ border: 0, width: '100%' }}
                />
            </Paper>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this dealer?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DealerIndex;
