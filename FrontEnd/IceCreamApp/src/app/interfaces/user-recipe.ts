export interface UserRecipe {
    id: number;
    userId: number;
    name?: string;
    recipeId: number;
    recipeName?: string;
    recipeDescription?: string;
    submissionDate: Date;
    isSelected: boolean;
    recipeCount?: number;
}
