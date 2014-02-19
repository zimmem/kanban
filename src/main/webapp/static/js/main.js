$(function(){
    
	var WaterFlowView = Backbone.View.extend({
		className : 'water-flow-container',
		initialize : function(){
			this.$el.html('hello world');
			console.info(this.$el);
		},
		events : {
			'click' : 'onClick'
		},
		onClick : function(){
			console.info('click');
			this.$el.html(new Date().toString());
		}
	}); 
	
	new WaterFlowView();
	
});