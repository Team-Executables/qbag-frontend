import * as React from 'react';
import { useRecoilValue } from "recoil";
import { multilingual } from "../../atoms";

// MUI
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#004D40",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function StatsTable({reqEasy, reqMedium, reqHard, easy, medium, hard, a, b, c, d}) {

    const [open, setOpen] = React.useState(false);
    const multi = useRecoilValue(multilingual);

    return (
        <TableContainer component={Paper} sx={{ maxWidth: "900px", mt: 4, mb: 4 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">{multi.questions}</StyledTableCell>
                        <StyledTableCell align="center">{multi.easy}</StyledTableCell>
                        <StyledTableCell align="center">{multi.medium}</StyledTableCell>
                        <StyledTableCell align="center">{multi.hard}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="center">{multi.requested}</StyledTableCell>
                        <StyledTableCell align="center">{reqEasy}</StyledTableCell>
                        <StyledTableCell align="center">{reqMedium}</StyledTableCell>
                        <StyledTableCell align="center">{reqHard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell align="center" component="th" scope="row">
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            {multi.selected}
                        </StyledTableCell>
                        <StyledTableCell align="center">{easy}</StyledTableCell>
                        <StyledTableCell align="center">{medium}</StyledTableCell>
                        <StyledTableCell align="center">{hard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="body1" gutterBottom component="div"> Question Type Distribution</Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">{multi.mcq}</StyledTableCell>
                                                <StyledTableCell align="center">{multi.oneWord}</StyledTableCell>
                                                <StyledTableCell align="center">{multi.fillInTheBlanks}</StyledTableCell>
                                                <StyledTableCell align="center">{multi.matchTheFollowing}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" align="center">{a}</StyledTableCell>
                                                <StyledTableCell align="center">{b}</StyledTableCell>
                                                <StyledTableCell align="center">{c}</StyledTableCell>
                                                <StyledTableCell align="center">{d}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
