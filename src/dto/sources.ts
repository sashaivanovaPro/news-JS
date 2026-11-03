import type { ErrorResponseDto } from './errors';

export interface SourceDto {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

export interface SourcesResponseDto {
    readonly status: 'ok';
    readonly sources: readonly SourceDto[];
}

export type SourcesApiResponseDto = SourcesResponseDto | ErrorResponseDto;
