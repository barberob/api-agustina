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
            description : $('.js-description'),
            rank : $('.js-rank'),
            downvotes : $('.js-downvotes'),
            upvotes : $('.js-upvotes'),
            downvotes_score : $('.js-downvotes p'),
            upvotes_score : $('.js-upvotes p'),
            
        
        }
    }


    initEvents(selectedCurrency) {

        this.loadCurrency(selectedCurrency);     
        this.loadCurrencyInfos(selectedCurrency);
        this.changeCurrency();
    }


    loadCurrency(currencyName) {

        console.log('called', currencyName);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${currencyName}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
            "method": "GET",
           
        }
        var response;

        $.ajax(settings).then((response) => {

            this.renderCurrency(response[0]);
        });

        
    }

    loadCurrencyInfos(currencyName) {

        console.log('infocalled', currencyName);
        

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.coingecko.com/api/v3/coins/${currencyName}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
            "method": "GET",
           
        }
        var response;

        $.ajax(settings).then((response) => {

            this.renderCurrencyInfos(response);
            
        });
    }


    renderCurrency(currencyValues) {

        this.$els.logo.attr('src', currencyValues.image);
        this.$els.shortname.text(currencyValues.symbol);
        this.$els.name.text(currencyValues.name);
        this.$els.price.text(currencyValues.current_price);

       
        //style
        let price_change = (currencyValues.price_change_24h);
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

    renderCurrencyInfos(currencyInfos) {

        this.$els.rank.html("Market cap rank: " + currencyInfos.market_cap_rank);

        this.$els.upvotes.css('width',`${currencyInfos.sentiment_votes_up_percentage}%`)
        this.$els.downvotes.css('width',`${currencyInfos.sentiment_votes_down_percentage}%`)


        if(typeof(currencyInfos.sentiment_votes_up_percentage) != 'number') {
            this.$els.downvotes_score.text('?');
            this.$els.upvotes_score.text('?');
            this.$els.upvotes.css('width',`50%`)
            this.$els.downvotes.css('width',`50%`)


        }else if( currencyInfos.sentiment_votes_up_percentage != 0) {

            this.$els.upvotes_score.text(`${currencyInfos.sentiment_votes_up_percentage}%`);
        }else{
            this.$els.downvotes_score.text('100%');
            this.$els.upvotes_score.text(' ');
        }
        //___________________________________

         if(typeof(currencyInfos.sentiment_votes_down_percentage) != 'number') {

            this.$els.downvotes_score.text('?');
            this.$els.upvotes_score.text('?');
             this.$els.upvotes.css('width',`50%`)
            this.$els.downvotes.css('width',`50%`)


        }else if( currencyInfos.sentiment_votes_down_percentage != 0) {

            this.$els.downvotes_score.text(`${currencyInfos.sentiment_votes_down_percentage}%`);

        }else{

            this.$els.downvotes_score.text('');
            this.$els.upvotes_score.text('100%');
        }

        console.log('type',typeof(currencyInfos.sentiment_votes_down_percentage));



        
    }

    changeCurrency() {

        console.log('passed');
        
        $('body').on('click','.js-list_item', (event) => {
                
            let selected = $(event.currentTarget).attr('data-id');
           
            this.loadCurrency(selected);
            this.loadCurrencyInfos(selected);
        
        });        
    }


}