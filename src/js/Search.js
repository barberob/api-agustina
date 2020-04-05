import $ from 'jquery';

export default class Search {

    constructor() {

        this.initEvents();
    }

    initEvents() {
        
        this.sortCurrencyByName();
    }
    
    sortCurrencyByName() {

        $('body').on('input', '.js-search', (event) => {

            let formated_search = event.currentTarget.value.toLowerCase();

            $(".js-list_item").each(function(i) {

                let content = $(this).find("p.item_name").text().toLowerCase();

                if(content.includes(formated_search) == false) {

                    $(this).css('display','none');

                } else {

                    $(this).css('display','flex');
                }
            });
        });

        $('body').on('click', '.js-list_item',() => {

            $('.js-search').val('');

            $(".js-list_item").each(function(i) {

                $(this).css('display','flex');
            });

            
        });

    }
}