$(document).ready(function(){
runapp();

});
function runapp(){
 $(".dropdown-button").dropdown();
flipbackground();
$(document).on('scroll', function (e) {
    flipbackground();      
});
 $('#autocomplete-input').autocomplete({
    data: {
      "Tombraider Lara Croft Yah": 'css/img/trial2.jpg',
      "Metalgear Solid": 'css/img/trial3.jpg',
      "Resident evil": 'css/img/trial4.jpg',
      "Parasite Eve":'css/img/trial5.jpg',
      "Abstract logo":'css/img/logo.png',
      "Preview":'css/img/preview.jpg'
    },
    limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
    $('.carousel').carousel();
}

function flipbackground(){
if( $(document).scrollTop() < 200){
$('.topbar').addClass('topbarwhite',function(){
    $(this).addClass('nobx');
});
$('nav ul a').addClass('topbarcolorblack');
} else{
     $('.topbar').removeClass('topbarwhite',function(){
         $(this).removeClass('nobx')
     });
     $('nav ul a').removeClass('topbarcolorblack'); 
    }
}