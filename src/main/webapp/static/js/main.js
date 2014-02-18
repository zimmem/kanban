$(function(){
//        var culomns = $('.culomn');
//        var cards = $('.card');
//        cards.each(function(i,o){
//            $(o).height(Math.random()*200 + 200);
//            $(o).text(i);
//            console.info(o);
//            var min = 9999999999;
//            var minc = $(culomns[0]);
//            culomns.each(function(i2, c ){
//                
//                if(min > $(c).height()){
//                    min = $(c).height();
//                    minc  = $(c);
//                }
//                console.info(min);
//            });
//
//            minc.append($(o));
//        });
    
    var Menu = Backbone.View.extend({
        el : '#menu',
        events : {
            'click': 'hide',
            'click a' : function(e){console.info(e);} 
        },
        show : function(){
            this.$el.fadeIn();
        },
        hide : function(){
            this.$el.fadeOut();
            return false;
        }
    });
    var menu = new Menu();
    
    var Body = Backbone.View.extend({
        el : 'body'
    });
    
    new Body();
});