interface PriceProps {
  value: number;
}

export const Price = ({ value }: PriceProps) => {
  return (
    <div className='text-center text-lg'>
      <span className='font-bold'>Precio: </span>
      <span>
        <b className='text-2xl'>${value}</b> <i>(Pesos Argentinos)</i>
      </span>
    </div>
  );
};

export default Price;
