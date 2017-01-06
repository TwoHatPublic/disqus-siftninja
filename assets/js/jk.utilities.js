var Utilities = (function ($) {
    // 2016
    // @jessekorzan
    // emptycan.com
    
   
	var jk = {};
/* --------------------------------------------------	
-------------------------------------------------- */

    // ########################################
    // 
    // UTILITIES
    //
    // ########################################
    
	jk.pubSub = (function(){
		// David Walsh, genius advice
		// https://davidwalsh.name/pubsub-javascript
		var topics = {},
			hOP = topics.hasOwnProperty;
		return {
			subscribe: function(topic, listener) {
				// Create the topic's object if not yet created
				if(!hOP.call(topics, topic)) topics[topic] = [];
		
				// Add the listener to queue
				var index = topics[topic].push(listener) -1;
		
				// Provide handle back for removal of topic
				return {
					remove: function() {
						delete topics[topic][index];
					}
				};
			},
			publish: function(topic, info) {
				// If the topic doesn't exist, or there's no listeners in queue, just leave
				if(!hOP.call(topics, topic)) return;
		
				// Cycle through topics queue, fire!
				topics[topic].forEach(function(item) {
					item(info != undefined ? info : {});
				});
			}
		}
	})();
	jk.mustache = (function(){
    	var options = {};
    	
    	return {
        	output : function (options) {
			    var render = Mustache.to_html($(options.template).html(), options.data);
			    if (options.replace) {
    			    $(options.container).html(render);
			    } else if (options.after) {
    			    $(options.container).after(render);
			    } else if (options.prepend) {
    			    $(options.container).prepend(render);
                } else {
    			    $(options.container).append(render);
                }
            }
		}
	})();
	jk.toolTip = (function(){
    	var options = {};
    	
    	return {
        	wrapper : ("body .ui-tool-tip"),
        	create : function() {
            	var _toolTip = $("<div/>").addClass("ui-tool-tip");
            	$("body").append(_toolTip);
        	},
        	destroy : function() {
            	$(jk.toolTip.wrapper).remove();
        	},
        	position : function (target) {
            
                
             
            	$(jk.toolTip.wrapper).css({
                    top : target.offset().top - ($(jk.toolTip.wrapper).outerHeight() + 12) + "px",
                    left : target.offset().left - (target.outerWidth()/2) + "px"
                });
                               
        	},
        	render : function (options) {
                var _mouse = {};
                                
                
                if ($(jk.toolTip.wrapper).length < 1) {
                    jk.toolTip.create();
                }
                                
                Utilities.toolTip.position(options.target);
                
                Utilities.mustache.output({
                    container : $(".ui-tool-tip"),
                    template : options.template,
                    data : {}
                });
                
            }
		}
	})();
	jk.getJSON = (function(){
    	var options = {};
    	
    	return {
        	process : function (options) {
                var options = (typeof options !== "object") ? {} : options;
                
                $.ajaxSetup({ async: true, cache: false });
                $.ajax ({
                    //dataType : "json",
                    url: options.url,
                    data: options.data,
                    headers: {
                        "Authorization": options.authorization
                    },
                    success: function (data) { 
                		options.callBack(data);
                	},
                    error: function(e) {
                	    console.error(e);
                	    $("body").append("<mark>" + e.responseText + "</mark>");
                	}
                });
            }
        }
        
	})();      
    return jk;
})(jQuery);