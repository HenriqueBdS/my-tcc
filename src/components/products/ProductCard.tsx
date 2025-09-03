import Image from "next/image";

type ProductCardProps = {
  name: string;
  price: number;
  image?: string;
  description: string;
};

function ProductCard({ name, price, image, description }: ProductCardProps) {
  return (
    <div className="card max-w-lg rounded overflow-hidden shadow-lg m-4">
      <Image
        src={image || "/placeholder.jpg"}
        alt={name}
        width={300}
        height={200}
        className="w-full h-auto object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{name}</div>
      </div>
      <div className="card-body">
        <p className="card-title mb-2">{description}</p>
        <p className="text-xl">
          R$ {price !== undefined ? price.toFixed(2).replace(".", ",") : "N/A"}
        </p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-soft btn-lg btn-success w-full">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
