import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AllPlayers() {
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

    const [search, setSearch] = useState("");

    const listName = players?.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell align="right">Class</TableCell>
                        <TableCell align="right">Image</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {listName?.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell>{player.id}</TableCell>
                            <TableCell>{player.name}</TableCell>
                            <TableCell>{player.dateofbirth}</TableCell>
                            <TableCell align="right" style={{color: "red"}}>{player.class}</TableCell>
                            <TableCell align="right"><img src={player.image} alt={player.name} style={{maxWidth: "50px"}}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
