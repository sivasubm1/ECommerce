import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../functions/product";

import { getCategories, getCategorySubs } from "../../functions/category";
import FileUpload from "../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });

      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });

      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });

      setArrayOfSubIds((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
