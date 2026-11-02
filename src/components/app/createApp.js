import App from './app';
import AppController from '../controller/controller';
import AppLoader from '../controller/appLoader';
import NewsApi from '../api/newsApi';
import { AppView } from '../view/appView';

function createApp() {
    const loader = new AppLoader();
    const api = new NewsApi(loader);
    const controller = new AppController(api);
    const view = new AppView();

    return new App(controller, view);
}

export default createApp;
