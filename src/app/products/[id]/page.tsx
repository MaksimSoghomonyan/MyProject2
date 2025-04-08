"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useProductStore, { type Product } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Pencil } from "lucide-react";
import Image from "next/image";
import { ProductForm } from "@/components/ProductForm";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const {
    products,
    fetchProducts,
    getProductById,
    likeProduct,
    updateProduct,
  } = useProductStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      if (products.length === 0) {
        await fetchProducts();
      }
      setIsLoading(false);
    }

    loadData();
  }, [fetchProducts, products.length]);

  // Make sure id is a number
  const productId = Number(id);
  const product = getProductById(productId);

  const handleLike = () => {
    likeProduct(productId);
  };

  const handleBack = () => {
    router.push("/products");
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (data: Omit<Product, "id" | "liked" | "isCustom">) => {
    updateProduct(productId, data);
    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-xl">Product not found</p>
        <Button onClick={handleBack}>Back to Products</Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <Button variant="outline" onClick={handleEdit}>Cancel</Button>
        </div>
        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart className={`h-5 w-5 ${product.liked ? "fill-red-500 text-red-500" : ""}`} />
            {product.liked ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-medium">${product.price}</p>
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <p className="text-gray-700 capitalize">{product.category}</p>
          </div>
          {product.isCustom && (
            <p className="text-sm text-gray-500 mt-4">This is a custom product created by user</p>
          )}
        </div>
      </div>
    </div>
  );
}
