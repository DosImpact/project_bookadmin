import React from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import config from "../config";
import { TextField } from "@material-ui/core";

const BookAddBtn = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = React.useState({
    author: "",
    picture: "",
    publisher: "",
    name: "",
    birthday: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const url = `${config.baseURI}/api/book/add`;
    const res = await Axios.post(url, state);
    console.log(res);
  };
  const handleChangeValue = (e) => {
    const newStateE = {
      [e.target.name]: e.target.value,
    };
    console.log(newStateE);
    setState((prev) => ({
      ...prev,
      ...newStateE,
    }));
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        책정보 추가하기 URL
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"도서 관리 정보 추가"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form>
              <TextField
                label="책이름"
                type="text"
                onChange={handleChangeValue}
                name="name"
                value={state.name}
                fullWidth
              />
              <TextField
                label="사진URL"
                type="text"
                onChange={handleChangeValue}
                name="picture"
                value={state.picture}
                fullWidth
              />
              <TextField
                label="작가"
                type="text"
                onChange={handleChangeValue}
                name="author"
                value={state.author}
                fullWidth
              />
              <TextField
                label="출판사"
                type="text"
                onChange={handleChangeValue}
                name="publisher"
                value={state.publisher}
                fullWidth
              />
              <TextField
                label="출판일"
                type="text"
                onChange={handleChangeValue}
                name="birthday"
                value={state.birthday}
                fullWidth
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            autoFocus
          >
            추가하기
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookAddBtn;
