import { Button, Modal, Typography } from "antd";
import React, { useEffect } from "react";
import { getAuthorInfo, getQuoteInfo } from "../../api/api.service";
import { TAuthorData, TQuoteData } from "../../types/api.types";

interface IProfileModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  authorInfo: TAuthorData | null;
  setAuthorInfo: (authorInfo: TAuthorData | null) => void;
  setQuoteInfo: (quoteInfo: TQuoteData | null) => void;
  quoteInfo: TQuoteData | null;
}
const ProfileModal = (props: IProfileModal) => {
  const { open, setOpen, authorInfo, setAuthorInfo, quoteInfo, setQuoteInfo } =
    props;
  const token = localStorage.getItem("token");

  const fetchAuthorInfoData = async () => {
    const authorData = await getAuthorInfo(token ?? "");
    setAuthorInfo(authorData);
    if (authorData) {
      const quoteData = await getQuoteInfo(
        token ?? "",
        authorData.data.authorId
      );
      setQuoteInfo(quoteData);
    }
  };

  useEffect(() => {
    if (open) {
      setAuthorInfo(null);
      setQuoteInfo(null);
      fetchAuthorInfoData();
    }
  }, [open]);

  return (
    <Modal
      footer={[<Button onClick={() => setOpen(false)}>Cancel</Button>]}
      okText={false}
      title="Requesting quote"
      open={open}
    >
      <Typography>Requesting author... {authorInfo && "Success"}</Typography>
      <Typography>Requesting quote... {quoteInfo && "Success"}</Typography>
    </Modal>
  );
};

export default ProfileModal;
