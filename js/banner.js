
$(document).ready(
	function(){
		
		//remove all active class
		var removeAllActiveClasses = function(){
			$('div#subpages-nav div.buttons div').each(
				function(){
					if ( $(this).hasClass('active') ){
						$(this).removeClass('active');
					}			
				}
  			);
		}
		
		
		//the first button becomes active onLoad, and Title & Description get set (for the first button)
		$firstImg = $('div#subpages-nav div.buttons div').first();
		$firstImg.addClass('active');
		$('div.intros span.introTitle').html("Title 1");
		$('div.intros span.introDesc').html("Desc 1");
		
		
		//hide all the title and text
		$('div#subpages-nav div.buttons div span.title').css('display','none');
		$('div#subpages-nav div.buttons div span.desc').css('display','none');
		
		
		//Applying hover event to buttons
		$('div#subpages-nav div.buttons div').hover(
		
			function($e){
				removeAllActiveClasses();
				
				//select the "title" and "desc" tag you want to apply
				var title = $(this).find('span.title').text();
				var desc = $(this).find('span.desc').text();
				
				//set active
				$(this).addClass('active');	
				//apply title and desc to the right place
				$('div.intros span.introTitle').html(title);
				$('div.intros span.introDesc').html(desc);
				
			},
			function($e){
				
			}
		
		);
		
		
		
	}
);
