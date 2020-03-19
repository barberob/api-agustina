import $ from 'jquery';
import template from './templates/currency.hbs';


export default class Currency {

    constructor() {
        
        var selectedCurrency = 'ethereum';
        this.datas = [];
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
            downvotes : $('div.js-downvotes'),
            upvotes : $('div.js-upvotes'),
            downvotes_score : $('.js-downvotes p'),
            upvotes_score : $('.js-upvotes p'),
            low_high  :$('.js-low_high'),

            container : $('.js-all_currency_container')
            
        }
    }

    initEvents(selectedCurrency) {

        this.loadCurrency(selectedCurrency);
        this.changeCurrencyListener();
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

            this.datas.push(response[0]);
            console.log("load done " ,this.datas);
            this.loadCurrencyInfos(currencyName);

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


            this.datas.push(response); 
            console.log("loadinfo done", this.datas);
            this.processData();
            
        });
    }

    renderCurrency(currencyValues) {

        this.$els.logo.attr('src', currencyValues.image);
        this.$els.shortname.text(currencyValues.symbol);
        this.$els.name.text(currencyValues.name);
        this.$els.price.text(currencyValues.current_price + " €");
        this.$els.low_high.text("Low/High 24h : " + currencyValues.high_24h + " / " + currencyValues.low_24h );
        console.log("LOG: Currency -> renderCurrency -> currencyValues.low_24h", currencyValues.low_24h);
        console.log("LOG: Currency -> renderCurrency -> currencyValues.high_24h", currencyValues.high_24h);

        //style
        let price_change = (currencyValues.price_change_24h);
        if (price_change > 0) {
            this.$els.price.css('color','#77DD77');
            this.$els.triangle.removeClass('down');
            this.$els.triangle.addClass('up');

        } else if (price_change < 0){
            this.$els.price.css('color','#FF6961');
            this.$els.triangle.removeClass('up');
            this.$els.triangle.addClass('down');

        } else{
            this.$els.prce.css('color','white');
            this.$els.triangle.css('display','none');
        }
    }

    renderCurrencyInfos(currencyInfos) {

        this.$els.rank.html("Market cap rank : " + currencyInfos.market_cap_rank);
        
        this.$els.upvotes.css('width',`${currencyInfos.sentiment_votes_up_percentage}%`);
        this.$els.downvotes.css('width',`${currencyInfos.sentiment_votes_down_percentage}%`) ;
        
    }

    processData() {

        console.log('process called');
        if(typeof(this.datas[1].sentiment_votes_up_percentage) != 'number') {

            this.datas[1].sentiment_votes_up_percentage = '?';
            this.datas[1].sentiment_votes_down_percentage = '?';
            this.$els.upvotes.css('width',`50%`);
            this.$els.downvotes.css('width',`50%`);

        }else if( this.datas[1].sentiment_votes_up_percentage == 100) {

            this.datas[1].sentiment_votes_up_percentage = '100%'
            this.datas[1].sentiment_votes_down_percentage = '';

        }else if( this.datas[1].sentiment_votes_down_percentage == 100) {

            this.datas[1].sentiment_votes_down_percentage = '100%'
            this.datas[1].sentiment_votes_up_percentage = '';    
        }else { 

            this.datas[1].sentiment_votes_up_percentage += '%';
            this.datas[1].sentiment_votes_down_percentage += '%';
        }

        this.renderCurrency();
    }

    renderCurrency() {

        var rendered = template(this.datas);
        this.$els.container.append(rendered);

        //style 
        this.$els.upvotes.css('width', this.datas[1].sentiment_votes_up_percentage);
        this.$els.upvotes_score.css('width', this.datas[1].sentiment_votes_up_percentage);
        this.$els.downvotes.css('width', this.datas[1].sentiment_votes_down_percentage);

        // if(typeof(this.datas[1].sentiment_votes_up_percentage) != 'number') {

        //     this.$els.upvotes.css('width',`50%`);
        //     this.$els.downvotes.css('width',`50%`);

        // }




    }

    changeCurrencyListener() {

        $('body').on('click','.js-list_item', (event) => {
            
            this.datas.length = 0;
            this.$els.container.empty();

            let selected = $(event.currentTarget).attr('data-id');
            this.loadCurrency(selected);
        });        
    }


}