$(function() {
	//////////////////// Scrollspy///////////////////////////////
	/////////////////////////////////////////////////////////////

	// $('body').scrollspy({ target: '#navbarNav', offset: -100});
	$('a.nav-link').on('click', function(evt) {
		if(this.hash !== "") {
			evt.preventDefault();
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});
		}
	});

/////////////////////OVL Carusell /////////////////////////
///////////////////////////////////////////////////////////

$('.owl-carousel').owlCarousel({
	video:true,
	stagePadding: 20, //80
	margin:10,
	loop:true,
	// 	stopOnHover : true,
		center:true,
		navigation:true,
		pagination:true,
	// 	singleItem : true,
	// 	autoHeight : true,
		responsive: true,
		// responsiveRefreshRate : 200,
		//  responsiveBaseWidth: window, 
		//  transitionStyle:"fade",
    //  onTranslate: function() {
    //    $('.owl-item').find('video').each(function() {
    //      this.pause();
    //    });
    // },
	merge:true,
	// lazyLoad:true,

	responsive:{
		0:{
			items:1
		},
		766:{
			items:2,
			stagePadding: 50,
		},
		992:{
			items:3,
			stagePadding: 120,
		},
		1200:{
			items:3,
			stagePadding: 120,
		}
	}
});

///////////////////POPUP modal//////////////////////////////
////////////////////////////////////////////////////////////

	// Example starter JavaScript for disabling form submissions if there are invalid fields
	window.addEventListener('load', function() {

		$('.modWind').on('shown.bs.modal', function () {
			$('#telInput').focus();
		})

		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					event.preventDefault();
					var tel = $('input[name=tel]').val();
					var message = $('textarea[name=subject]').val();
					var send = true;
					
					if(tel == ""){ 
						send = false;
					}
					if(message == ""){ 
						send = false;
					}
					if(send) {
						dannie = { 'polz_tel':tel, 'text':message };
						$.post('/mail.php', dannie, function(otvet){ 
							rezultat = otvet.text;
							$("#form_result").hide().html(rezultat).slideDown();
						}, 'json'); 
					}
				}
				form.classList.add('was-validated');
			}, false);
		});	
	}, false);


var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
  }
);
wow.init();
});