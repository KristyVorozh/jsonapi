import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../main.styled";
import { Button, Space, Spin, Typography } from "antd";
import { getProfileInfo } from "../../api/api.service";
import styled from "styled-components";
import ProfileModal from "./ProfileModal";
import { TAuthorData, TProfileData, TQuoteData } from "../../types/api.types";
import Header from "../../components/Header/Header";

const { Title } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profileInfo, setProfileInfo] = useState<TProfileData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authorInfo, setAuthorInfo] = useState<TAuthorData | null>(null);
  const [quoteInfo, setQuoteInfo] = useState<TQuoteData | null>(null);

  const fetchProfileData = async () => {
    const data = await getProfileInfo(token ?? "");
    if (data) {
      setProfileInfo(data);
    }
  };

  useEffect(() => {
    fetchProfileData();
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!profileInfo) return <Spin />;
  return (
    <Wrapper>
      <ProfileModal
        quoteInfo={quoteInfo}
        setQuoteInfo={setQuoteInfo}
        authorInfo={authorInfo}
        setAuthorInfo={setAuthorInfo}
        open={isOpen}
        setOpen={setIsOpen}
      />
      <Space direction="vertical" size={20}>
        <Header />
        <Space size={20} align="start">
          <ImgStyled src="https://avatars.mds.yandex.net/i?id=b510471b0d36481300f09d7a2f6d37cc_l-5250823-images-thumbs&n=13" />
          <Space direction="vertical">
            <Title style={{ marginTop: 0, marginBottom: 0 }} level={3}>
              Welcome {profileInfo.data.fullName}
            </Title>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              Update
            </Button>
          </Space>
        </Space>
        <Typography>
          {quoteInfo
            ? `${authorInfo?.data.name}: ${quoteInfo.data.quote}`
            : "[here is place for concatenated result from long running call]"}
        </Typography>
      </Space>
    </Wrapper>
  );
};

const ImgStyled = styled.img`
  width: 100px;
  border-radius: 100%;
`;

export default Profile;
