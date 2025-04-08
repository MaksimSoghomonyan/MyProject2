"use client";

import { useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductPagination } from "@/components/ProductPagination";
import useProductStore from "@/store/useProductStore";
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const {
    products,
    fetchProducts,
    likeProduct,
    deleteProduct,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    selectedFilter,
    searchQuery,
    setFilter,
    setCurrentPage,
    setSearchQuery,
  } = useProductStore();

  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter and paginate products
  const displayedProducts = products
    .filter((product) => {
      // Filter by favorites if selected
      if (selectedFilter === "favorites" && !product.liked) {
        return false;
      }

      // Search functionality
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle like button click
  const handleLike = (id: number) => {
    likeProduct(id);
  };

  // Handle delete button click
  const handleDelete = (id: number) => {
    deleteProduct(id);
    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully.",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <ProductFilters
        selectedFilter={selectedFilter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {displayedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
