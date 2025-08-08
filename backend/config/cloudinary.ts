// start/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'
import Env from '#start/env'

cloudinary.config({
  cloud_name: Env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: Env.get('CLOUDINARY_API_KEY'),
  api_secret: Env.get('CLOUDINARY_API_SECRET'),
})

export default cloudinary
