export interface Step {
    id: number;
    recipeId: number;
    content: string;
    imageUrl?: string;
    isStepOpen: boolean;
}
