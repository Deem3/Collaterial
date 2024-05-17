import { Button } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

type CollateralImageProps = {
  id: number;
  imageUrls: string[];
};

const CollateralImage: FunctionComponent<CollateralImageProps> = ({ id, imageUrls }) => {
  console.log(imageUrls);
  const uploadImageMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const urls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (data) {
          urls.push(data.secure_url);
        }
      }

      if (urls.length > 0) {
        await axios.put(
          '/api/collateral/image',
          {
            id,
            images: urls,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
          },
        );
      }

      return urls;
    },
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    uploadImageMutation.mutate(Array.from(data.files));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('files')} type="file" multiple />
        <Button color="neutral" type="submit" loading={uploadImageMutation.isPending}>
          Upload
        </Button>
      </form>
      <Carousel>
        {imageUrls.map((url) => (
          <div>
            <img className="max-h-[500px] w-auto h-auto" src={url} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CollateralImage;
