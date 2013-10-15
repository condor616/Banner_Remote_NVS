
$(document).ready(
	function(){
		
		
		//TEST JSON READ
		var settings = {
			feed: "/js/data.json"
		}
		$('div#nvs_banner').jsonReader(settings);
		
		
		
		//remove all active class
		/*
		var removeAllActiveClasses = function(){
			$('div#subpages-nav div.buttons div').each(
				function(){
					if ( $(this).hasClass('active') ){
						$(this).removeClass('active');
					}			
				}
  			);
		}
		*/	
		
		/*
		//Applying hover event to buttons
		$('div#subpages-nav div.buttons div').hover(
			function($e){
				removeAllActiveClasses();
				//select the "title" and "desc" tag you want to apply
				var title = $(this).find('span.title').text();
				var desc = $(this).find('span.desc').text();
				var introTitle = $(this).find('span.subpages-title').text();
				var introDesc = $(this).find('span.subpages-description').text();
				//set active
				$(this).addClass('active');	
				//apply title and desc to the right place
				$('div.intros span.introTitle').html(title);
				$('div.intros span.introDesc').html(desc);
				
				$('div#subpages div.metadata span#subpages-title').html(introTitle);
				$('div#subpages div.metadata span#subpages-description').html(introDesc);
				
			},
			function($e){
				
			}
		);
		*/
		
		/*
		Once the page is loaded, the first button get automatically hevered
		*/
		//$('div#subpages-nav div.buttons div').first().addClass('active').trigger('mouseover');
		
		
		
		
		
		
		
	}
);
