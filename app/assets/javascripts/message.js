$(function(){
  function buildHtml(msg){
    if (msg.content && msg.image.url) var t = '<div class="message"><div class="upper-message"><div class="upper-message__user-name">' + msg.user_name + '</div><div class="upper-message__date">' + msg.created_at + '</div></div><div class="lower-message"><p class="lower-message__content">' + msg.content + '</p><img src="' + msg.image.url + '" class="lower-message__image" ></div></div>';
    else if (msg.content) var t = '<div class="message"><div class="upper-message"><div class="upper-message__user-name">' + msg.user_name + '</div><div class="upper-message__date">' + msg.created_at + '</div></div><div class="lower-message"><p class="lower-message__content">' + msg.content + "</p></div></div>";
    else if (msg.image.url) var t = '<div class="message"><div class="upper-message"><div class="upper-message__user-name">' + msg.user_name + '</div><div class="upper-message__date">' + msg.created_at + '</div></div><div class="lower-message"><img src="' + msg.image.url + '" class="lower-message__image" ></div></div>';
    return t
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var n = $(this);
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHtml(data);
      console.log(html)
      $messages = $('.messages').append(html), n[0].reset(), $messages.animate({ scrollTop: $messages[0].scrollHeight }, 1500)
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $(".form__submit").removeAttr("disabled");
    })
  })
});