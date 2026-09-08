import ownerApi from "./ownerApi";

// Restaurant Owner Login
export const loginRestaurantOwner = async (
  email,
  password,
  fcmToken
) => {
  const response = await ownerApi.post(
    "/restaurant-auth/login",
    {
      email,
      password,
      fcmToken,
    }
  );

  return response.data;
};

// Restaurant Owner Register
export const registerRestaurantOwner = async (
  ownerData
) => {
  const response = await ownerApi.post(
    "/restaurant-auth/register",
    ownerData
  );

  return response.data;
};