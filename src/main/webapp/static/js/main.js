$(function(){
    
	var CARD_WIDTH = 256;
	
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	
	
	
	var TaskModel = Backbone.Model.extend({
		initialize : function(){ 
			console.info(this);
		},
		events : {
			'change' : 'onChange'
		},
		urlRoot : '/tasks',
		validate : function(attrs, options){
			if(!attrs.title && !attrs.content){
				return "task empty";
			}
		},
		onChange : function(){
			if(!this.isNew()){
				this.save();
			}
		}
	});
	
	var TaskCard = Backbone.View.extend({
		className : 'kb-task-card',
		initialize : function(){
			this.render();
		},
		render : function(){
			if(!this.model){
				throw 'model is null';
			}
			this.$el.html (template.render('card_template', this.model.toJSON()));
		}
	});
	
	var MaskLayer = Backbone.View.extend({
		className : 'mask',
		initialize : function(){
			this.$el.appendTo('body');
		},
		show : function(){
			this.$el.show();
		},
		hide : function(){
			this.$el.hide();
		}
	});
	
	var mask = new MaskLayer();
	
	var ModeDialog = Backbone.View.extend({
		initialize : function(){
			this.$el.addClass('mode-dialog');
			var that = this;
			mask.$el.click(function(){
				that.close();
			});
		},
		open : function(){
			var parentWidth = this.$el.offsetParent().innerWidth();
			var width = this.$el.outerWidth();
			var left = (parentWidth - width) / 2;
			this.$el.css({left : left});
			mask.show();
			this.$el.show();
		},
		close : function(){
			
			if(this.beforeClose){
				this.beforeClose();
			}
			
			this.$el.hide();
			mask.hide();
		}
	});
	
	
	var CreateTaskDialog = ModeDialog.extend({
		el:'#kb-create-controll',
		
		events : {
			'keyup textarea' : 'onContentChange',
			'change form' : 'onChange'
		},
		initialize : function(option){
			ModeDialog.prototype.initialize.apply(this);
			this.contentText = this.$el.find('textarea.kb-task-content');
			this.contentClone = this.$el.find('div.kb-task-content');
			this.form = this.$el.find('form');
		},
		onContentChange : function(e){
			this.contentClone.text(this.contentText.val());
			this.contentText.height( this.contentClone.height());
		},
		open : function(option){
			
			this.form[0].reset();
			this.onContentChange();
			var now = new Date();
			var day = ("0" + now.getDate()).slice(-2);
			var month = ("0" + (now.getMonth() + 1)).slice(-2);
			var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
			this.$el.find('.date-input').val(today);
			this.task = (option && option.task) || new TaskModel();
			if(this.task.isNew()){
				var task = this.task;
				task.once('sync', function(){
					waittingLane.addCard(new TaskCard({model:task}));
				});
			}
			
			ModeDialog.prototype.open.apply(this);
		},
		onChange : function(e){
			var obj = this.form.serializeObject();
			this.task.set(obj);
		},
		beforeClose : function(){
			if(this.task.isNew()){
				this.task.save();
			}
		}
	});
	
	var createTaskDialog = new CreateTaskDialog({el:'#kb-create-controll'});
	
	var WaterFlowView = Backbone.View.extend({
		initialize : function(option){
			
			var url = option.tasksUrl;
			var that = this;
			$.get(url, function(data){
				$.each(data, function(i, task){
					that.addCard(new TaskCard({model:new TaskModel(task)}));
				});
			});
			this.waterflow();
			var that = this;
			$(window).resize(function(){
				that.waterflow();
			});
			
			var cards = this.$el.find('.kb-task-card');
			_.each(cards, function(card){
				$(card).height(Math.random()*200 + 100);
			});
		},
		events : {
			
		},
		waterring : false,
		waterInfo : {},
		waterflow : function(){
			
			if(this.waterring){
				return;
			}
			
			this.waterring = true;
			
			
			
			this.waterInfo.clumnCount = parseInt(this.$el.width() / CARD_WIDTH );
			this.waterInfo.lastRowBottom = [];
			
			var that = this;
			this.waterInfo.maxHeight = 0;
			
			var cards = this.$el.find('.kb-task-card');
			$.each(cards, function(i, card){
				var $card = $(card);
				if(i < that.waterInfo.clumnCount ){
					//$card.offset({top : 0, left : i * $card.outerWidth(true)});
					$card.css('-webkit-transform', 'translate('+ i * $card.outerWidth(true)+ 'px, 0px)');
					that.waterInfo.lastRowBottom[i] = $card.outerHeight(true);
					that.waterInfo.maxHeight = that.waterInfo.maxHeight > that.waterInfo.lastRowBottom[i] ? that.waterInfo.maxHeight : that.waterInfo.lastRowBottom[i]; 
					
				}else{
					var shortestClumn = that.getShortestClumn(that.waterInfo.lastRowBottom);
					//$card.offset({top : lastRowBottom[shortestClumn], left : shortestClumn * $card.outerWidth(true)});
					$card.css('-webkit-transform', 'translate('+ shortestClumn * $card.outerWidth(true) +'px, '+ that.waterInfo.lastRowBottom[shortestClumn] +'px)');
					that.waterInfo.lastRowBottom[shortestClumn] += $card.outerHeight(true);
					that.waterInfo.maxHeight = that.waterInfo.maxHeight > that.waterInfo.lastRowBottom[shortestClumn] ? that.waterInfo.maxHeight : that.waterInfo.lastRowBottom[shortestClumn]; 
				}
			});
			
			this.waterring = false;
		},
		getShortestClumn : function(lastRowBottom){
			var bottom = lastRowBottom[0];
			var shortestClumn = 0 ;
			$.each(lastRowBottom, function(i, cb ){
				if(cb < bottom ){
					shortestClumn = i ;
				}
			});
			return shortestClumn;
		},
		addCard : function(card){
			this.$el.append(card.$el);
			this.waterflow();
		}
	}); 
	
	var waittingLane = new WaterFlowView({el : '#waitting-lane', tasksUrl : '/tasks/current-waitting'});
	var processingLane = new WaterFlowView({el : '#processing-lane', tasksUrl : '/tasks/current-processing'});
	
	$('#createbtn').click(function(){
		createTaskDialog.open();
	});
});