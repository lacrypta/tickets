interface IItemPriceProps {
  price: number;
  qty?: number;
}

const ItemPrice = ({ price, qty = 0 }: IItemPriceProps) => {
  const priceDiv = <span>$ {price}</span>;
  if (qty > 0) {
    return (
      <div>
        x {priceDiv} = ${qty * price}
      </div>
    );
  }
  return <div>{priceDiv}</div>;
};

export default ItemPrice;
