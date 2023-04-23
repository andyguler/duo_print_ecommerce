import data from "../data/data.json";

const getProductById = (id) => {
    console.log(data)
  return data.produse.find((prod) => prod.id === id);
};

const getProductsByType = (type) => {
  return data.produse.filter(prod => prod.type === type )
}

const filterProductsBySizes = (sizesArr, unfilteredArr) => {
  let filteredArr = [...unfilteredArr];
  sizesArr.forEach(size => filteredArr = filteredArr.filter(prod => prod.size.includes(size)));
  return filteredArr;
}

const filterProductByPriceRange = (min, max, unfilteredArr) => {
  if(min === "" || max === "") return unfilteredArr;
  if(min === undefined || min === null || min === NaN || max === undefined || max === null || max === NaN)return unfilteredArr;
  return unfilteredArr.filter(prod => prod.price >= min && prod.price <= max)
}

export { getProductById, getProductsByType, filterProductsBySizes, filterProductByPriceRange };
