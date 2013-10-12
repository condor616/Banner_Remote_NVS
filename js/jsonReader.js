(function($){
	
	//Variables
	
	//var feed = 'data.json';
	
	//Methods
	var methods = {
		
		loadData: function(feed){	
			$.ajax({
				type: 'GET',
				url: feed,
				crossDomain: true,
				cache: false,
				dataType: 'json',
				success: function(data){
					alert("JSON Loaded successfully");
					methods.render(data);
				},
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				
				}
			});
		},
		
		render: function(data){
		
		}
			
	};//close Methods object
	
	
	
		
	
	$.fn.jsonReader = function(feed){
		methods.loadData(feed);
	}
	
	
})( jQuery );