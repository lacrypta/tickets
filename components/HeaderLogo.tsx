import styled from "@emotion/styled";
import Image from "next/image";
import brandLogo from "../public/images/lacrypta-title.svg";
import halloweenLogo from "../public/images/halloween.png";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const Logo = styled(Image)``;

const HalloweenDiv = styled.div`
  width: 45%;
  position: relative;
  right: -55%;
  top: -12px;
`;

const Halloween = styled(Image)``;

export const HeaderLogo = () => {
  return (
    <Container>
      <Logo alt='La Crypta bar' src={brandLogo} />
      <HalloweenDiv>
        <Halloween
          layout='responsive'
          alt='La Crypta Halloween'
          src={halloweenLogo}
        />
      </HalloweenDiv>
    </Container>
  );
};
