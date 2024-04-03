import React from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Form = ({
  type,
  formData,
  setFormData,
  setFiles,
  handleSubmit,
  handleImageSubmit,
  handleRemoveImage,
  loading,
  error,
  uploading,
  imageUploadError,
}) => (
  <div className="p-3 max-w-3xl mx-auto min-h-screen">
    <h1 className="text-center text-3xl my-7 font-semibold">{type}</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
          type="text"
          placeholder="Title"
          id="title"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <FileInput
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          multiple
        />
        <Button
          onClick={handleImageSubmit}
          type="button"
          disabled={uploading}
          gradientDuoTone="purpleToBlue"
          size="sm"
          outline
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
      {imageUploadError && <Alert color="failure"> {imageUploadError}</Alert>}

      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url, index) => (
          <div
            key={url}
            className="flex justify-between p-3 border items-center"
          >
            <img
              src={url}
              alt="listing image"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button
              type="button"
              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
              onClick={() => handleRemoveImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      <ReactQuill
        theme="snow"
        placeholder="Write something..."
        className="h-72 mb-12"
        onChange={(value) => {
          setFormData({ ...formData, description: value });
        }}
        value={formData.description}
      />
      <TextInput
        type="number"
        placeholder="Price"
        id="price"
        className="flex-1"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        value={formData.price}
      />
      <Button disabled={loading} type="submit" gradientDuoTone="purpleToPink">
        {type}
      </Button>
      {error && <Alert type="failure">{error}</Alert>}
    </form>
  </div>
);

export default Form;
