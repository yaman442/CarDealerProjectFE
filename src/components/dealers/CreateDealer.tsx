
import { TextField, Button } from "@mui/material";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import Dealer from "../../types/Dealer";


export default function CreateDealer() {

    const validationRules = yup.object({
        dealerName:yup.string()
        .min(2, "The dealer name must at least 2 characters")
        .max(20, "The dealer name must not go past 20 characters")
        .required("The dealer name must be filled out")
    })

    const queryClient = new QueryClient()

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn:async (data:Dealer) => {
            const dealer:Dealer = data
            const request = await axios.post("http://localhost:8080/api/dealers/create", dealer)
            const response = await request.data
            return response
        },
        onSuccess:() => {
            alert("Dealer has been successfully added in")
            queryClient.invalidateQueries()
            navigate("/dealer-index")
        },
        onError:error => {
            alert("Something went wrong here is the message: " + error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            dealerName: ""
        },
        validationSchema: validationRules,
        onSubmit: data => mutate(data)
    })

  return (
    <>
            <form onSubmit={formik.handleSubmit}>
                <h2>
                    Create new dealer
                </h2>
                <br />
                <TextField
                label="dealerName"
                id='dealerName'
                name='dealerName'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.dealerName}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.dealerName && Boolean(formik.errors.dealerName)}
                helperText={formik.touched.dealerName && formik.errors.dealerName}
                />
                <br />
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </>
  )
}
