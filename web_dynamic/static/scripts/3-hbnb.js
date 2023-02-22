$(document).ready(function () {
    let checkedAmenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        checkedAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete checkedAmenities[$(this).data('id')];
      }
      let lst = Object.values(checkedAmenities);
      if (lst.length > 0) {
        $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="user">'+ place.user.first_name + place.user.last_name + '</div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
});
