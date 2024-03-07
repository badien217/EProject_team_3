export interface AuthResponse {
    result: boolean;
    message: string;
    token: string;
    errors: Array<string>;
}
