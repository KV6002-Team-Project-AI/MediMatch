import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MinMaxTable(props) {

    // Min processing
    function minCheck(minVal){
        if (minVal === 1) {
            return "none";
        } else {
            return minVal;
        }
    }

    // Max processing
    function maxCheck(maxVal){
        if (maxVal === 1 ||  maxVal === 150 || maxVal === 400) {
            return "none";
        } else {
            return maxVal;
        }
    }

    // Table styling
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#9c9c9c',
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

    // Min-Max Table Creation
    function createData(name, min, max) {
        return { name, min, max };
    }

    // Creating Table Rows
    const rows = [
        createData('Age', minCheck(props.minAge), maxCheck(props.maxAge)),
        createData('Weight (kg)', minCheck(props.minWeight),  maxCheck(props.maxWeight)),
        createData('Height (cm)', minCheck(props.minHeight), maxCheck(props.maxHeight))
    ];

  return (
    <>
        {/* MIN MAX TABLE */}
        <TableContainer component={Paper}>
            <Table sx={{  }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><p className='font-semibold'>Attributes</p></StyledTableCell>
                        <StyledTableCell align="right"><p className='font-semibold'>Min</p></StyledTableCell>
                        <StyledTableCell align="right"><p className='font-semibold'>Max</p></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow 
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell  component="th" scope="row">
                            <p className='font-semibold'>{row.name}</p>
                        </StyledTableCell >
                        <StyledTableCell  align="right">{row.min}</StyledTableCell >
                        <StyledTableCell  align="right">{row.max}</StyledTableCell >
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}

export default MinMaxTable;
