import { Step } from "./step";

export interface Recipe {
    id?: number;
    name?: string;
    description?: string;
    imageUrl?: string;
    submittedBy?: string;
    steps: Step[];
    ingredient?: string;
    isShow: boolean;
}
