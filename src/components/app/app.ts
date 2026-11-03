import type AppController from '../controller/controller';
import type { AppView } from '../view/appView';
import { getRequiredElement } from '../view/dom';

class App {
    private readonly controller: Pick<AppController, 'getSources' | 'getNews'>;

    private readonly view: Pick<AppView, 'drawNews' | 'drawSources'>;

    public constructor(
        controller: Pick<AppController, 'getSources' | 'getNews'>,
        view: Pick<AppView, 'drawNews' | 'drawSources'>
    ) {
        this.controller = controller;
        this.view = view;
    }

    public start(): void {
        const sourcesContainer = getRequiredElement(document, '.sources', HTMLElement);

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data): void => this.view.drawNews(data));
        });
        this.controller.getSources((data): void => this.view.drawSources(data));
    }
}

export default App;
