import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Car from "../../types/Car"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const paginationModel = { page: 0, pageSize: 25}

const CarIndex = () => {
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const columns: GridColDef[] =[
        {
            field: 'id',
            headerName: "ID",
            minWidth: 70,
            flex: 1
        },
        {
            field:'brand',
            headerName: "Brand",
            minWidth: 100,
            flex:1
        },
        {
            field:'model',
            headerName: "Model",
            minWidth: 100,
            flex: 1
        },
        {
            field:'color',
            headerName: "Color",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'regNumber',
            headerName: "Register Number",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'price',
            headerName: "Price",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'actions',
            headerName: "Actions",
            minWidth:120,
            flex:1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => navigate("/update-car/"+params.row.id, {state: params.row})}
                        color="primary"
                        >
                            <Edit fontSize="small"/>
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
    ]

    const getAllCars = async () => {
        const request = await axios.get("http://localhost:8080/api/cars/all")
        const response = await request.data
        console.table(response)
        return response
    }

    const deleteCarById = async (id:number) => {
        const request = axios.delete(`http://localhost:8080/api/cars/${id}`)
        return (await request).status
    }

    const deleteMutation = useMutation({
        mutationFn:deleteCarById,
        onSuccess: () => {
            queryClient.invalidateQueries()
            setDeleteDialog(false)
        }
    })

    const handleDelete = (car:Car) => {
        setSelectedCar(car)
        setDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedCar) {
            deleteMutation.mutate(selectedCar.id)
        }
    }

    const {data, error, isLoading} = useQuery<Car[], Error>({
        queryKey: ['cars'],
        queryFn: getAllCars
    })

    if(isLoading) return <div>Grabbing the fancy cars please wait...</div>

    if(error) return <div>An error has occurred, Developers are hiding under the desk: {error.message}</div>

    return(
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">
                    Car Index
                </Typography>
                <Link to="/create-car">Create a car</Link>
                <Paper sx={{ height: 500, width: '100%',}}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        sx={{ border: 0, width: '100%'}}
                    />
                </Paper>
                <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >
                    <DialogTitle>
                        Confirm Delete
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this car?
                    </DialogContent>
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
        </>
    )

}

export default CarIndex