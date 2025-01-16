import { useState, useEffect } from "react";
import ProductServices from "../../services/product.service";
import Card from "../../components/Card";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductServices.getAllProducts();
      console.log(response); // Add this line to check the data
      setProducts(response.data);
      setFilteredItems(response.data);
      setCategories([
        "all",
        ...new Set(response.data.map((item) => item.category)),
      ]);
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
    handleSortChange(sortOption, filtered);
    setSelectedCategory(category);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItem = [...products];
    switch (option) {
      case "a-z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-hight":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "hight-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItem.sort((a, b) => a.price - b.price);
        break;
    }
    setFilteredItems(sortedItem);
  };

  //Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        {/* Filter */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {categories.map((category, index) => {
            return (
              <button
                key={index}
                className={`${
                  selectedCategory === category ? "active" : ""
                } px-4 py-2 rounded-full`}
                onClick={() => filterItems(category)}
              >
                <p className="capitalize">{category}</p>
              </button>
            );
          })}
        </div>
        {/* Sort Options */}
        <div className="flex justify=end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <select
              name="sortOption"
              id="sortOption"
              className="bg-black text-white px-2 rounded-sm"
              onChange={(e) => handleSortChange(e.target.value, filteredItems)}
            >
              <option value="default">Default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="low-to-hight">Low to Hight</option>
              <option value="hight-to-low">Hight to Low</option>
            </select>
          </div>
        </div>
        {/* ProductList */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.length > 0 &&
            currentItems.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
        </div>

      </div>     
         {/* Pagination */}
         <div className="section-container flex flex-row items-center justify-center my-8 flex-wrap gap-2">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index + 1 ? "bg-red text-white" : ""
              } px-4 py-2 rounded-full`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
};

export default ProductList;
