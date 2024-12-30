import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dgb5ibjr5",
    api_key: "745113311429653",
    api_secret: "o2gV5G78WLvt8Um-KCxvaxv6aJ8", // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadResult = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}; 

export { uploadResult }