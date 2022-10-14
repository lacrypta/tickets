import styled from "@emotion/styled";
import Image from "next/image";
import svgLogo from "../../public/images/lacrypta.svg";

const FlipBox = styled.div`
  background-color: transparent;
  width: 25vh;
  height: 25vh;
  perspective: 2000px;
`;

const SpinEffect = styled.div`
  animation-name: flip;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;

  @keyframes flip {
    0% {
      transform: scale(1) rotateY(0deg);
    }
    50% {
      transform: scale(0.7) rotateY(181deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;

const FlipBoxInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
`;

const FlipBoxSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: black;
`;

const LoadingLogo = () => {
  return (
    <FlipBox>
      <FlipBoxInner>
        <FlipBoxSide>
          <SpinEffect>
            <Image alt='skin' src={svgLogo} />
          </SpinEffect>
        </FlipBoxSide>
      </FlipBoxInner>
    </FlipBox>
  );
};

export default LoadingLogo;
