import $ from 'jquery';
import formatNumber from './helpers/numberFormating'
var actualCurrency;

export default class Currency {
    
    constructor() {
        
        let selectedCurrency = 'loopring';
        this.initElements();
        this.initEvents(selectedCurrency);
    }

    initElements() {

        this.$els = {

            logo : $('img.js-logo'),
            shortname : $('p.js-shortname'),
            name : $('p.js-name'),
            price : $('p.js-price'),
            triangle : $('div.js-triangle'),
            rank : $('p.js-rank'),
            downvotes : $('div.js-downvotes'),
            upvotes : $('div.js-upvotes'),
            downvotes_score : $('div.js-downvotes p'),
            upvotes_score : $('div.js-upvotes p'),
            supply : $('p.js-supply'),
            high : $('p.js-high_low span.green'),
            low : $('p.js-high_low span.red'),
            hider1 : $('div.js-transition1'),
            hider2 : $('div.js-transition2'),
            hiders : $('div.js-transition1, div.js-transition2'),
            currency_container : $('div.js-all_infos_container')
        }
    }


    initEvents(selectedCurrency) {

        this.loadCurrency(selectedCurrency);     
        this.changeCurrency();
    }


    loadCurrency(currencyName) {

        actualCurrency = currencyName;
        var first_settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${currencyName}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
            "method": "GET",
        }
        var second_settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.coingecko.com/api/v3/coins/${currencyName}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
            "method": "GET",       
        }

        $.ajax(first_settings).then((response) => {

            this.renderCurrency(response[0]);
            
            $.ajax(second_settings).then((response) => {
                
                this.renderCurrencyInfos(response);
            });
        });
    }

    renderCurrency(currencyValues) {

        this.$els.logo.attr('src', currencyValues.image);
        this.$els.shortname.text(currencyValues.symbol);
        this.$els.name.text(currencyValues.name);
        this.$els.price.text(formatNumber(currencyValues.current_price) + '€');
        this.$els.supply.text("Circulating supply : " + formatNumber(currencyValues.circulating_supply));
        this.$els.high.text(formatNumber(currencyValues.high_24h) + '€');
        this.$els.low.text(formatNumber(currencyValues.low_24h) + '€');
        //style
        let price_change = currencyValues.price_change_24h;
        if (price_change > 0) {
            this.$els.price.css('color','#4ec44e');
            this.$els.triangle.removeClass('down');
            this.$els.triangle.addClass('up');

        } else if (price_change < 0) {
            this.$els.price.css('color','#ff716a');
            this.$els.triangle.removeClass('up');
            this.$els.triangle.addClass('down');

        } else {
            this.$els.prce.css('color','white');
            this.$els.triangle.css('display','none');
        }
    }

    renderCurrencyInfos(currencyInfos) {

        let up = currencyInfos.sentiment_votes_up_percentage;
        let down = currencyInfos.sentiment_votes_down_percentage;

        if(typeof(up) != 'number' || typeof(down) != 'number') {

            this.$els.downvotes_score.text('?');
            this.$els.upvotes_score.text('?');
            this.$els.upvotes.css('width',`50%`);
            this.$els.downvotes.css('width',`50%`);

        }else if(up != 0 || down != 0) {

            this.$els.upvotes_score.text(`${up}%`);
            this.$els.downvotes_score.text(`${down}%`);
            this.$els.upvotes.css('width',`${up}%`);
            this.$els.downvotes.css('width',`${down}%`);
            
        }else {
            
            this.$els.upvotes.css('width',`${up}%`);
            this.$els.downvotes.css('width',`${down}%`);
        }

       
        this.$els.rank.html("Market cap rank : " + currencyInfos.market_cap_rank);

        this.animateOnceRendered();
        
    }

    changeCurrency() {
        
        $('body').on('click','.js-list_item', (event) => {
   
            let selected = $(event.currentTarget).attr('data-id');

            if(selected != actualCurrency) {

                this.$els.hiders.animate({
                height : '50vh'
                }, 500, () => {
                    
                    this.loadCurrency(selected);

                    this.$els.currency_container.animate({
                        opacity : 0 ,
                        marginBottom : '-=150px'
                    },0);
                }
                );   

            }
        });        
    }

    animateOnceRendered() {
  
        this.$els.hiders.delay(500).animate({
            height : '0vh'
        }, 750);
        this.$els.currency_container.delay(500).animate({
            opacity : 1,
            marginBottom : '0'
        },750);
    }
}