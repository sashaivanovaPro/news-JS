import type { ArticlesResponseDto, SourcesResponseDto } from '../../dto';
import type NewsApi from '../api/newsApi';

class AppController {
    private readonly api: Pick<NewsApi, 'getSources' | 'getNews'>;

    public constructor(api: Pick<NewsApi, 'getSources' | 'getNews'>) {
        this.api = api;
    }

    public getSources(callback: (data: SourcesResponseDto) => void): void {
        this.api.getSources(callback);
    }

    public getNews(event: Event, callback: (data: ArticlesResponseDto) => void): void {
        const target = event.target;
        const newsContainer = event.currentTarget;

        if (!(target instanceof Element) || !(newsContainer instanceof Element)) {
            return;
        }

        const sourceElement = target.closest('.source__item');

        if (!sourceElement || !newsContainer.contains(sourceElement)) {
            return;
        }

        const sourceId = sourceElement.getAttribute('data-source-id');

        if (!sourceId || newsContainer.getAttribute('data-source') === sourceId) {
            return;
        }

        newsContainer.querySelector('.source__item[aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
        sourceElement.setAttribute('aria-pressed', 'true');
        newsContainer.setAttribute('data-source', sourceId);
        this.api.getNews(sourceId, callback);
    }
}

export default AppController;
