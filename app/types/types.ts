import { DateTime } from "next-auth/providers/kakao";

type Author = {
  id: number;
  name: string;
  description: string;
  profile_icon: string;
};

type BookType = {
  id: string;
  title: string;
  content: string;
  thumbnail: {
    url: string;
  };
  price: number;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: DateTime;
  user: User;
};

type FormData = {
  email: string;
  password: string;
};

export type { Author, BookType, User, FormData, Purchase };
