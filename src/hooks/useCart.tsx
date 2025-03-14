'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

export const useCart = () => {
  // get all cart items by query -->cart
  // add to cart --> addToCartMutation
  // delete from cart --> removeCartItemMutation
  const queryClient = useQueryClient();

  // fetch cart data
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      // get data fro DB
      const res = await fetch('/api/cart/');
      if (!res.ok) throw new Error('Failed to fetch cart');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // add to cart

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('item is added');
    },
    onError: () => {
      alert('failed to add');
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to remove from cart');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('item is added');
    },
    onError: () => {
      alert('failed to remove');
    },
  });

  return { cart, isLoading, error, addToCartMutation, removeCartItemMutation };
};
