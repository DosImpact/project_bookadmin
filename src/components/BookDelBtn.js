import React from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import config from "../config";

function BookDelBtn({ id }) {
  const handleDel = async () => {
    console.log("del");
    const url = `${config.baseURI}/api/book/${id}`;
    await Axios.delete(url, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <Button onClick={handleDel} color="primary" variant="contained">
      삭제
    </Button>
  );
}

export default BookDelBtn;
