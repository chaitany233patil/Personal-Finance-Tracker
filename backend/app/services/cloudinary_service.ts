import cloudinary from '../../config/cloudinary.js'

export default class CloudinaryService {
  public static async uploadFile(filePath: string, folder: string) {
    try {
      const result = await cloudinary.uploader.upload(filePath, { folder })
      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
      }
    } catch (error) {
      throw new Error('Cloudinary upload failed: ' + error.message)
    }
  }

  public static async deleteFile(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId)
      return true
    } catch (error) {
      throw new Error('Cloudinary delete failed: ' + error.message)
    }
  }
}
