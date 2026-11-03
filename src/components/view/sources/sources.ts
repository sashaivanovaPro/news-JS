import type { SourceDto } from '../../../dto';
import { getRequiredElement } from '../dom';
import './sources.css';

class Sources {
    public draw(data: readonly SourceDto[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getRequiredElement(document, '#sourceItemTemp', HTMLTemplateElement);
        const container = getRequiredElement(document, '.sources', HTMLElement);

        data.forEach((item: SourceDto): void => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            getRequiredElement(sourceClone, '.source__item-name', HTMLElement).textContent = item.name;
            getRequiredElement(sourceClone, '.source__item', HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        container.append(fragment);
    }
}

export default Sources;
