const PriceTag = ({ price }: { price: number }) => {
  return (
    <div className="flex gap-2 mb-3">
      <span className="px-3 py-1 mr-2  rounded-full bg-green-100 text-green-800  text-sm font-semibold">
        EGP {price}
      </span>
    </div>
  );
};

export default PriceTag;
