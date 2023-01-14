import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const API_URL=process.env.REACT_APP_API_URL;

export default function Record() {
    var [records, setRecords] = React.useState([]);
    var [zoneError, setZoneError] = React.useState(null);

    var zone = window.location.pathname.split('/')[1];

    React.useEffect(() => {
        function fetchRecords() {
            fetch(`${API_URL}/domain/zone/${zone}/record`)
            .then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        if(data.length > 0) {
                            Promise.all(data.map(async record => {
                                const response = await fetch(`${API_URL}/domain/zone/${zone}/record/${record}`)
                                if (response.status === 200) {
                                    return response.json();
                                }
                            }))
                            .then(data => {
                                setRecords(data);
                            });
                        }
                    })
                } else {
                    setZoneError("Zone not found");
                }
            });
        }

        if(zone) {
            fetchRecords();
        }
    }, [zone]);

    if(!zone) {
        return <Typography variant="h6" component="div" sx={{ flexGrow: 1, m: 50 }}>Select a DNS Zone</Typography>;
    } else if (zoneError) {
        return <Typography variant="h6" component="div" sx={{ flexGrow: 1, m: 50 }}>{zoneError}</Typography>;
    } else if (records.length === 0) {
        return <Typography variant="h6" component="div" sx={{ flexGrow: 1, m: 50 }}>Loading...</Typography>;
    }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Records table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Subdomain</TableCell>
                <TableCell align="center">Target</TableCell>
                <TableCell align="center">TTL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {records.map((record) => (
                    <TableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{record.fieldType}</TableCell>
                        <TableCell align="center">{record.subDomain}</TableCell>
                        <TableCell align="center">{record.target}</TableCell>
                        <TableCell align="center">{record.ttl}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}
