import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import type { Product } from "@/store/useProductStore";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onLike, onDelete }: ProductCardProps) {
  const { id, title, price, description, image, liked } = product;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <Card className="h-full flex flex-col transition-all hover:shadow-md">
        <div className="relative pt-[100%]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="flex-grow p-4">
          <h3 className="text-lg font-semibold mb-2">{truncateText(title, 50)}</h3>
          <p className="text-gray-500 mb-2">{truncateText(description, 100)}</p>
          <p className="font-medium text-lg">${price}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <button
            onClick={handleLike}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Delete product"
          >
            <Trash2 className="h-5 w-5 text-gray-500" />
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}
