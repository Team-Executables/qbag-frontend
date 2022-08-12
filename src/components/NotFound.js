import React from 'react';
import { Link } from 'react-router-dom';
import Copyright from './copyright'
import { useRecoilValue } from "recoil";
import { multilingual } from "../atoms";

//IMAGE
import four0four from '../images/404.svg';

//MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import green from '@mui/material/colors/green';


const NotFound = () => {

    const multi = useRecoilValue(multilingual);


    return (
        <div>
            <Paper sx={{
                backgroundColor: green[50],
                minHeight: '93vh',
            }}>
                <Box pt={16}>
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center">

                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img src={four0four} alt="404 page" width="90%" height="200" />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <br />
                            <Typography variant="h3" gutterBottom>
                                {multi.pageNotFound}
                            </Typography>
                            <br />
                            <Link to="/" style={{ textDecoration: 'none' }} color="inherit">
                                <Button variant="contained" color="primary"> {multi.backToHome} </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}

export default NotFound;