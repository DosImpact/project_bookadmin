import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "../config";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import CircularProgress from "@material-ui/core/CircularProgress";

import BookRow from "./BookRow";
import BookAddBtn from "./BookAddBtn";
import BookAddBtnUpload from "./BookAddBtnUpload";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  table__control: {
    display: "flex",
    justifyContent: "flex-end",
    "& > div": {
      margin: theme.spacing(1),
    },
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "100%",
  },
  button__footer: {
    background: "linear-gradient(45deg, #55efc4 30%, #74b9ff 60%,#a29bfe 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "100%",
  },
}));

const DetailInfo = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        상세 스펙 보기 READ ME [ 오픈SW 기여 - 도서 관리 정보 시스템 32160462
        김도영 ]
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"도서 관리 정보 시스템 MadeBy 32160462 김도영"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <a
                href="https://github.com/DosImpact/project_bookadmin"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/DosImpact/project_bookadmin
              </a>
            </div>
            ⚛ React JS ( MUI )<br />
            🚟 Node.js Express multer pm2 Cluster
            <br />
            🚦 MySQL, WorkBrench
            <br />
            🔀 Toast Cloud, Docker
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default function BookTable() {
  const classes = useStyles();

  const [state, setState] = useState({
    data: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData");
      setState((prev) => ({
        ...prev,
        loading: true,
      }));
      try {
        const { data } = await Axios.get(`${config.baseURI}/api/book`);
        console.log(data);
        setState((prev) => ({
          ...prev,
          data,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error,
        }));
      } finally {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <TableContainer component={Paper}>
      <DetailInfo />
      <div className={classes.table__control}>
        <BookAddBtn />
        <BookAddBtnUpload />
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">번호</TableCell>
            <TableCell align="center">책이름</TableCell>
            <TableCell align="center">저자</TableCell>
            <TableCell align="center">출판사</TableCell>
            <TableCell align="center">출간일</TableCell>
            <TableCell align="center">사진</TableCell>
            <TableCell align="center">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.loading ? (
            <TableRow>
              <TableCell colSpan="7" align="center">
                <CircularProgress color="secondary" />
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {state.data.map((e) => (
            <BookRow
              key={e.id}
              id={e.id}
              author={e.author}
              picture={e.picture}
              publisher={e.publisher}
              name={e.name}
              birthday={e.birthday}
              BookType_id={e.BookType_id}
              isDeleted={e.isDeleted}
            />
          ))}
        </TableBody>
      </Table>
      <Button className={classes.button__footer}>
        POWERED BY DOSIMPACT 도서관리 시스템
      </Button>
    </TableContainer>
  );
}
