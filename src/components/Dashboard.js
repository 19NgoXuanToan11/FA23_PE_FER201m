import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell) (({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow) (({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function Dashboard() {
    const [players, setPlayers] = useState([]);

    const getPlayers = async () => {
        try {
            const response = await axios.get("https://65458a1ffe036a2fa9546451.mockapi.io/students");
            setPlayers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("error message: ", error.message);
            } else {
                console.log("unexpected error: ", error);
            }
        }
    };

    useEffect(() => {
        getPlayers();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [id, setId] = useState("");

    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            await axios.delete(`https://65458a1ffe036a2fa9546451.mockapi.io/students/${id}`);
            setOpen(false);
            setMessage("Delete staff success!");
            getPlayers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("error message: ", error.message);
            } else {
                console.log("unexpected error: ", error);
            }
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>DateOfBirth</StyledTableCell>
                            <StyledTableCell>Class</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {players?.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>{row.id}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.dateofbirth}</StyledTableCell>
                                <StyledTableCell>{row.class}</StyledTableCell>
                                <StyledTableCell><img src={row.image} alt={row.name} style={{maxWidth: "200px"}}/></StyledTableCell>
                                <StyledTableCell>
                                    <ChangeCircleIcon style={{cursor: "pointer"}}/>
                                    <DeleteForeverIcon style={{cursor: "pointer"}} onClick={() => {setId(row.id); setOpen(true);}}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

                <h3>{message}</h3>
            </TableContainer>

            <React.Fragment>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Are you sure you want to delete this staff?</DialogTitle>
                    
                    <DialogContent><DialogContentText id="alert-dialog-description"></DialogContentText></DialogContent>
                    
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Disagree</Button>
                        <Button onClick={handleDelete} color="primary" autoFocus>Agree</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
}
