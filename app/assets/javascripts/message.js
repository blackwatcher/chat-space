$(function() {

  var search_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">` + user.name + `</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="` + user.id + `" data-user-name="` + user.name + `">追加</a>
                </div>`
    search_list.append(html);
  };

  function addUser(id, name) {
    var addUser = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user">
                     <input type="hidden" name="group[user_ids][]" value="` + id + `">
                     <p class="chat-group-user__name">` + name + `</p>
                     <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="` + id + `">削除</a>
                   </div>`
    return addUser
  };

  function searchUser(searchUserName) {
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: searchUserName },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function(){
      alert('error');
    })
  };

  $("#user-search-field").on("keyup", function() {
    var searchUserName = $("#user-search-field").val();
    searchUser(searchUserName);
  });

  $("#user-search-result").on("click", ".js-add-btn", function() {
    var userId = $(this).data("user-id")
    var userName = $(this).data("user-name")
    var result = addUser(userId, userName);
    $(".js-add-user").append(result),
    $(this).parent().remove()
  });

  $(".js-add-user").on("click", ".js-remove-btn", function() { 
      $(this).parent(".js-chat-member").remove() 
  });

  function buildHtml(msg){
    var imgHtml = msg.image.url ? `<img src="${msg.image.url}" class="lower-message__image">` : ""
    var msgHtml = `
    <div class="message" data-id="${msg.id}" data-group_id="${msg.group_id}">
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

  function autoUpdate() {
    var message_id = $('.message:last').data('id');
    var group_id = $('.message:last').data('group_id');
    $.ajax({ 
      url: location.href,
      type: "GET",
      data: { 
        message: { 
          message_id: message_id,
          group_id: group_id 
        } 
      },
      dataType: 'json'
    })
    .done(function(data) {
      if (Object.keys(data).length !== 0) {
        data.forEach(function(msgData) { 
          var html = "";
          html += buildHtml(msgData) 
          var msgsArea = $(".messages");
          msgsArea.append(html);
          msgsArea.animate({ scrollTop: msgsArea[0].scrollHeight }, 1500);
        });
      };
    }).fail(function() { 
      alert('error');
    })
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
  });

  $(window).bind("load", function(){
    if(document.URL.match(/messages/)) {
      setInterval(autoUpdate, 5000)
    }
  });

});
