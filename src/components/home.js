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

const infoarray = [
    {
        'id': 1,
        'head': 'CROWDSOURCES QUESTIONS',
        'title': 'Get questions from various sources',
        'logo': crowdSource,
        'body': 'Crowdsourcing enables all the users to contribute, this helps in gathering multiple viewpoints and diversifies the archive of questions. Crowdsourcing reduces the management burden as the major work is handled by the system which frees the user from manual work'
    },
    {
        'id': 2,
        'head': 'RELIABLE QUESTIONS',
        'title': 'Verified and validated questions',
        'logo': checks,
        'body': 'Each question contributed passes through a series of automated test, which is then scrutinised by experts'
    },
    {
        'id': 3,
        'head': 'EXPORT',
        'title': 'Export the questions in the desired format',
        'logo': xport,
        'body': 'The selected questions can be converted into a question paper and can be exported into PDF, CSV or excel format'
    },
    {
        'id': 4,
        'head': 'FILTERING OPTIONS',
        'title': 'Choose from a variety of questions',
        'logo': folder,
        'body': 'Filter and choose questions based on board, class, difficulty, marks, number of questions and other parameters to get the perfect list of curated questions'
    }
]

const Home = () => {

    const classes = useStyles();

    const dir = useMediaQuery('(min-width:960px)') ? 'row' : 'column-reverse'
    const height = useMediaQuery('(min-width:960px)') ? 400 : 200

    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <Box mt={6} mb={4} pt={3} pb={3} style={{ backgroundColor: "#e8f5e9", borderRadius: "20px" }}>
                    <Box justifyContent="center" mb={2}>
                        <Box sx={{ fontSize: 'h4.fontSize', fontWeight: 'regular' }}>
                            Question Bank Generator
                        </Box>
                    </Box>
                    <img src={exam} alt="banner" style={{ height: 230, width: 300 }} />
                    <Box mt={2}>
                        <Typography variant='body1' sx={{ mx: 4 }}>
                        Question Bank Generator uses a crowd sourcing model to prepare question banks from a large pool of objective questions. QBaG provides an interface for paper setters and academicians to generate reliable question papers using our automated and robust system. The questions can be selected based on a range of parameters and can be exported to your desired format within minutes. Each question contributed is passed through a number of checks and is also vetted by experts.
                        </Typography>
                    </Box>
                    <Box mt={5} fontSize="h6.fontSize" fontWeight={400} fontFamily="Monospace">
                        This app is built by: <br /> 
                        <Link href="https://github.com/heyanurag" color="inherit" target="_blank" rel="noopener" underline="hover">Anurag Singh</Link>, {" "} 
                        <Link href="https://github.com/VirajPatidar" color="inherit" target="_blank" rel="noopener" underline="hover">Viraj Patidar</Link>, {" "}
                        <Link href="https://github.com/namanshah01" color="inherit" target="_blank" rel="noopener" underline="hover">Naman Shah</Link>, {" "}
                        <Link href="https://github.com/ishika2736" color="inherit" target="_blank" rel="noopener" underline="hover">Ishika Bhatt</Link>, {" "}
                        <Link href="https://github.com/atharvadpatil" color="inherit" target="_blank" rel="noopener" underline="hover">Atharva Patil</Link> {" and "}
                        <Link href="https://github.com/thadaniumang" color="inherit" target="_blank" rel="noopener" underline="hover">Umang Thadani</Link>
                    </Box>
                    <Box mt={3}>
                        <Link href="https://github.com/Team-Executables" color="inherit" target="_blank" rel="noopener" underline="hover">
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
                                Create your account now, and use QBaG as your paper setter assistant.
                            </Box>
                        </Typography>
                        <Typography variant='body1' component="div">
                            <Box pl={3} pt={3} fontWeight={350}>
                                To explore more features of QBaG, create an account to get started.
                            </Box>
                        </Typography>
                        <Box pl={3} pt={3}>
                            <Button pl={3} pt={3} variant="outlined" color="primary" href="/register">Sign Up</Button>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box mt={6} mb={6} p={1}>
                <Grid container justify="center">
                    <Grid item style={{ display: "flex", paddingBottom: "10px" }}>
                        <Box pr={3} pt={4}>
                            <Typography>
                                Follow us on:
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
        </Container >
    );
}

export default Home;