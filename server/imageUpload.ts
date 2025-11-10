import sharp from "sharp";
import { storagePut } from "./storage";
import crypto from "crypto";

/**
 * Upload an image to S3 with automatic WebP conversion
 * @param fileBuffer - The image file buffer
 * @param folder - The folder to store the image in (e.g., 'services', 'projects', 'team')
 * @returns Object with the image URL and key
 */
export async function uploadImage(
  fileBuffer: Buffer,
  folder: string
): Promise<{ url: string; key: string }> {
  // Convert image to WebP format
  const webpBuffer = await sharp(fileBuffer)
    .webp({ quality: 85 }) // High quality WebP
    .toBuffer();

  // Generate a unique filename
  const randomSuffix = crypto.randomBytes(8).toString("hex");
  const fileName = `${Date.now()}-${randomSuffix}.webp`;
  const fileKey = `${folder}/${fileName}`;

  // Upload to S3
  const { url } = await storagePut(fileKey, webpBuffer, "image/webp");

  return { url, key: fileKey };
}

/**
 * Delete an image from S3
 * @param imageUrl - The full URL of the image to delete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  // Note: S3 deletion would require additional setup
  // For now, we'll just log it
  console.log("Image deletion requested for:", imageUrl);
  // In a production environment, you would implement actual S3 deletion here
}
