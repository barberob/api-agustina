import $ from 'jquery';
var bool_open = false;

export default class Behavior {

    constructor() {
        
        this.initElements();
        this.initEvents();
    }
    
    initElements() {
        
        this.$els = {
            
            transition : $('div.js-transition'),
            button_container : $('div.js-button_container'),
            menu_button : $('div.js-menu_button'),
            menu : $('div.js-side_menu'),
            menu_text : $('p.js-menu_text'),
            items : $('.js-list_item').toArray(),
            body : $('body')

        }
    }

    initEvents() {

        this.toggleMenu();
    }

    toggleMenu() {

        
        this.$els.button_container.click(() => {
            
            if (bool_open == false) {
                
                this.$els.menu.addClass('open');
                this.$els.menu_button.addClass('open');
                this.$els.menu_text.text('close');
                bool_open = true;
                
            } else {
                
                this.$els.menu.removeClass('open');
                this.$els.menu_button.removeClass('open');
                this.$els.menu_text.text('menu');
                bool_open = false;
            }    
        });


        $('body').on('click','.js-list_item', () => {

            this.$els.menu.removeClass('open');
            this.$els.menu_button.removeClass('open');
            bool_open = false;
            this.$els.menu_text.text('menu');
        });
    }
}