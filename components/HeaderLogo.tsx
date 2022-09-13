import styled from "@emotion/styled";
import Image from "next/image";
import brandLogo from "../assets/images/brand-bar.png";

const Container = styled.div`
  max-width: 200px;
  margin-bottom: 2em;
`;

export const HeaderLogo = () => {
  return (
    <Container>
      <Image alt='La Crypta bar' src={brandLogo} />
    </Container>
  );
};
