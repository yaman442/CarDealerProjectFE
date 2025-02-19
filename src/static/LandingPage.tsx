import { Box, Container, Typography } from "@mui/material"

const LandingPage = () => {

    return(
        <>
            <Container>
                <Box maxWidth="sm">
                    <Typography variant="h1">
                        Car Dealer App
                    </Typography>
                    <Typography variant="h3">
                        Find the best cars on String st
                    </Typography>
                </Box>
                <Box>
                    <Box>
                        <Typography variant="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Totam praesentium, repellendus unde dolore, 
                            autem perspiciatis saepe neque magnam, 
                            fuga explicabo adipisci odit. 
                            Dignissimos quas cumque maxime sequi reprehenderit, laborum commodi.
                        </Typography>
                    </Box>
                    <Box>
                        <img src="https://static.toiimg.com/photo/80387978.cms" alt="a happy little car" />
                    </Box>
                </Box>
            </Container>
        </>
    )

}

export default LandingPage