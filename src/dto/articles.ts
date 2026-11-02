import type { ErrorResponseDto } from './errors';

export interface ArticleDto {
    readonly source: ArticleSourceDto;
    readonly author: string | null;
    readonly title: string;
    readonly description: string | null;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export interface ArticleSourceDto {
    readonly id: string | null;
    readonly name: string;
}

export interface ArticlesResponseDto {
    readonly status: 'ok';
    readonly totalResults: number;
    readonly articles: readonly ArticleDto[];
}

export type ArticlesApiResponseDto = ArticlesResponseDto | ErrorResponseDto;
