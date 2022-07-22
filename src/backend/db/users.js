import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: bcyrpt.hashSync("johnDoe@123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
    addresses: [
      {
        _id: uuid(),
        label: "home",
        addresseeName: "Chanandler bong",
        phoneNumber: 7749858984,
        pincode: 123456,
        fullAddress: "123 yemen street, Yemen",
        city: "Yemen city",
        state: "Yemen state",
      },
    ],
    orders: [
      {
        _id: uuid(),
        totalPrice: 2999,
        orderedProducts: [
          {
            _id: uuid(),
            name: "Kashmir willow",
            brand: "Sunridges",
            categoryName: "Bats",
            available: 10,
            ratings: 4.5,
            price: 2999,
            prevPrice: 4999,
            badgeText: "",
            inStock: false,
            new: false,
            desc: "",
            imgSrc:
              "https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw1d96f170/images/59989901/Rebel_59989901_blue_hi-res.jpg?sw=233&sh=233&sm=fit",
          },
          {
            _id: uuid(),
            name: "Cobra 500 Junior Cricket Bat",
            brand: "Gray Nicolls",
            categoryName: "Bats",
            available: 10,
            ratings: 3.5,
            price: 9999,
            prevPrice: 14999,
            badgeText: "",
            inStock: true,
            new: false,
            desc: "",
            imgSrc:
              "https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw1d96f170/images/59989901/Rebel_59989901_blue_hi-res.jpg?sw=233&sh=233&sm=fit",
          },
        ],
        deliveryAddress: {
          _id: uuid(),
          label: "home",
          addresseeName: "Chanandler bong",
          phoneNumber: 7749858984,
          pincode: 123456,
          fullAddress: "123 yemen street, Yemen",
          city: "Yemen city",
          state: "Yemen state",
        },
        createdAt: formatDate(),
      },
    ],
  },
];
