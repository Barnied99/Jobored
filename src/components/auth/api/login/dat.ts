export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    ttl: number;

    expires_in: number;
    token_type: string;
}
