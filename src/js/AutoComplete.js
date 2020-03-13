import $ from 'jquery';


export default class AutoComplete{

    constructor()
    {
        this.initElements();
        this.initEvents();
        console.log('construct');   
    }

    initElements() {
        this.$els = {

            container : $('div.js-autoComplete'),
            propositions : $('div.js-autoComplete p').toArray(),
            input : $('#input')
        }
        console.log('els');
        
    }

    initEvents() {
        // this.input.addEventListener('input', updateCompletion);
        console.log($('#input'));
        
    }

    updateCompletion(e) {

        // let search = e.target.value.toLowerCase();
        // let results = [bitcoin,ethereum,zcash];
        // console.log('trigger completion');

        // for (i = 0; i < results.length; i++)
        // {
        //     if (results[i].includes(search))
        //     {
        //         console.log(results[i]);
        //     }
        // }
        console.log('ok');
    }
}