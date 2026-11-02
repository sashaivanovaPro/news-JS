import Loader from './loader';

declare const process: {
    readonly env: {
        readonly API_URL?: string;
        readonly API_KEY?: string;
    };
};

class AppLoader extends Loader {
    public constructor() {
        const baseLink = process.env.API_URL?.trim();
        const apiKey = process.env.API_KEY?.trim();

        if (!baseLink) {
            throw new Error('API_URL is missing. Set it in .env and restart the development server.');
        }

        if (!apiKey) {
            throw new Error('API_KEY is missing. Set it in .env and restart the development server.');
        }

        super(baseLink, { apiKey });
    }
}

export default AppLoader;
