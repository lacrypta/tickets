import { memo } from "react";
import BrandLogo from "../../public/images/lacrypta-title.svg";

export const HeaderLogo = () => {
  return (
    <div>
      <a href={"/"}>
        <BrandLogo alt='La Crypta bar' style={{ cursor: "pointer" }} />
      </a>
    </div>
  );
};

export default memo(HeaderLogo);
