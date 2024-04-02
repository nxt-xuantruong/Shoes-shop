import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProduct, editProduct } from "../../../Config/store/products";

import "./ProductForm.css";

const initialValues = {
  category: "",
  slug: "",
  name: "",
  img_thumbnail: "",
  price: 0,
  sale: 0,
  img_desc: [],
  desc: "",
  stock: true,
};
function ProductForm({ selectedProduct }) {
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(initialValues);
  const [slugsByCategory, setSlugsByCategory] = useState({});
  const [slug, setSlug] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);
  console.log(product);

  const categorySlugMap = products.reduce((acc, item) => {
    const { category, slug } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    if (!acc[category].includes(slug)) {
      acc[category].push(slug);
    }
    return acc;
  }, {});
  const categories = Object.keys(categorySlugMap);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const selectedSlugs = categorySlugMap[selectedCategory] || [];
    setSlugsByCategory({
      ...slugsByCategory,
      [selectedCategory]: selectedSlugs,
    });
    setProduct({
      ...product,
      category: selectedCategory,
      slug: "", // Reset slug when changing category
    });
    setSlug("");
  };
  const handleSlugChange = (e) => {
    const selectedSlug = e.target.value;
    setProduct({
      ...product,
      slug: selectedSlug,
    });
    setSlug(selectedSlug);
  };

  const [tempImgDesc, setTempImgDesc] = useState([]);

  const handleImgURLChange = (e) => {
    const imgURLs = e.target.value.split(",");
    setTempImgDesc(imgURLs);
  };

  const handleConfirmImgURLs = () => {
    setProduct({
      ...product,
      img_desc: tempImgDesc,
    });
    setTempImgDesc([]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    if (selectedProduct) {
      dispatch(editProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    // Reset form after submission
    setProduct(initialValues);
    setSlug("");
    setSlugsByCategory({});
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <select
          className="w120"
          value={product.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Slug:</label>
        <select value={slug} onChange={handleSlugChange}>
          <option value="">Select Slug</option>
          {slugsByCategory[product.category] &&
            slugsByCategory[product.category].map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Thumbnail URL:</label>
        <input
          type="text"
          name="img_thumbnail"
          value={product.img_thumbnail}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          className="w120"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sale:</label>
        <input
          className="w120"
          type="number"
          name="sale"
          value={product.sale}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image Descriptions:</label>
        <textarea
          value={selectedProduct && product.img_desc}
          placeholder="link 1,link 2,..."
          onChange={handleImgURLChange}
          rows={4}
        />
        <button type="button" onClick={handleConfirmImgURLs}>
          Xác nhận
        </button>
      </div>
      <div>
        <label>Description:</label>
        <textarea name="desc" value={product.desc} onChange={handleChange} />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default ProductForm;
