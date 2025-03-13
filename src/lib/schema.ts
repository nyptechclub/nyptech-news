export type Article = {
  id: string;
  cover?: string;
  name: string;
  tags: string[];
  excerpt: string;
  club: string[];
  writtenBy: {
    avatar: string;
    name: string;
  }[];
  modifiedAt: Date;
  createdAt: Date;
};