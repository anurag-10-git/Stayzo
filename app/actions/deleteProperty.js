'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error('Property not found!');

  // Verify Ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  const publicIds = property.images.map(imageUrl => {
    const parts = imageUrl.split('/');
    console.log('parts//', parts);
    console.log('parts-split//', parts.at(-1).split('.'));
    return parts.at(-1).split('.')[0];
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      console.log('publicId' + publicId);
      await cloudinary.uploader.destroy('stayzo/' + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;
