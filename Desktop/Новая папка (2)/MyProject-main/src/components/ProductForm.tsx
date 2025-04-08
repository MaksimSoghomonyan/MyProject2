import { useForm } from "react-hook-form";
import type { Product } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id" | "liked" | "isCustom">) => void;
  isEditing?: boolean;
}

export function ProductForm({ initialData, onSubmit, isEditing = false }: ProductFormProps) {
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      category: initialData?.category || "",
      image: initialData?.image || "",
    },
  });

  const handleSubmit = (data: Omit<Product, "id" | "liked" | "isCustom">) => {
    // Validate the image URL
    if (!data.image.startsWith('http')) {
      toast({
        title: "Invalid image URL",
        description: "Please enter a valid image URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    // Convert price to number
    const formattedData = {
      ...data,
      price: typeof data.price === 'string' ? Number.parseFloat(data.price) : data.price,
    };

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product title"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Product price"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product description"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product category"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product image URL (http://...)"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
