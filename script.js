
var current;
var speed = 800;
var thumbnailContainerWidth = 0;
var thumbnailContainerWidthSet = false;
var images;

$(document).ready(function() {

  console.log(images);
  $('.thumbnail-inner-container .thumbnail img').load(function() {
    thumbnailContainerWidth += ($(this).width() + 65);
  });


  $.getJSON('images.json')
    .done(function(data) {
      console.log(data);
      images = data;
      createThumbnails();
      setImage(0);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log(error);
    });

  $('.thumbnail').click(function(e) {
    var id = $(this).attr('id');
    var el = $(this);
    setImage(el.data('image-id'));
  });

  $('.button').click(function(e) {

    e.preventDefault();

    if (!thumbnailContainerWidthSet) {
      $('.thumbnail-inner-container').css('width', thumbnailContainerWidth + 'px');
      thumbnailContainerWidthSet = true;
    }

    var thumbContainer = $('.thumbnail-outer-container');


    if ($(this).hasClass('scroll-left')) {
        scrollAmount = -(thumbContainer.width());
    }
    else {
      scrollAmount = thumbContainer.width();
    }

    var curScroll = thumbContainer.scrollLeft();
    var newScroll = curScroll + scrollAmount;

    if (newScroll > thumbnailContainerWidth) {
      thumbContainer.animate({ scrollLeft: thumbnailContainerWidth });
      return;
    }

    thumbContainer.animate({ scrollLeft: newScroll });
  });


});

function createThumbnails() {

  for (var i = 0; i < images.length; i++) {
    $('.thumbnail-inner-container').append('<div class="thumbnail" id="image-' + i + '" data-image-id="'+ i +'"><img class="vertical" src="thumbs/thumb-' + images[i] +'" /></div>')
  }

}
function setImage(imageId) {

  if (imageId == current)
    return;
  current = imageId;

  $('.image-container img').remove();

  var newImage = $('<img />').attr('src', 'img/' + images[imageId]);

  newImage.load(function() {

    $('.image-container img').remove();

    console.log(newImage);

    var height = newImage[0].height;
    var width = newImage[0].width;

    var containerHeight = $('.image-container').height();
    var left = $('.image-container').width() / 2 - (width * (containerHeight / height) / 2);

    if (height > width) {
      newImage.addClass('vertical');
      newImage.css('left', left);
    }
    else if (height > containerHeight) {
      newImage.addClass('horizontal-extra-wide');
      newImage.css('left', left);
    }
    else {
      newImage.addClass('horizontal');

    }

    $('.image-container')
      .append(newImage)
      .hide()
      .fadeIn(speed)
  })

}
