package com.manish.gaming_backend.Service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

    @Service
    public class CloudinaryService {


        private final Cloudinary cloudinary;

        public CloudinaryService(Cloudinary cloudinary) {
            this.cloudinary = cloudinary;
        }


        @SuppressWarnings("unchecked")
        public String uploadImage(MultipartFile file) throws IOException {
            Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString();
        }

        @SuppressWarnings("unchecked")
        public String deleteImage(String publicId) throws IOException {
            Map<String, Object> result = (Map<String, Object>) cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                return result.get("result").toString(); // "ok" if deleted successfully
        }


    }


