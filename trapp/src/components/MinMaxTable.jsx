import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Component for displaying a table with minimum and maximum values for attributes.
 * 
 * @author Syed Wajahat Quadri <w21043564>
 * @param {Object} props - Props containing minimum and maximum values for attributes.
 * @param {number} props.minAge - Minimum age value.
 * @param {number} props.maxAge - Maximum age value.
 * @param {number} props.minWeight - Minimum weight value.
 * @param {number} props.maxWeight - Maximum weight value.
 * @param {number} props.minHeight - Minimum height value.
 * @param {number} props.maxHeight - Maximum height value.
 * @returns {JSX.Element} - JSX for rendering the min-max table.
 */
function MinMaxTable(props) {

    /**
     * Processes the minimum value to display 'none' if it equals 1, otherwise returns the value.
     * 
     * @param {number} minVal - The minimum value to process.
     * @returns {number|string} - Processed minimum value or 'none'.
     */
    function minCheck(minVal){
        if (minVal === 1) {
            return "none";
        } else {
            return minVal;
        }
    }

    /**
     * Processes the maximum value to display 'none' if it equals 1, 120, or 300, otherwise returns the value.
     * 
     * @param {number} maxVal - The maximum value to process.
     * @returns {number|string} - Processed maximum value or 'none'.
     */
    function maxCheck(maxVal){
        if (maxVal === 1 ||  maxVal === 120 || maxVal === 300) {
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
