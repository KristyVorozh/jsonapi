import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Wrapper } from "../../main.styled";
import { Space, Spin, Typography } from "antd";
import { getInfo } from "../../api/api.service";
import { TInfo } from "../../types/api.types";

const About = () => {
  const [info, setInfo] = useState<TInfo>({} as TInfo);

  const fetchData = async () => {
    const data: TInfo = await getInfo();
    if (data) {
      setInfo(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!info) return <Spin />;
  return (
    <Wrapper>
      <Space direction="vertical">
        <Header />
        <Typography>{info.data?.info}</Typography>
      </Space>
    </Wrapper>
  );
};

export default About;
