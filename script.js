
var current;
var speed = 800;

$(document).ready(function() {
  console.log(images);

  setImage(0);

  $.getJSON('data.json')
  .done(function(data) {
    console.log(data);
  })
  

  $('.thumbnail').click(function(e) {
    var id = $(this).attr('id');
    var el = $(this);
    setImage(el.data('image-id'));
  });


});

function setImage(imageId) {

  if (imageId == current)
    return;
  current = imageId;

  $('.image-container img').remove();

  var newImage = $('<img />').attr('src', images[imageId] + '.jpg');
  console.log(newImage);


  var height = newImage[0].height;
  var width = newImage[0].width;

  if (height > width) {
    newImage.addClass('vertical');
  }
  else {
    newImage.addClass('horizontal');
  }

  var container = $('.image-container');
  var containerHeight = container.height();
  var containerWidth = container.width();

  var left = $('.image-container').width() / 2 - (width * (containerHeight / height) / 2);
  console.log(left);
  console.log(newImage);
  newImage.css('left', left);

  $('.image-container')
    .append(newImage)
    .hide()
    .fadeIn(speed)

}
