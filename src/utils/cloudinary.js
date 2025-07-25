import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"


cloudinary.config({ 
        cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
        api_key: process.env.CLOUNDINARY_API_KEY , 
        api_secret: process.env.CLOUNDINARY_API_SECRET 
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const reponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // detecting file type as auto(it will detect automatically)
        })
        // file has been uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temporary file as the upload operation got failed
        return null;
    }
}


export default uploadOnCloudinary