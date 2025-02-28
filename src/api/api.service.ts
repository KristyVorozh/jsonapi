import { TAuthBody } from "../types/api.types";

export const getInfo = async () => {
  try {
    const response = await fetch("/api/info");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};

export const getProfileInfo = async (token: string) => {
  try {
    const response = await fetch(`/api/profile?token=${token}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};

export const getAuthorInfo = async (token: string) => {
  try {
    const response = await fetch(`/api/author?token=${token}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};

export const getQuoteInfo = async (token: string, authorId: string) => {
  try {
    const response = await fetch(
      `/api/quote?token=${token}&authorId=${authorId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};

export const postAuth = async (body: TAuthBody) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};

export const logoutApi = async (token: string) => {
  try {
    const response = await fetch(`/api/logout?token=${token}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
};
