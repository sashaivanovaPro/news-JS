import App from './app';
import AppController from '../controller/controller';
import AppLoader from '../controller/appLoader';
import NewsApi from '../api/newsApi';
import { AppView } from '../view/appView';
import News from '../view/news/news';
import Sources from '../view/sources/sources';

function createApp(): App {
    const loader = new AppLoader();
    const api = new NewsApi(loader);
    const controller = new AppController(api);
    const news = new News();
    const sources = new Sources();
    const view = new AppView(news, sources);

    return new App(controller, view);
}

export default createApp;
