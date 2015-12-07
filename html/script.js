
var current;
var speed = 450;
var thumbnailContainerWidth = 0;
var thumbnailContainerWidthSet = false;
var images;
var queue = [];
var spinner;

$(document).ready(function() {

  var parameter = parseInt(location.search.split('image=')[1]);
  current = $.isNumeric(parameter) ? parseInt(parameter) : 0;

  $.getJSON('images.json')
    .done(function(data) {
      images = data;
      $('<img />').attr('src', 'img/' + images[0]);
      setImage(current, true);
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

    setImage(newImage, false);

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
    setImage(el.data('image-id'), false);
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

function updateUrl() {
  var urlHistory = { Title: 'Photo Gallery', Url: '?image=' + current };
  history.pushState(urlHistory, urlHistory.Title, urlHistory.Url);
}

function setImage(imageId, first) {
  console.log(imageId);

  if (imageId == current && first == false)
    return;

  createSpinner();
  updatePhotoRoll(imageId);
  updateUrl();

  var newImage = $('<img />').attr('src', 'img/' + images[imageId]);

  newImage.load(function() {

    updateCounter();
    stopSpinner();
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

function updateCounter() {
    $('.counter').html('<span>' + (current + 1) + ' / ' + images.length + '</span>');
}

function createSpinner(element) {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 18, // The length of each line
        width: 5, // The line thickness
        radius: 20, // The radius of the inner circle
        corners: 0.9, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fafafa', // #rgb or #rrggbb or array of colors
        speed: 1.2, // Rounds per second
        trail: 86, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };

    if (spinner) {
        spinner.stop();
    }

    var target = document.getElementsByClassName('image-container')[0];
    spinner = new Spinner(opts).spin(target);
}

function stopSpinner() {
    spinner.stop();
}
