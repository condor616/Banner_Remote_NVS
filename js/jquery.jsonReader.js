

(function($){
	
	
	// --------------------- Global Variables -------------------------------
	var pointer;
	var _jsonData; //it contains the JSON object
	
	
	// --------------- Methods -------------------------------------
	var methods = {

		//init
		init: function(settings){
			
			pointer = this;
			
			_defaultSettings = {
				feed: "/js/data.json",
				template: "/templates/template1.html"
			}
			//overwrite the default values with the variables
			if (settings) $.extend(_defaultSettings, settings);	
			
			//methods.loadTemplate(_defaultSettings.template);
			$(pointer).load(_defaultSettings.template, function(){
				methods.loadData(_defaultSettings.feed)
			});
		},
		
		/*
		loadTemplate: function(template){
			$(pointer).load(template,methods.loadData(_defaultSettings.feed));
		},
		*/
		
		
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
		


		/*
		The following method is responsible to draw a scene. The number of the scene is passed as parameter.
		*/
		draw: function(sceneNumber){
			
			
			//remove the class="ACTIVE" from all the buttons
			var removeAllActiveClasses = function(){
				$('div#subpages div.buttons div').each(
					function(){
						if ($(this).hasClass('active')){
							$(this).removeClass('active');
						}
					}
				);
			}
			
			
			//We have to read data from the _jsonData object (the position is determined by sceneNumber)
			
			//IMAGE
			$('div#nvs_banner img').attr('src',_jsonData.Entries[sceneNumber-1].Image);
			
			//DIVs
			//$('<div class=\"content\"></div>').insertAfter('div#nvs_banner img').append('<div class=\"metadata\"></div>');				
			
			//TITLE
			$('div.metadata').find('h2').html(_jsonData.Entries[sceneNumber-1].Title.Text).css('color', _jsonData.Entries[sceneNumber-1].Title.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Title.Size +'px');
		
				
			//DESCRIPTION
			$('div.metadata').find('h3').html(_jsonData.Entries[sceneNumber-1].Description.Text).css('color', _jsonData.Entries[sceneNumber-1].Description.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Description.Size+'px');
		
			
			//Let's create the link-list 
			//How many links?
			//console.log("There are " + _jsonData.Entries[sceneNumber-1].Links.length + " links");
			
			
			
			for (i=0; i<_jsonData.Entries[sceneNumber-1].Links.length; i++){
				
				
				$('div.link-list').append('<a class=\"'  + _jsonData.Entries[sceneNumber-1].Links[i].Type + 
										  '\" href=\"'   + _jsonData.Entries[sceneNumber-1].Links[i].Url + 
										  '\" target=\"' + _jsonData.Entries[sceneNumber-1].Links[i].Target + 
										  '\">'          + _jsonData.Entries[sceneNumber-1].Links[i].Text +
										  '</a>');
				
			}
			
			
			//$('<div id=\"subpages-wrapper\"></div>').insertAfter('div.metadata').append('<div id=\"subpages\"></div>');
			//$('div#subpages').append('<div class=\"metadata\"></div>');
			
			
			//At firt page load, introTitle and introDescription are set to the value contained in the first subpage.
			$('div#subpages div.metadata').find('span#subpages-title').html(_jsonData.Entries[sceneNumber-1].Subpages[0].introTitle);
			$('div#subpages div.metadata').find('span#subpages-description').html(_jsonData.Entries[sceneNumber-1].Subpages[0].introTitle);
												  
			
			//$('<div id=\"subpages-nav\"></div>').insertAfter('div#subpages div.metadata');
			//$('div#subpages-nav').append('<div class=\"buttons\"></div>');
			
			
			//Cycle through the button list and draw
			
			for (var j=0; j<_jsonData.Entries[sceneNumber-1].Subpages.length; j++){
				
				$('div.buttons').append('<div class=\"icon-' + _jsonData.Entries[sceneNumber-1].Subpages[j].iconType + '\"></div>');
				
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"title hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"desc hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"subpages-title hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"subpages-description hidden\"></span>');
			}
			
			
		
			
			//apply hover event to buttons
			$('div#subpages div.buttons div').hover(
				function($e){
					removeAllActiveClasses();
					
					//which button am I?
					var index = $(this).index();
					//console.log(index);
					
					$(this).addClass('active');	
					$('div.intros span.introTitle').html(_jsonData.Entries[sceneNumber-1].Subpages[index].iconTitle);
					$('div.intros span.introDesc').html(_jsonData.Entries[sceneNumber-1].Subpages[index].iconDescription);
					$('div#subpages div.metadata span#subpages-title').html(_jsonData.Entries[sceneNumber-1].Subpages[index].introTitle);
					$('div#subpages div.metadata span#subpages-description').html(_jsonData.Entries[sceneNumber-1].Subpages[index].introDescription);
				}
			
			);
			$('div#subpages-nav div.buttons div').first().addClass('active').trigger('mouseover');

			
	
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