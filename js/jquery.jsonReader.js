

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
				feed: "/js/data1.json",
				template: "/templates/main-template.html"
			}
			//overwrite the default values with the variables
			if (settings) $.extend(_defaultSettings, settings);	
			
			methods.loadTemplate(pointer, _defaultSettings.template, function(){
				methods.loadData(_defaultSettings.feed)
			});
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
		
		
		
		loadTemplate: function(pointer, urlTemplate, callback){
			$(pointer).load(urlTemplate, callback);
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
			
			
			/*
			If the JSON file contains only one entry, then remove the arrows
			*/
			if (_jsonData.Entries.length == 1){
				$('div#nvs_banner a.nav').remove();
			}
			

			//IMAGE
			$('div#nvs_banner img').attr('src',_jsonData.Entries[sceneNumber-1].Image);
	
			//TITLE
			$('div.metadata').find('h2').html(_jsonData.Entries[sceneNumber-1].Title.Text).css('color', _jsonData.Entries[sceneNumber-1].Title.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Title.Size +'px');
		
				
			//DESCRIPTION
			$('div.metadata').find('h3').html(_jsonData.Entries[sceneNumber-1].Description.Text).css('color', _jsonData.Entries[sceneNumber-1].Description.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Description.Size+'px');
		
			
			for (i=0; i<_jsonData.Entries[sceneNumber-1].Links.length; i++){
				
				
				$('div.link-list').append('<a class=\"'  + _jsonData.Entries[sceneNumber-1].Links[i].Type + 
										  '\" href=\"'   + _jsonData.Entries[sceneNumber-1].Links[i].Url + 
										  '\" target=\"' + _jsonData.Entries[sceneNumber-1].Links[i].Target + 
										  '\">'          + _jsonData.Entries[sceneNumber-1].Links[i].Text +
										  '</a>');
				
			}

			//At firt page load, introTitle and introDescription are set to the value contained in the first subpage.
			$('div#subpages div.metadata').find('span#subpages-title').html(_jsonData.Entries[sceneNumber-1].Subpages[0].introTitle);
			$('div#subpages div.metadata').find('span#subpages-description').html(_jsonData.Entries[sceneNumber-1].Subpages[0].introTitle);
												  
		
			//Cycle through the button list and draw
			
			for (var j=0; j<_jsonData.Entries[sceneNumber-1].Subpages.length; j++){
				
				$('div.buttons').append('<div class=\"icon-' + _jsonData.Entries[sceneNumber-1].Subpages[j].iconType + '\"></div>');
				
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"title hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"desc hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"subpages-title hidden\"></span>');
				$('div.icon-'+_jsonData.Entries[sceneNumber-1].Subpages[j].iconType+':eq(j)').append('<span class=\"subpages-description hidden\"></span>');
			}
			

			//apply click event to buttons
			$('div#nvs_banner a.nav').click(function(e) {
                //which attow am I?
				if ($(this).hasClass('next')){
					alert("You pressed the NEXT arrow");
				}
				else{
					alert("You pressed the PREV arrow");
				}
            });
		
			
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