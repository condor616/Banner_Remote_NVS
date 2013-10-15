

(function($){
	
	
	// --------------------- Global Variables -------------------------------
	var pointer;
	var _jsonData; //it contains the JSON object
	


	
	//-------------------------END Global Variables ---------------------------------------
	
	
	
	// --------------- Methods -------------------------------------
	var methods = {

		//init
		init: function(settings){
			
			pointer = this;
			
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
					_jsonData = data;
					methods.draw(1);
				},
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				
				}
			});
		},
		
		
		
		
		//render
		render: function(data){
			_numberOfEntries = _jsonData.Entries.length;
			alert('There are ' + _numberOfEntries + ' entries' );
			//methods.createScenes();
			
			alert("JSON Loaded successfully");
		},
		
		
		
		
		
		/*
		createScenes: function(){
			//cycling through the main JSON file and recognizing each single entry
			for (var i=0; i<_jsonData.Entries.length; i++){
				_jsonScenes.push(_jsonData.Entries[i]);
			}
		},
		*/
		
		
		
		
		
		/*
		The following method is responsible to draw a scene. The number of the scene is passed as parameter.
		*/
		draw: function(sceneNumber){
			
			/*
			We have to read data from the _jsonData object (the position is determined by sceneNumber)
			*/
			
			
			// Draw the html page here
			$(pointer).append($('<img width=\"971\" height=\"347\" src=\"' +_jsonData.Entries[sceneNumber-1].Image + '\">'));	
		}
			
	};
	// ------------------- END Methods -------------------------------
	
	
	$.fn.jsonReader = function(method){
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}
		if (typeof method == "object" || ! method){
			return methods.init.apply(this,arguments);
		}else{
			$.error(' Method ' + method + ' doesn\'t exist on Jquery.jsonreader');
		}
	}
	
	
})( jQuery );