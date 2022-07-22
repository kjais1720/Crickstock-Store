import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";
/**
 * All the routes related to Address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's cart.
 * send GET Request at /api/user/address
 * */
export const getAddressesHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userAddresses = schema.users.findBy({ _id: userId }).addresses;
  return new Response(200, {}, { addresses: addresses });
};

/**
 * This handler handles adding items to user's address list.
 * send POST Request at /api/user/address
 * body contains {product}
 * */

export const addNewAddressesHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddresses = schema.users.findBy({ _id: userId }).addresses;
    const { address } = JSON.parse(request.requestBody);
    userAddresses.push({
      ...address,
      _id:uuid(),
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update({ _id: userId }, { addresses: userAddresses });
    return new Response(201, {}, { addresses: userAddresses });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing items to user's cart.
 * send DELETE Request at /api/user/address/:addressId
 * */

export const removeAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  const { addressId } = request.params;
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddresses = schema.users.findBy({ _id: userId }).addresses;
    userAddresses = userAddresses.filter((item) => item._id !== addressId);
    this.db.users.update({ _id: userId }, { addresses: userAddresses });
    return new Response(200, {}, { addresses: userAddresses });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding items to user's cart.
 * send POST Request at /api/user/address/:addressId
1 * */

export const updateAddressHandler = function (schema, request) {
  const { addressId } = request.params;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddresses = schema.users.findBy({ _id: userId }).addresses;
    const { updatedAddress } = JSON.parse(request.requestBody);
    userAddresses = userAddresses.map((address) =>
      address._id === addressId
        ? { ...address, ...updatedAddress }
        : address
    );
    this.db.users.update({ _id: userId }, { addresses: userAddresses });
    return new Response(200, {}, { addresses: userAddresses });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
