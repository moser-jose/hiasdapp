import { categoryImagesAntigo, categoryImagesNovo, logoApp } from "@/constants/images";

const novo=true;

const categoryImages=novo?categoryImagesAntigo:categoryImagesNovo
export const getBackgroundSource = (category: string) =>
        categoryImages[category as keyof typeof categoryImages] || logoApp;