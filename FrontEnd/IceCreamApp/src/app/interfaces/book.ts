export interface Book {
    id?: number;
    title?: string;
    description?: string;
    author?: string;
    imageUrl?: string;
    price: number;
    publishedDate: Date;
    averageRating: number;
    quantityInStock: number;
}
