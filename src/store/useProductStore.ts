import { create } from 'zustand';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  liked?: boolean;
  isCustom?: boolean;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  selectedFilter: 'all' | 'favorites';
  searchQuery: string;

  // Actions
  fetchProducts: () => Promise<void>;
  likeProduct: (id: number) => void;
  deleteProduct: (id: number) => void;
  createProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  setFilter: (filter: 'all' | 'favorites') => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  getProductById: (id: number) => Product | undefined;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 1,
  selectedFilter: 'all',
  searchQuery: '',

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data.map((product: Product) => ({
        ...product,
        liked: false,
        isCustom: false,
      }));

      set({
        products,
        loading: false,
        totalPages: Math.ceil(products.length / get().itemsPerPage),
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      });
    }
  },

  likeProduct: (id) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      ),
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
      totalPages: Math.ceil(
        (state.products.length - 1) / state.itemsPerPage
      ),
    }));
  },

  createProduct: (productData) => {
    const maxId = Math.max(...get().products.map((p) => p.id), 0);
    const newProduct: Product = {
      ...productData,
      id: maxId + 1,
      liked: false,
      isCustom: true,
    };

    set((state) => ({
      products: [...state.products, newProduct],
      totalPages: Math.ceil(
        (state.products.length + 1) / state.itemsPerPage
      ),
    }));
  },

  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...productData } : product
      ),
    }));
  },

  setFilter: (filter) => {
    set({ selectedFilter: filter, currentPage: 1 });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },
}));

export default useProductStore;
