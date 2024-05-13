const cloudinary = require('cloudinary').v2; // this line to import the cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');// helps to directly upload files onto the cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});
//This code snippet demonstrates how to create a new Cloudinary storage instance using the multer-storage-cloudinary package. This instance is configured to upload files to a folder named 'YelpCamp' in your Cloudinary account and allows only JPEG, PNG, and JPG formats.
// the folders are created automatically once the path is specified
module.exports = {
    cloudinary,
    storage
}