export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    ttl: number;

    /*** In seconds **/
    expires_in: number;
    token_type: string;
}
