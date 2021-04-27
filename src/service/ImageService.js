import axios from "../axios-config";

class ImageService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post("/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    download(userId) {

    }
}

export default new ImageService()