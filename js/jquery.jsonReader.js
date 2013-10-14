(function($){
	
	
	//Variables
	var jsonData; //it contains the JSON object
	
	
	//Methods
	var methods = {
		
		
		//init
		init: function(settings){
			
			_defaultSettings = {
				feed: "/js/data.json"
			}
			
			//overwrite the default values with the variables
			if (settings) $.extend(_defaultSettings, settings);	
			
			methods.loadData(_defaultSettings.feed);
		},
		
		
		//loaddata
		loadData: function(feed){	
			$.ajax({
				type: 'GET',
				url: feed,
				crossDomain: true,
				cache: false,
				dataType: 'json',
				success: function(data){
					methods.render(data);
				}
				,
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				
				}
			});
		},
		
		//render
		render: function(data){
			jsonData = data;
			alert("JSON Loaded successfully");
		}
			
	};//close Methods object
	
	
	
		
	
	$.fn.jsonReader = function(method){
		
		if (typeof method == "object" || ! method){
			return methods.init.apply(this,arguments);
		}else{
			$.error(' Method ' + method + ' doesn\'t exist on Jquery.jsonreader');
		}
	}
	
	
})( jQuery );