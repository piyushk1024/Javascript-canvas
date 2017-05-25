$(document).ready( function (){
  //Initial setup set canvas dimensions, and create Reset button
  var h = 800;
  var w = 800;

  $('body').append('<input type = submit id = B value = Reset>')
  $('#B').css({'height':'64px',
              'width':'160px',
              'background-color':'DarkSlateGray',
              'margin-left':($(window).width()-64)/2+'px', //try to position in the middle of the page
              'margin-bottom':'16px',
              'border':'none'});

  // Function to setup the 'pixels' with given dimensions. Start with 80x80 divs
  function create_pix(p){
    var gap = ($(window).width()-800)/2; //margin calculations
    $('#B').after('<div class = container></div>');
    $('.container').css({'height':'800px',
                        'width':'800px',
                        'outline':'1px solid black',
                        'margin-left':gap+'px'});

    var pix_size =Math.floor(800/p); //In case dimension is not a factor of canvas size
    //Create the pixel divs with loop
    for (var i = 0; i < p*p; i++ ){
      $('.container').append('<div class = pixel></div>');
    }
    //set the pixel apearance properties, color set to white
    $('.pixel').css({'height':pix_size +'px',
                      'width':pix_size +'px',
                      'display':'inline-block',
                      'background-color':'rgb(255,255,255)'});
    }
    //Initial call to function when the page is loaded
  create_pix(10);
  // Code for reset button
  $('#B').on('click', function (){
    var pixc = '0';
  // Messy check to ensure user enters number between 1 and 100
    while (((!$.isNumeric(pixc) || (pixc < 1) || (pixc > 100)))){
      pixc = prompt("Enter no. of pixel in one side (0-100)");
    }
  //Remove existing pixels to clean the slate
    $('.container').remove('*');
    create_pix(pixc);
  });

  $(document).on('mouseenter', '.pixel',function(){

    var prescol = $(this).css('background-color') //Stores the present color
    //if color is white => first visit, choose random color
    if (prescol==="rgb(255, 255, 255)"){
      var r = Math.floor(Math.random()*255);
      var g = Math.floor(Math.random()*255);
      var b = Math.floor(Math.random()*255);

      $(this).css('background-color','rgb('+r+','+g+','+b+')');
    }
    //Repeat visit, gradually darken color to black (by halving the RGB value)
    else{
      var r = prescol.slice(4,-1).split(',')[0]; //extract r value from color string
      var g = prescol.slice(4,-1).split(',')[1];
      var b = prescol.slice(4,-1).split(',')[2];
      r = Math.floor(r/2);
      g = Math.floor(g/2);
      b = Math.floor(b/2);
      $(this).css('background-color','rgb('+r+','+g+','+b+')'); //set darkened color
    }

  });



});
