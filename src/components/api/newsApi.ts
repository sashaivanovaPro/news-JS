import type { ArticleDto, ArticlesResponseDto, ErrorResponseDto, SourceDto, SourcesResponseDto } from '../../dto';
import type Loader from '../controller/loader';

enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

type ResponseCallback<T> = (data: T) => void;
type ResponseValidator<T> = (data: unknown) => data is T;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
}

function isSource(value: unknown): value is SourceDto {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.description === 'string' &&
        typeof value.url === 'string' &&
        typeof value.category === 'string' &&
        typeof value.language === 'string' &&
        typeof value.country === 'string'
    );
}

function isArticle(value: unknown): value is ArticleDto {
    return (
        isRecord(value) &&
        isRecord(value.source) &&
        isNullableString(value.source.id) &&
        typeof value.source.name === 'string' &&
        isNullableString(value.author) &&
        typeof value.title === 'string' &&
        isNullableString(value.description) &&
        typeof value.url === 'string' &&
        isNullableString(value.urlToImage) &&
        typeof value.publishedAt === 'string' &&
        isNullableString(value.content)
    );
}

function isSourcesResponse(value: unknown): value is SourcesResponseDto {
    return isRecord(value) && value.status === 'ok' && Array.isArray(value.sources) && value.sources.every(isSource);
}

function isArticlesResponse(value: unknown): value is ArticlesResponseDto {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        Array.isArray(value.articles) &&
        value.articles.every(isArticle)
    );
}

function isErrorResponse(value: unknown): value is ErrorResponseDto {
    return (
        isRecord(value) &&
        value.status === 'error' &&
        typeof value.code === 'string' &&
        typeof value.message === 'string'
    );
}

class NewsApi {
    private readonly loader: Pick<Loader, 'getResp'>;

    public constructor(loader: Pick<Loader, 'getResp'>) {
        this.loader = loader;
    }

    public getSources(callback: ResponseCallback<SourcesResponseDto>): void {
        this.request(Endpoint.Sources, isSourcesResponse, callback);
    }

    public getNews(sourceId: string, callback: ResponseCallback<ArticlesResponseDto>): void {
        this.request(Endpoint.Everything, isArticlesResponse, callback, { sources: sourceId });
    }

    private request<T>(
        endpoint: Endpoint,
        validate: ResponseValidator<T>,
        callback: ResponseCallback<T>,
        options: Readonly<Record<string, string>> = {}
    ): void {
        this.loader.getResp({ endpoint, options }, (data: unknown): void => {
            if (isErrorResponse(data)) {
                throw new Error(`${data.code}: ${data.message}`);
            }

            if (!validate(data)) {
                throw new Error(`Unexpected News API response for ${endpoint}.`);
            }

            callback(data);
        });
    }
}

export default NewsApi;
