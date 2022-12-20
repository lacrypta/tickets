import styled from "@emotion/styled";
import brandLogo from "../public/images/lacrypta-title.svg";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

export const HeaderLogo = () => {
  return (
    <Container>
      <a href={"/"}>
        <img
          alt='La Crypta bar'
          src={brandLogo.src}
          width='auto'
          height='auto'
          style={{ cursor: "pointer" }}
        />
      </a>
    </Container>
  );
};
