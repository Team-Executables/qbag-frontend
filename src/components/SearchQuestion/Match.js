import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Match = (props) => {

    const data = props.data;
    let keys = []
    let values = []

    data.forEach(pair => {
        keys.push(pair.key)
        values.push(pair.value)
    })
    
    const shuffledValues = values.sort((a, b) => 0.5 - Math.random());

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, my: 1 }}>
                <TableHead>
                <TableRow>
                    <TableCell>Column A</TableCell>
                    <TableCell>Column B</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key, i) => (
                        <TableRow key={data[i].id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" scope="row">{key}</TableCell>
                            <TableCell component="th" scope="row">{shuffledValues[i]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
 
export default Match;