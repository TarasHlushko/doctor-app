import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Checkbox} from "@mui/material";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const columns = [
    {id: 'name', label: "Ім'я Призвіще", minWidth: 250},
    {id: 'date', label: 'Хронологічний Вік', minWidth: 150, align: 'center'},
    {id: 'email', label: 'Пошта', minWidth: 150, align: 'center'},
    {id: 'link', label: '', minWidth: 150, align: 'center'},
];

export const CustomerTable = ({isSelect, click, setComparer, setConfirm, setUser, data}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected, setSelected] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSelect)
            setSelected([]);
    }, [isSelect])

    useEffect(() => {
        if (click) {
            setComparer(data.filter((value) => selected.includes(value.id)));
            setSelected([]);
        }
    }, [click, data, selected, setComparer])

    useEffect(() => {
        setConfirm(selected.length >= 1);
    }, [selected, setConfirm]);

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigateToPage = (event, userId) => {
        event.stopPropagation();
        navigate(`/patient/${userId}`);
    }

    const ShowPage = ({userId}) => {
        return (
            <div onClick={(event) => navigateToPage(event, userId)}>Переглянути Пацієнта</div>
        )
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 700}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {isSelect && <TableCell
                                align={'center'}
                                style={{minWidth: 70}}
                            >
                            </TableCell>}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                if (isSelect) {
                                    const isItemSelected = selected.indexOf(row.id) !== -1;
                                    console.log(row);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id + 'Row'}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox color="primary" checked={isItemSelected}/>
                                            </TableCell>
                                            <TableCell align="left">{`${row.name} ${row['surname']}`}</TableCell>
                                            <TableCell align="center">{row.age}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">
                                                <ShowPage userId={row.id}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else
                                    return (
                                        <TableRow hover key={row.id + 'Select Row'} role="checkbox" tabIndex={-1}
                                                  onClick={() => setUser(row)}>
                                            <TableCell align="left">{`${row.name} ${row['surname']}`}</TableCell>
                                            <TableCell align="center">{row.age}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">
                                                <ShowPage userId={row.id}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
