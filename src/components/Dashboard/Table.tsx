"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Papa from "papaparse";
import { saveAs } from "file-saver";

import EnhancedTableHead from "./TableHead";
import { useEffect } from "react";
import { getBooks } from "@/lib/getData";
import { Book } from "@/lib/types";
import { Order } from "@/lib/types";
import { getComparator, stableSort } from "@/lib/helpers";

interface EnhancedTableProps {
  data: Book[];
}

export default function EnhancedTable({ data }: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Book>("firstPublishYear");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Book[]>(data);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Book
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Effect to fetch data based on page and rowsPerPage
  useEffect(() => {
    if (rows.length - 1 > (page + 1) * rowsPerPage) return;
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getBooks(page + 1, rowsPerPage * 2);
        const newBooks = [...rows, ...data];

        const uniqueBooks = Array.from(
          new Set(newBooks.map((book) => JSON.stringify(book)))
        ).map((book) => JSON.parse(book));

        setRows(uniqueBooks);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadCSV = () => {
    const csvData = visibleRows.map((row, index) => ({
      id: index + 1,
      "Book Title": row.title,
      Author: row.authorName,
      "Published Year": row.firstPublishYear,
      Subject: row.subject,
      "Author Birthdate": row.authorBirthdate,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "books.csv");
  };

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, filteredRows, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            label="Search by author"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 2, mr: 2 }}
          />
          <Button
            variant="contained"
            sx={{ height: 50 }}
            onClick={handleDownloadCSV}
          >
            Download CSV
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.key}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.authorName}</TableCell>
                    <TableCell align="center">{row.firstPublishYear}</TableCell>
                    <TableCell align="center">{row.subject}</TableCell>
                    <TableCell align="center">{row.authorBirthdate}</TableCell>
                  </TableRow>
                );
              })}

              {loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
