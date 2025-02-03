export const getUserProfile = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateUserAvatar = async (token, formData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/avatar`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  return response;
};
