import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { multilingual } from "../atoms";
import LanguageDialog from './languageDialog';

//Images
import study from '../images/home/study.jpg'
import crowdSource from '../images/home/crowdSource.svg'
import checks from '../images/home/checks.svg'
import folder from '../images/home/folder.svg'
import xport from '../images/home/xport.svg'
import exam from '../images/home/exam.svg'

//MUI
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    con1: {
        textAlign: "center",
    },
    con2: {
        textAlign: 'center',
    },
    con4: {
        paddingLeft: "24px",
        paddingRight: "24px",
        textAlign: 'left',
        width: '100%',
    },
});



const Home = () => {

    const classes = useStyles();

    const dir = useMediaQuery('(min-width:960px)') ? 'row' : 'column-reverse'
    const height = useMediaQuery('(min-width:960px)') ? 400 : 200

    const multi = useRecoilValue(multilingual);


    //Language Modal
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("English");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() => {
        handleClickOpen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const infoarray = [
        {
            'id': 1,
            'head': multi.homeBanner1,
            'title': multi['homeBanner1.2'],
            'logo': crowdSource,
            'body': multi['homeBanner1.3']
        },
        {
            'id': 2,
            'head': multi.homeBanner2,
            'title': multi['homeBanner2.2'],
            'logo': checks,
            'body': multi['homeBanner2.3'],
        },
        {
            'id': 3,
            'head': multi.homeBanner3,
            'title': multi['homeBanner3.2'],
            'logo': xport,
            'body': multi['homeBanner3.3'],
        },
        {
            'id': 4,
            'head': multi.homeBanner4,
            'title': multi['homeBanner4.2'],
            'logo': folder,
            'body': multi['homeBanner4.3'],
        }
    ]

    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <Box mt={6} mb={4} pt={3} pb={3} style={{ backgroundColor: "#e8f5e9", borderRadius: "20px" }}>
                    <Box justifyContent="center" mb={2}>
                        <Box sx={{ fontSize: 'h4.fontSize', fontWeight: 'regular' }}>
                            {multi.qbag}
                        </Box>
                    </Box>
                    <img src={exam} alt="banner" style={{ height: 230, width: 300 }} />
                    <Box mt={2}>
                        <Typography variant='body1' sx={{ mx: 4 }}>
                            {multi.qbagDescp1}
                        </Typography>
                    </Box>
                    <Box mt={5} fontSize="h6.fontSize" fontWeight={400} fontFamily="Monospace">
                        <Link href="https://github.com/Team-Executables" color="inherit" target="_blank" rel="noopener" underline="hover">{multi.qbagDescp2}</Link>
                        {/* <Link href="https://github.com/heyanurag" color="inherit" target="_blank" rel="noopener" underline="hover">Anurag Singh</Link>, {" "} 
                        <Link href="https://github.com/VirajPatidar" color="inherit" target="_blank" rel="noopener" underline="hover">Viraj Patidar</Link>, {" "}
                        <Link href="https://github.com/namanshah01" color="inherit" target="_blank" rel="noopener" underline="hover">Naman Shah</Link>, {" "}
                        <Link href="https://github.com/atharvadpatil" color="inherit" target="_blank" rel="noopener" underline="hover">Atharva Patil</Link> {" and "}
                        <Link href="https://github.com/thadaniumang" color="inherit" target="_blank" rel="noopener" underline="hover">Umang Thadani</Link> */}
                    </Box>
                    <Box mt={3}>
                        <Link href="https://github.com/Team-Executables/qbag-frontend" color="inherit" target="_blank" rel="noopener" underline="hover">
                            <Button
                                variant="outlined"
                                display="inline"
                                color="inherit"
                                startIcon={<GitHubIcon />}
                            >
                                Source Code
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box p={1} mt={6}>
                {infoarray.map((info) =>
                    info.id % 2 !== 0 ?
                        (
                            <Box pt={6} pb={6} style={{ backgroundColor: "#ffd54f" }} key={info.id}>
                                <Grid container alignItems="center">
                                    <Grid item sm={12} md={6} style={{ paddingLeft: "48px", paddingRight: "48px" }}>
                                        <img src={info.logo} width="100%" style={{ height: height }} alt={info.head} />
                                    </Grid>
                                    <Grid item sm={12} md={6} className={classes.con4} >
                                        <Box mt={3}>
                                            <Typography style={{ fontSize: "20px" }}>
                                                {info.head}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <Typography variant='h4' className={classes.changefontSize}>
                                                {info.title}
                                            </Typography>
                                        </Box>
                                        <Box fontSize={18} fontWeight="fontWeightLight" mt={3}>
                                            {info.body}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                        :
                        (
                            <Box pt={6} pb={6} style={{ backgroundColor: "#c8e6c9" }} key={info.id}>
                                <Grid container direction={dir} alignItems="center">
                                    <Grid item sm={12} md={6} className={classes.con4} >
                                        <Box mt={3}>
                                            <Typography style={{ fontSize: "20px" }}>
                                                {info.head}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <Typography variant='h4' className={classes.changefontSize}>
                                                {info.title}
                                            </Typography>
                                        </Box>
                                        <Box fontSize={18} fontWeight="fontWeightLight" mt={3}>
                                            {info.body}
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={6} style={{ paddingLeft: "48px", paddingRight: "48px" }}>
                                        <img src={info.logo} width="100%" style={{ height: height }} alt={info.head} />
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                )}

            </Box>
            <Box mt={12} p={1}>
                <Grid container alignItems="center">
                    <Grid item sm={12} md={6}>
                        <img src={study} width="100%" alt="study_image" />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Typography variant='h4' className={classes.changefontSize} component="div">
                            <Box pl={3} pt={4} fontWeight={350}>
                                {multi.qbagDescp3}
                            </Box>
                        </Typography>
                        <Typography variant='body1' component="div">
                            <Box pl={3} pt={3} fontWeight={350}>
                                {multi.qbagDescp4}
                            </Box>
                        </Typography>
                        <Box pl={3} pt={3}>
                            <Button pl={3} pt={3} variant="outlined" color="primary" href="/register">{multi.register}</Button>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box mt={6} mb={6} p={1}>
                <Grid container justify="center">
                    <Grid item style={{ display: "flex", paddingBottom: "10px" }}>
                        <Box pr={3} pt={4}>
                            <Typography>
                                {multi.footer}
                            </Typography>
                        </Box>
                        <Box pt={4} pr={2}>
                            <FacebookIcon onClick={() => window.location.href = 'https://www.facebook.com/'} />
                        </Box>
                        <Box pt={4} pr={2}>
                            <InstagramIcon onClick={() => window.location.href = 'https://www.instagram.com/'} />
                        </Box>
                        <Box pt={4} pr={2}>
                            <TwitterIcon onClick={() => window.location.href = 'https://twitter.com/'} />
                        </Box>
                        <Box pt={4} pr={2}>
                            <YouTubeIcon onClick={() => window.location.href = 'https://www.youtube.com/'} />
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
            </Box>
            <LanguageDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </Container >
    );
}

export default Home;