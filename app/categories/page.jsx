"use client";

import Layout from "@components/Layout";
import { Button, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [parentCatg, setParentCatg] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categorie/get");
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allData = {
      name,
      parentCatg,
      properties: properties.map((p) => ({
        name: p.names,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      const res = await fetch(`/api/categorie/${editedCategory._id}`, {
        method: "PUT",
        body: JSON.stringify(allData),
      });
      const data = await res.json();
      if (res.ok) {
        setEditedCategory(null);
      }
    } else {
      const res = await fetch("/api/categorie/create", {
        method: "POST",
        body: JSON.stringify(allData),
      });
    }
    setName("");
    setParentCatg("");
    setProperties([]);
    fetchData();
  };
  const hanldeEdit = async (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCatg(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        names: name,
        values: values.join(","),
      }))
    );
  };
  const handleDelete = async (id) => {
    const res = await fetch(`/api/categorie/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCategories(categories.filter((categorie) => categorie._id !== id));
    }
  };
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { values: "", names: "" }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].names = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <div className="mx-auto">
        <h1 className="font-bold text-2xl text-center my-10">
          {editedCategory ? "Edited Category" : "Create Category"}
        </h1>
        <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <TextInput
              type="text"
              placeholder="Create a Categorie"
              id="categorie"
              className="flex-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <select
              onChange={(e) => setParentCatg(e.target.value)}
              value={parentCatg}
            >
              <option value="">Uncategories</option>
              {categories.length > 0 &&
                categories.map((categorie) => (
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Properties</label>
            <Button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm mb-2"
            >
              Add new property
            </Button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <div key={property.name} className="flex gap-4">
                  <input
                    type="text"
                    className="mb-0"
                    onChange={(ev) =>
                      handlePropertyNameChange(index, property, ev.target.value)
                    }
                    value={property.names}
                    placeholder="property name (example: color)"
                  />
                  <input
                    type="text"
                    className="mb-0"
                    onChange={(ev) =>
                      handlePropertyValuesChange(
                        index,
                        property,
                        ev.target.value
                      )
                    }
                    value={property.values}
                    placeholder="values, comma separated"
                  />

                  <Button
                    onClick={() => removeProperty(index)}
                    type="button"
                    className="btn-red"
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
          {editedCategory && (
            <Button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCatg("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </Button>
          )}
          <Button
            className="h-fit"
            type="submit"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            {editedCategory ? "Edit" : "Create"}
          </Button>
        </form>

        {loading ? <p>Loading...</p> : ""}
        {!editedCategory && (
          <div className="overflow-x-auto">
            {!loading && categories.length > 0 && (
              <Table>
                <Table.Head>
                  <Table.HeadCell>Categorie name</Table.HeadCell>
                  <Table.HeadCell>Parent Categorie</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">delete</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {categories.map((categorie) => (
                    <Table.Row
                      key={categorie._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {categorie.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {categorie.parent?.name}
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          onClick={() => hanldeEdit(categorie)}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-2"
                          onClick={() => handleDelete(categorie._id)}
                        >
                          Delete
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
