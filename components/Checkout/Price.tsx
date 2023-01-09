interface PriceProps {
  value: number;
}

export const Price = ({ value }: PriceProps) => {
  return (
    <div className='text-center text-lg'>
      <span className='font-bold'>Precio: </span>
      <span>${value}</span>
    </div>
  );
};

export default Price;
