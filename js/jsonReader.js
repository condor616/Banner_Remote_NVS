(function($){
	
	//Variables
<<<<<<< HEAD
	
=======
	//var feed = 'data.json';
>>>>>>> origin/Banner_Remote_NVS
	
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
<<<<<<< HEAD
				}
				/* --- ERROR DEBUGGING ------ 
				,
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				}
				*/
=======
				},
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				
				}
>>>>>>> origin/Banner_Remote_NVS
			});
		},
		
		render: function(data){
		
<<<<<<< HEAD
		}
			
	};//close Methods object
	
	
	
=======
		}	
	};//close Methods object
	
>>>>>>> origin/Banner_Remote_NVS
	$.fn.jsonReader = function(feed){
		methods.loadData(feed);
	}
	
	
})( jQuery );