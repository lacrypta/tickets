import Image from "next/image";

import peronioIcon from "../../public/images/peronio-coin.png";

const PeronioIcon = () => {
  return (
    <Image height='32px' width='32px' alt='Peronio Icon' src={peronioIcon} />
  );
};

export default PeronioIcon;
