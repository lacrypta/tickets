import styled from "@emotion/styled";
import { Button as MaterialButton } from "@mui/material";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "ethers/lib/utils";
import Image from "next/image";
import useSpendable from "../../hooks/useSpendable";
import useUser from "../../hooks/useUser";

import peronioCoin from "../../public/images/peronio-coin.png";

const Button = styled(MaterialButton)`
  justify-content: space-between;
  display: flex;
  padding: 12px;
  font-size: 16px;
`;

const PeBalanceSpan = styled.span`
  font-size: 17px;
  margin-left: 5px;
`;

const PeBalance = ({ amount }: { amount: number }) => {
  return <PeBalanceSpan>({amount} PE)</PeBalanceSpan>;
};

const PeronioIcon = () => {
  return (
    <div
      style={{
        width: 25,
        height: 25,
        padding: 0,
        borderRadius: 999,
        border: "1px solid white",
        overflow: "hidden",
        marginRight: 10,
      }}
    >
      <Image alt='Peronio Coin Logo' src={peronioCoin} width='25' height='25' />
    </div>
  );
};

export const ConnectButton = () => {
  const { balance } = useSpendable({});
  const { isRegistered, user } = useUser();
  const pBalance = parseFloat(formatUnits(balance, 6)).toFixed(2);

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const displayAccount =
          isRegistered && user ? user.username : account?.displayName;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return "";
                // <button onClick={openConnectModal} type='button'>
                //   Conectar Wallet
                // </button>
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Red incorrecta
                  </button>
                );
              }

              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    size='small'
                    variant='contained'
                    onClick={openAccountModal}
                    type='button'
                  >
                    <PeronioIcon />
                    {displayAccount}
                    <PeBalance amount={parseFloat(pBalance)} />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
