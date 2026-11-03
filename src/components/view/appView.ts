import type { ArticlesResponseDto, SourcesResponseDto } from '../../dto';
import type News from './news/news';
import type Sources from './sources/sources';

export class AppView {
    private readonly news: Pick<News, 'draw'>;

    private readonly sources: Pick<Sources, 'draw'>;

    public constructor(news: Pick<News, 'draw'>, sources: Pick<Sources, 'draw'>) {
        this.news = news;
        this.sources = sources;
    }

    public drawNews(data?: Partial<Pick<ArticlesResponseDto, 'articles'>>): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data?: Partial<Pick<SourcesResponseDto, 'sources'>>): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
