import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { PurchaseContext } from "../../contexts/Purchase";

export const WalletMain = () => {
  const { purchase } = useContext(PurchaseContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!purchase) {
      router.push("/");
      return;
    }

    if (purchase.status === "ready") {
      router.push("/entrada/" + purchase.id);
      return;
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  return (
    <div>
      <h2>Purchase</h2>
      {isLoading ? (
        "Cargando..."
      ) : (
        <div className='bg-white w-full min-h-[400px] mb-10 text-black'>
          {JSON.stringify(purchase)}
        </div>
      )}
    </div>
  );
};

export default WalletMain;
