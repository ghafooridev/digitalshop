export const uploadImage = async (formData: FormData) => {
  const res = await fetch('/api/image', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (data) return data;
};

export const fetchImages = async (productId: string) => {
  const res = await fetch(`/api/image?productId=${productId}`);
  const data = await res.json();
  if (data) return data;
};

export const deleteImage = async (imageId: string) => {
  const res = await fetch(`/api/image?imageId=${imageId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
