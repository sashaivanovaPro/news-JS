export interface ErrorResponseDto {
    readonly status: 'error';
    readonly code: string;
    readonly message: string;
}
