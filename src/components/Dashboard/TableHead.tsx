import { Book, Order } from "@/lib/types";
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface HeadCell {
  id: keyof Book;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

interface EnhancedTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Book
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Book Title",
  },
  {
    id: "authorName",
    numeric: false,
    disablePadding: false,
    label: "Author",
  },
  {
    id: "firstPublishYear",
    numeric: true,
    disablePadding: false,
    label: "Published Year",
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Subject",
  },
  {
    id: "authorBirthdate",
    numeric: false,
    disablePadding: false,
    label: "Author Birthdate",
  },
];

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Book) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
