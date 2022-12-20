import styled from "@emotion/styled";

import svgSkin from "../public/images/skin.svg";

const BackgroundDiv = styled.div`
  height: auto;
  max-height: 100%;
  background: black;
  position: absolute;
  z-index: 9;
  width: 100%;
  top: 0;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  opacity: 0.1;
  left: -17%;
`;

export const Background = () => {
  return (
    <BackgroundDiv>
      <Image alt='skin' src={svgSkin.src} />
    </BackgroundDiv>
  );
};
