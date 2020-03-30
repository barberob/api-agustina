import $ from 'jquery';
import Items from './templates/list_items.hbs';
import Currency from './Currency';

export default class ListCurrencyies {

    constructor() {
        this.initElements();
        this.initEvents();
    }

  
    
    initElements() {

        this.$els = {

            menu : $('div.side_menu')
        }
    }

    initEvents() {

        this.getItems();
    }
    getItems() {

        var settings = {

            "async": true,
            "crossDomain": true,
            "url": "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false",
            "method": "GET",
        }

        $.ajax(settings).done( (response) => {

            $(response).each((i,item) => {

				this.renderItems(item);
            })
            
        });
    }

   

    renderItems(item) {

        var rendered = Items(item);
        $('.side_menu').append(rendered);

    }


}