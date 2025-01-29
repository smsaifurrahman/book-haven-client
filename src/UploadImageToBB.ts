import axios from "axios";

export const handleImageUpload = async (image): Promise<string | null> => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('image', image);
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        formData
      );
      return data.data.display_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };
