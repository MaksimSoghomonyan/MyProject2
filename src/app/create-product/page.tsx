"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/ProductForm";
import useProductStore, { type Product } from "@/store/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: Omit<Product, "id" | "liked" | "isCustom">) => {
    setIsSubmitting(true);

    // Create product
    createProduct(data);

    toast({
      title: "Product created",
      description: "Your product has been created successfully.",
    });

    // Redirect to products page
    router.push("/products");
    setIsSubmitting(false);
  };

  const handleBack = () => {
    router.push("/products");
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <ProductForm
        onSubmit={handleCreate}
        isEditing={false}
      />
    </div>
  );
}
