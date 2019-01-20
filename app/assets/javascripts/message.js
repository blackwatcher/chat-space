$(function(){
  function buildHtml(msg){
    var imgHtml = msg.image.url ? `<img src="${msg.image.url}" class="lower-message__image">` : ""
    var msgHtml = `
    <div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">${msg.user_name}</div>
        <div class="upper-message__date">${msg.created_at}</div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">${msg.content}</p>
        ${imgHtml}
      </div>
    </div>`;
    return msgHtml;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var msgArea = $(this);
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
      $messages = $('.messages').append(html), msgArea[0].reset(), $messages.animate({ scrollTop: $messages[0].scrollHeight }, 1500)
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $(".form__submit").removeAttr("disabled");
    })
  })
});
