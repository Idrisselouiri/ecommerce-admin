"use client";

import React, { useState } from "react";
import Layout from "@components/Layout";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@app/firebase";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    imageUrls: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const router = useRouter();
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/product/create", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          imageUrls: formData.imageUrls,
        }),
      });
      if (res.ok) {
        setLoading(false);
        setError(null);
        router.push("/products");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <Layout>
      <Form
        type="Create Product"
        formData={formData}
        setFormData={setFormData}
        setFiles={setFiles}
        handleSubmit={handleSubmit}
        handleImageSubmit={handleImageSubmit}
        handleRemoveImage={handleRemoveImage}
        loading={loading}
        error={error}
        uploading={uploading}
        imageUploadError={imageUploadError}
      />
    </Layout>
  );
};

export default NewProduct;
