
var current;
var speed = 800;
var thumbnailContainerWidth = 0;
var thumbnailContainerWidthSet = false;
var images;
var queue = [];

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

    if (!thumbnailContainerWidthSet) {
      calculateThumbnailContainerWidth();
    }
    
    var newImage;
    if (e.keyCode == 37) {
      newImage = current - 1 >= 0 ? current - 1 : current;
    }
    else if (e.keyCode == 39) {
      newImage = current + 1 < images.length ? current + 1 : current;
    }
    else {
      return;
    }

    //updatePhotoRoll(newImage);
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

function updatePhotoRoll(imageId) {

  var thumbnail = $('.thumbnail:eq(' + imageId + ')');

  if (imageId !== 0 && typeof(thumbnail.offset()) === 'undefined')
    return;

  var offset = imageId === 0 ? 153 : thumbnail.offset().left;
  var thumbContainer = $('.thumbnail-outer-container');

  var outerWidth = thumbContainer.width() / 2;
  var left = thumbContainer.scrollLeft() + (offset - 140 - outerWidth);

  thumbContainer.animate({ scrollLeft: left });

  $('.thumbnail:eq(' + current + ')').removeClass('active');

  current = imageId;

  $('.thumbnail:eq(' + current + ')').addClass('active');
}

function setImage(imageId) {

  if (imageId == current)
    return;

  updatePhotoRoll(imageId);

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

  addToQueue(newImage);

}

function addToQueue(image) {
  if (queue.length > 0) {
    for (var i = 0; i < queue.length; i++) {
      queue[i].unbind('load');
    }
  }
  queue.push(image);
}
