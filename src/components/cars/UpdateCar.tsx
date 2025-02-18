import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Car from '../../types/Car'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const UpdateCar = () => {
    const car = useLocation().state
    const {id,brand, model, color, year, regNumber, imageUrl, price} = car
    const validationRules = yup.object({
        brand:yup.string()
        .min(2, "The car brand name must at least 2 characters")
        .max(20, "The car brand name must not go past 20 characters")
        .required("The brand name must be filled out"),
        model:yup.string()
        .min(2, "The car model name must be atleast 2 characters")
        .max(30, "The car model name must be shorter then 31 character")
        .required(),
        color:yup.string()
        .min(3, "Please put in an actually color")
        .required(),
        year: yup.number()
        .min(1908, "No cars was invented before 1908")
        .max((new Date().getFullYear() + 1), "Bad time traveller")
        .required(),
        regNumber:yup.string()
        .required(),
        imageUrl:yup.string()
        .min(17, "The imageurl has to come from a real website")
        .required(),
        price: yup.number()
        .min(1500, "Sorry we can't take any car valued less then $1500")
        .required()
    })

    const queryClient = new QueryClient()

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn:async (data:Car) => {
            const car:Car = data
            const request = await axios.put("http://localhost:8080/api/cars/" + id, car)
            const response = await request.data
            return response
        },
        onSuccess:() => {
            alert("Car has been successfully updated")
            queryClient.invalidateQueries()
            navigate("/car-index")
        },
        onError:error => {
            alert("Something went wrong here is the message: " + error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            id:id,
            brand: brand,
            model: model,
            color: color,
            year: year,
            regNumber:regNumber,
            imageUrl: imageUrl,
            price:price
        },
        validationSchema: validationRules,
        onSubmit: data => mutate(data)
    })

    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <h2>
                    Update car
                </h2>
                <br />
                <TextField
                label="brand"
                id='brand'
                name='brand'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.brand}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                />
                <br />
                <TextField
                label="model"
                id='model'
                name='model'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.model}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                />
                <br />
                <TextField
                label="color"
                id='color'
                name='color'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.color}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                />
                <br />
                <TextField
                label="imageUrl"
                id='imageUrl'
                name='imageUrl'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.imageUrl}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />
                <br />
                <TextField
                label="price"
                id='price'
                name='price'
                type='number'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.price}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                />
                <br />
                <TextField
                label="year"
                id='year'
                name='year'
                type='number'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.year}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
                />
                <br />
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </>
    )
}

export default UpdateCar