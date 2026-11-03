type QueryParams = Readonly<Record<string, string>>;

interface LoaderRequest {
    readonly endpoint: string;
    readonly options?: QueryParams;
}

type ResponseCallback = (data: unknown) => void;

class Loader {
    private readonly baseLink: string;

    private readonly options: QueryParams;

    public constructor(baseLink: string, options: QueryParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: LoaderRequest,
        callback: ResponseCallback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: QueryParams, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: 'GET', endpoint: string, callback: ResponseCallback, options: QueryParams = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<unknown> => res.json())
            .then((data: unknown): void => callback(data))
            .catch((err: unknown): void => console.error(err));
    }
}

export default Loader;
