import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Bats",
    imgSrc:
      "/assets/Bats-category.webp",
  },
  {
    _id: uuid(),
    categoryName: "Balls",
    imgSrc:
      "/assets/balls-category.webp",
  },
  {
    _id: uuid(),
    categoryName: "Shoes",
    imgSrc:
      "/assets/shoes-category.webp",
  },
  {
    _id: uuid(),
    categoryName: "All Products",
    imgSrc:
      "/assets/gears-category.png",
  }
];
