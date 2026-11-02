import type { ArticleDto } from '../../../dto';
import { getRequiredElement } from '../dom';
import './news.css';

class News {
    public draw(data: readonly ArticleDto[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getRequiredElement(document, '#newsItemTemp', HTMLTemplateElement);
        const container = getRequiredElement(document, '.news', HTMLElement);

        news.forEach((item: ArticleDto, idx: number): void => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) getRequiredElement(newsClone, '.news__item', HTMLElement).classList.add('alt');

            const imageUrl = item.urlToImage;
            getRequiredElement(newsClone, '.news__meta-photo', HTMLElement).style.backgroundImage = imageUrl
                ? `url("${imageUrl}")`
                : '';
            getRequiredElement(newsClone, '.news__meta-author', HTMLElement).textContent =
                item.author || item.source.name;
            getRequiredElement(newsClone, '.news__meta-date', HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getRequiredElement(newsClone, '.news__description-title', HTMLElement).textContent = item.title;
            getRequiredElement(newsClone, '.news__description-source', HTMLElement).textContent = item.source.name;
            getRequiredElement(newsClone, '.news__description-content', HTMLElement).textContent =
                item.description ?? '';
            getRequiredElement(newsClone, '.news__read-more a', HTMLAnchorElement).href = item.url;

            fragment.append(newsClone);
        });

        container.replaceChildren(fragment);
    }
}

export default News;
