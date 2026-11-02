import AppController from '../controller/controller';
import AppLoader from '../controller/appLoader';
import NewsApi from '../api/newsApi';
import { AppView } from '../view/appView';

class App {
    constructor() {
        const api = new NewsApi(new AppLoader());
        this.controller = new AppController(api);
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
