$(function() {

  // 候補ユーザのHMTL作成
  var search_list = $("#user-search-result");
  function appendUser(user) {
  	var html = `<div class="chat-group-user clearfix">
  	              <p class="chat-group-user__name">` + user.name + `</p>
  	              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="` + user.id + `" data-user-name="` + user.name + `">追加</a>
                </div>`
    search_list.append(html);
  };

  function addUser(id, name) {
  	var addUser = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-` + id + `">
  	                 <input type="hidden" name="group[user_ids][]" value="` + id + `">
  	                 <p class="chat-group-user__name">` + name + `</p>
  	                 <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="` + id + `">削除</a>
  	                </div>`
  	return addUser
  };

  // ユーザ検索と候補表示
  function searchUser(input) {
  	$.ajax({
      type: 'GET',
      url: '/groups/new',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      console.log(users);
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
    var input = $("#user-search-field").val();
    searchUser(input);
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
});