import $ from 'jquery';

export default class Currency {

 
    constructor() {
        
        var selectedCurrency = 'ethereum';
        this.initElements();
        this.initEvents(selectedCurrency);
    }
    


    initElements() {

        this.$els = {

            logo : $('.js-logo'),
            shortname : $('.js-shortname'),
            name : $('.js-name'),
            price : $('.js-price'),
            triangle : $('.js-triangle'),
            
            submit : $('.submit')
        }
    }


    initEvents(selectedCurrency) {

        this.loadCurrency(selectedCurrency);
        submit.click(function(){
            
        });
    }


    loadCurrency(currencyName) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${currencyName}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,

            "method": "GET",
           
        }
        var response;

        $.ajax(settings).then((response) => {

            // console.log(response[0]);
            this.renderCurrency(response[0]);
    
        });
        
        
    }

    renderCurrency(currencyValues) {

        console.log(currencyValues);

        this.$els.logo.attr('src', currencyValues.image);
        
        this.$els.shortname.text(currencyValues.symbol);
        this.$els.name.text(currencyValues.name);
        this.$els.price.text(currencyValues.current_price);

        let price_change = (currencyValues.price_change_24h);

        //style
        if (price_change > 0) {
            this.$els.price.css('color','green');

            this.$els.triangle.removeClass('down');
            this.$els.triangle.addClass('up');


        } else if (price_change < 0){
            this.$els.price.css('color','red');

            this.$els.triangle.removeClass('up');
            this.$els.triangle.addClass('down');

        } else{
            this.$els.prce.css('color','white');
            this.$els.triangle.css('display','none');
        }
    }
}