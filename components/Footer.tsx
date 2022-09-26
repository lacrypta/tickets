import styled from "@emotion/styled";

const FooterBlock = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  color: black;
  position: relative;
  background: white;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

export const Footer = () => {
  return (
    <FooterBlock>
      <a href='https://peronio.ar' target='_blank' rel='noopener noreferrer'>
        Hecho con ❤️ por Peronio Army
      </a>
    </FooterBlock>
  );
};
