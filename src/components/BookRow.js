import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import BookDelBtn from "./BookDelBtn";
import config from "../config";
const BookRow = ({
  id,
  author,
  picture,
  publisher,
  name,
  birthday,
  BookType_id,
  isDeleted,
}) => {
  return (
    <TableRow key={id}>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{author}</TableCell>
      <TableCell align="center">{publisher}</TableCell>
      <TableCell align="center">{birthday}</TableCell>
      <TableCell align="center">
        <img
          alt={name}
          src={
            picture.startsWith("http")
              ? picture
              : `${config.baseURI}/image/${picture}`
          }
          width="100px"
          height="130px"
        />
      </TableCell>
      <TableCell align="center">
        <BookDelBtn id={id} />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
