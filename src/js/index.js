import '../css/app.scss';
import Currency from './Currency';
import AutoComplete from './AutoComplete.js';


class App {
    constructor () {
        this.initApp();      
    }

    initApp () {
      // Start application
      new Currency();
      new AutoComplete();
    }
}

new App();
