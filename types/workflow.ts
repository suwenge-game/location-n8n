export interface Workflow {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  isFree: boolean;
  price?: number;
  originalPrice?: number;
  author: Author;
  features: string[];
  requirements: string[];
  version: string;
  updatedAt: string;
  createdAt: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  platform: string[];
  language: string;
  screenshots?: string[];
  videoUrl?: string;
  documentation?: string;
  license: "MIT" | "Apache-2.0" | "GPL-3.0" | "Proprietary";
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  website?: string;
  workflows: number;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

export interface FilterOptions {
  category?: string[];
  price?: "free" | "paid" | "all";
  rating?: number;
  difficulty?: ("beginner" | "intermediate" | "advanced")[];
  platform?: string[];
  sortBy?: "latest" | "popular" | "rating" | "downloads";
  search?: string;
}

export interface Comment {
  id: string;
  workflowId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
}

export interface CartItem {
  workflow: Workflow;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}
