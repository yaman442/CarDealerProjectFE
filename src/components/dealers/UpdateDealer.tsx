import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Dealer from "../../types/Dealer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

const UpdateDealer = () => {
    const dealer = useLocation().state;
    const { dealerId, dealerName } = dealer;

    const validationSchema = yup.object({
        dealerName: yup.string()
            .min(2, "The dealer name must be at least 2 characters long")
            .max(50, "The dealer name must not exceed 50 characters")
            .required("Dealer name is required")
    });

    const queryClient = new QueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: Dealer) => {
            const request = await axios.put(`http://localhost:8080/api/dealers/update/${dealerId}`, data);
            return request.data;
        },
        onSuccess: () => {
            alert("Dealer has been successfully updated");
            queryClient.invalidateQueries();
            navigate("/dealer-index");
        },
        onError: error => {
            alert("Something went wrong: " + error.message);
        }
    });

    const formik = useFormik({
        initialValues: {
            dealerId: dealerId,
            dealerName: dealerName
        },
        validationSchema,
        onSubmit: data => mutate(data)
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update Dealer
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Dealer Name"
                    id="dealerName"
                    name="dealerName"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={formik.values.dealerName}
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.dealerName && Boolean(formik.errors.dealerName)}
                    helperText={formik.touched.dealerName && formik.errors.dealerName}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default UpdateDealer;
