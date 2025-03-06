'use client';

import { Product, ProductCategory } from '@prisma/client';
import {
  Input,
  Button,
  Textarea,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { upsertProduct } from '../services';
import UploadImage from './UploadImage';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const ProductForm = (props: { product: Product | null }) => {
  const pathName = usePathname();
  // console.log(pathName);
  const params = useParams();
  // console.log(params);
  const searchParams = useSearchParams();
  // console.log(searchParams);
  const discount = searchParams.get('discount');

  const router = useRouter();
  // console.log(router);
  const { product } = props;
  const { register, handleSubmit, setValue } = useForm<Product>();

  const onSubmitForm = (data: Product) => {
    const _product = {
      ...data,
      id: product?.id,
      price: parseFloat(data?.price?.toString() || '0'),
      quantity: parseFloat(data?.quantity?.toString() || '0'),
    };
    upsertProduct(_product as Product);
  };

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle> Product</CardTitle>
          <CardTitle className="text-red-600">
            this product has {discount} % discount
          </CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              {...register('name')}
              id="name"
              required
              defaultValue={product?.name || ''}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="category">Category</Label>
            <Select
              required
              onValueChange={(value) =>
                setValue('category', value as ProductCategory)
              }
              defaultValue={product?.category || ProductCategory.OTHERS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              defaultValue={product?.description || ''}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="price">Price</Label>
            <Input
              {...register('price')}
              type="number"
              id="price"
              step="0.01"
              defaultValue={product?.price || ''}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              {...register('quantity')}
              type="number"
              id="quantity"
              defaultValue={product?.quantity || ''}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {product?.id ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
      {product?.id && (
        <CardFooter>
          <UploadImage productId={product?.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductForm;
