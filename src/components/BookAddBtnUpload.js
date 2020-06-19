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

const BookAddBtnUpload = () => {
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
    file: null,
    fileName: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleClose();
    console.log(state);
    const formData = new FormData();
    formData.append("image", state.file);
    formData.append("fileName", state.fileName);
    formData.append("author", state.author);
    formData.append("picture", state.picture);
    formData.append("publisher", state.publisher);
    formData.append("name", state.name);
    formData.append("birthday", state.birthday);
    const params = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = `${config.baseURI}/api/book`;
    await Axios.post(url, formData, params);
    window.location.reload();
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
  const handleFile = (e) => {
    const newStateE = {
      fileName: e.target.value,
      file: e.target.files[0],
    };
    setState((prev) => ({
      ...prev,
      ...newStateE,
    }));
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        책정보 추가하기 (업로드)
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
              <label htmlFor="raised-up-file">
                <Button
                  variant="contained"
                  component="div"
                  color="primary"
                  autoFocus
                >
                  {state.fileName === null ? "파일업로드" : `${state.fileName}`}
                </Button>
              </label>
              <input
                type="file"
                name="fileNmae"
                file={state.file}
                value={state.fileName}
                onChange={handleFile}
                id="raised-up-file"
                style={{ display: "none" }}
              ></input>
              <TextField
                label="책이름"
                type="text"
                onChange={handleChangeValue}
                name="name"
                value={state.name}
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

export default BookAddBtnUpload;
