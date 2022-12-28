import BrandLogo from "../../public/images/lacrypta-title.svg";

// const Container = styled.div`
//   width: 100%;
//   margin-bottom: 2em;
// `;

export const HeaderLogo = () => {
  return (
    <div>
      <a href={"/"}>
        <BrandLogo alt='La Crypta bar' style={{ cursor: "pointer" }} />
      </a>
    </div>
  );
};

export default HeaderLogo;
