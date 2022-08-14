import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useRecoilValue } from "recoil";
import { multilingual } from "../../atoms";

const Match = (props) => {

    const multi = useRecoilValue(multilingual);


    const data = props.data;
    let keys = []
    let values = []

    data.forEach(pair => {
        keys.push(pair.key)
        values.push(pair.value)
    })

    const shuffledValues = [...values].sort((a, b) => 0.5 - Math.random());

    console.log(keys);
    console.log(shuffledValues);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#1b5e20",
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

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ my: 1 }}>
                <TableHead>
                    <StyledTableRow >
                        <StyledTableCell>{multi.columnA}</StyledTableCell>
                        <StyledTableCell>{multi.answers}</StyledTableCell>
                        <StyledTableCell>{multi.columnB}</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key, i) => (
                        <StyledTableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" scope="row">{key}</TableCell>
                            <TableCell component="th" scope="row">{values[i]}</TableCell>
                            <TableCell component="th" scope="row">{shuffledValues[i]}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Match;