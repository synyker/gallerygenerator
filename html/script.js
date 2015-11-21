
var current;
var speed = 800;
var thumbnailContainerWidth = 0;
var thumbnailContainerWidthSet = false;
var images;

$(document).ready(function() {

  $.getJSON('images.json')
    .done(function(data) {
      images = data;
      $('<img />').attr('src', 'img/' + images[0]);
      setImage(0);
      createThumbnails();
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log(error);
    });


  $('body').keydown(function(e) {
    var newImage;
    var direction = 0;
    if (e.keyCode == 37) {
      newImage = current - 1 >= 0 ? current - 1 : current;
      direction = -1;
    }
    else if (e.keyCode == 39) {
      newImage = current + 1 < images.length ? current + 1 : current;
      direction = +;
    }
    else {
      return;
    }

    var thumbContainer = $('.thumbnail-outer-container');
    var left = thumbContainer.scrollLeft() + (direction * ($('.thumbnail:eq(' + current + ')').width() + 10 + 50));
    thumbContainer.animate({ scrollLeft: left });

    setImage(newImage);



  });

  $('.button').click(function(e) {

    e.preventDefault();

    if (!thumbnailContainerWidthSet) {
      calculateThumbnailContainerWidth();
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

function calculateThumbnailContainerWidth() {
  $('.thumbnail-inner-container .thumbnail img').each(function() {
    thumbnailContainerWidth += ($(this).width() + 65);
  });

  $('.thumbnail-inner-container').css('width', thumbnailContainerWidth + 'px');
  thumbnailContainerWidthSet = true;
}

function createThumbnails() {

  for (var i = 0; i < images.length; i++) {
    $('.thumbnail-inner-container').append('<div class="thumbnail" id="image-' + i + '" data-image-id="'+ i +'"><img class="vertical" src="thumbs/thumb-' + images[i] +'" /></div>')
  }

  $('.thumbnail').click(function(e) {
    var el = $(this);
    setImage(el.data('image-id'));
  });

}
function setImage(imageId) {

  if (imageId == current)
    return;

  $('.thumbnail:eq(' + current + ')').removeClass('active');

  current = imageId;

  $('.thumbnail:eq(' + current + ')').addClass('active');

  var newImage = $('<img />').attr('src', 'img/' + images[imageId]);

  newImage.load(function() {

    $('.image-container img').remove();

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
  });

}
