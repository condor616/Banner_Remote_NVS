/*
JSON File:
 - TemplateType: 
       - 0: specialEventTemplate
	   - 1: lllCarousel
*/


(function($){
	
	
	// --------------------- Global Variables -------------------------------
	var pointer;
	var _jsonData; //it contains the JSON object
	var numberOfScenes;
	var currentScene;
	
	var _defaultTemplates = [
		"/templates/specialEventTemplate.html",
		"/templates/lllCarousel.html",
		"/templates/lllCarousel-2.html"
	]
	
	var currentTemplate;
	
	
	// --------------- Methods -------------------------------------
	var methods = {

		//init
		init: function(settings){
			
			pointer = this;
			
			_defaultSettings = {
				feed: "/js/data1.json",
			}
			//overwrite the default values with the variables
			if (settings) $.extend(_defaultSettings, settings);	
			
			//load the JSON file and create the _json object
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
					numberOfScenes = _jsonData.Entries.length;
					currentScene = 1;
					//Load the first TemplateType from the JSON file
					currentTemplate = _jsonData.Entries[0].TemplateType;
					
					methods.loadTemplate(pointer, _defaultTemplates[currentTemplate], function(){
						methods.draw(currentScene);
					});
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
			
			/*
			If the JSON file contains only one entry, then remove the arrows
			*/
			if (_jsonData.Entries.length == 1){
				$('div.nvs_banner a.nav').remove();
			}
			
			
			//now we call the appropriate draw function based on what specified within the JSON file
			switch (_jsonData.Entries[sceneNumber-1].TemplateType){
				
				case 0: //specialEventTemplate
				
					//IMAGE
					$('div.nvs_banner img').attr('src',_jsonData.Entries[sceneNumber-1].Image);
	
					//TITLE
					$('div.metadata').find('h2').html(_jsonData.Entries[sceneNumber-1].Title.Text).css('color', _jsonData.Entries[sceneNumber-1].Title.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Title.Size +'px');
		
				
					//DESCRIPTION
					$('div.metadata').find('h3').html(_jsonData.Entries[sceneNumber-1].Description.Text).css('color', _jsonData.Entries[sceneNumber-1].Description.Color, 'font-size', _jsonData.Entries[sceneNumber-1].Description.Size+'px');
		
					//create all the links	
			
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
					
					
					//remove the class="ACTIVE" from all the buttons
					var clearActiveClasses = function(){
						$('div#subpages-nav div.buttons div').each(
							function(){
								if ($(this).hasClass('active')){
									$(this).removeClass('active');
								}
							}
						);
					}
					
					
					//apply hover event to buttons within the special event banner
					$('div#subpages div.buttons div').hover(
						function($e){
							clearActiveClasses();
					
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
					
			
			// -------------------------------------------------------- END EVENT BINDING ---------------------------------------------------------------
			
					$('div#subpages-nav div.buttons div').first().mouseover();

					break;
					
					
					case 2: //lllCarousel-2
					
						//IMAGE
						$('div.nvs_banner img').attr('src',_jsonData.Entries[sceneNumber-1].Image);
						
						//LLL-Wrapper field
						if (_jsonData.Entries[sceneNumber-1].LLLwrapper.Left != "")
							$('div.lll-wrapper').css('left', _jsonData.Entries[sceneNumber-1].LLLwrapper.Left);
						
						if (_jsonData.Entries[sceneNumber-1].LLLwrapper.Top != "")
							$('div.lll-wrapper').css('top', _jsonData.Entries[sceneNumber-1].LLLwrapper.Top);
						
						//TITLE
						$('div.lll-metadata').find('h2').html(_jsonData.Entries[sceneNumber-1].Title.Text);
						
						if (_jsonData.Entries[sceneNumber-1].Title.Size != "")
							$('div.lll-metadata').find('h2').css('font-size', _jsonData.Entries[sceneNumber-1].Title.Size);
						
						
						//DESCRIPTION
						$('div.lll-metadata').find('div.desc').html(_jsonData.Entries[sceneNumber-1].Description.Text);
						
						if (_jsonData.Entries[sceneNumber-1].Description.Width != "")
							$('div.lll-metadata').find('div.desc').css('width', _jsonData.Entries[sceneNumber-1].Description.Width);
						if (_jsonData.Entries[sceneNumber-1].Description.Size != "")
							$('div.lll-metadata').find('div.desc').css('font-size', _jsonData.Entries[sceneNumber-1].Description.Size);
						
						
						//LINK
						$('div.lll-link').find('a').html(_jsonData.Entries[sceneNumber-1].Link.Text);
						$('div.lll-link').find('a').attr('href', _jsonData.Entries[sceneNumber-1].Link.Url);
						$('div.lll-link').find('a').attr('target', _jsonData.Entries[sceneNumber-1].Link.Target);
						
						if (_jsonData.Entries[sceneNumber-1].Link.Color != "")
							$('div.lll-link').find('a').css('color', _jsonData.Entries[sceneNumber-1].Link.Color);		
							
						
						//SHARE BUTTONS
						/*
						for (var i=0; i<_jsonData.Entries[sceneNumber-1].ShareButtons.length; i++){
							$('div.share-buttons').append("<a href=\""+ _jsonData.Entries[sceneNumber-1].ShareButtons[i].Url +"\" target=\"_blank\"><div class=\""+ _jsonData.Entries[sceneNumber-1].ShareButtons[i].ButtonType +"\"></div></a>");
						}
						*/
						if ( (_jsonData.Entries[sceneNumber-1].ShareButtons.Twitter == "yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Twitter == "Yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Twitter == "YES" ) && 
							_jsonData.Entries[sceneNumber-1].ShareButtons.TwitterUrl != ""){
								
								$('div.share-buttons').append("<a href=\"" + _jsonData.Entries[sceneNumber-1].ShareButtons.TwitterUrl + "\">Twitter</a>");
						}
						if ( (_jsonData.Entries[sceneNumber-1].ShareButtons.Share == "yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Share == "Yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Share == "YES" )  && 
							_jsonData.Entries[sceneNumber-1].ShareButtons.ShareUrl != ""){
								
								$('div.share-buttons').append("<a href=\"" + _jsonData.Entries[sceneNumber-1].ShareButtons.ShareUrl + "\">Share</a>");
						}
						if ( (_jsonData.Entries[sceneNumber-1].ShareButtons.Email == "yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Email == "Yes" ||
							_jsonData.Entries[sceneNumber-1].ShareButtons.Email == "YES" )  && 
							_jsonData.Entries[sceneNumber-1].ShareButtons.EmailUrl != ""){
								
								$('div.share-buttons').append("<a href=\"" + _jsonData.Entries[sceneNumber-1].ShareButtons.EmailUrl + "\">Email</a>");
						}


					break;
				
			
				} //end first switch-case
				
				

				
				//HERE YOU CAN INSERT OTHER DRAW-TEMPLATE CASES
			

			
			
//         --------------------------------------------- Navigation Arrows EVENTS BINDING -------------------------------------------------------------

			

			//apply click event to arrows (if any arrow exists)
			if (numberOfScenes >1){
				$('div.nvs_banner a.next').click(function(e) {
					$(pointer).find('div.nvs_banner').empty();
					
					if(currentScene == numberOfScenes){
						currentScene = 1;
						//methods.draw(currentScene);
					}else{
						currentScene++;
					}
					
					currentTemplate = _jsonData.Entries[currentScene-1].TemplateType;
					
					methods.loadTemplate(pointer, _defaultTemplates[currentTemplate], function(){
						methods.draw(currentScene);
					});
						
				});
			
				$('div.nvs_banner a.prev').click(function(e) {
					$(pointer).find('div.nvs_banner').empty();
					if (currentScene == 1){
						currentScene = numberOfScenes;
						//methods.draw(currentScene);
					}else{
						currentScene--;
					}	
					
					currentTemplate = _jsonData.Entries[currentScene-1].TemplateType;
					
					methods.loadTemplate(pointer, _defaultTemplates[currentTemplate], function(){
						methods.draw(currentScene);
					});
						
				});
			}
			// -------------------------------------------------------- END EVENT BINDING ---------------------------------------------------------------
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