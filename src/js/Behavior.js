import $ from 'jquery';
var bool_open = false;

export default class Behavior {

    constructor() {
        
        this.initElements();
        this.initEvents();
    }
    
    initElements() {
        
        this.$els = {
            
            button_container : $('div.js-button_container'),
            menu_button : $('div.js-menu_button'),
            menu : $('div.js-side_menu'),
            menu_text : $('p.js-menu_text'),
            list_item : $('.js-list_item')
        }
    }

    initEvents() {

        this.toggleMenu();
    }


    toggleMenu() {

        $('body').on('click','.js-list_item', () => {

            this.$els.menu.removeClass('open');
            this.$els.menu_button.removeClass('open');
            bool_open = false;
            console.log("k");
            
            this.$els.menu_text.text('menu');

        });

        this.$els.menu_button.click(() => {
            
            if (bool_open == false) {

                this.$els.menu.addClass('open');
                this.$els.menu_button.addClass('open');
                bool_open = true;

                this.$els.menu_text.text('close');
            }
            else {
                
                this.$els.menu.removeClass('open');
                this.$els.menu_button.removeClass('open');
                bool_open = false;
                
                this.$els.menu_text.text('menu');
            }    
        });

    }
}