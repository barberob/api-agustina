import '../css/app.scss';
import Currency from './Currency';
import Behavior from './Behavior';
import ListCurrencies from './ListCurrencies';
import Search from './Search';


class App {
  
    constructor () {
        this.initApp();      
    }

    initApp () {
      // Start application
      new Currency();
      new Behavior();
      new ListCurrencies();
      new Search();
    }
}

new App();
