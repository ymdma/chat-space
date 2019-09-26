$(function() {

var search_list = $('#user-search-result');
var chat_group_user = $('#chat-group-member'); //仕込み チャットメンバーのフィールド

  // // HTML追加の関数

  // 検索結果
  function appendUser(user) {

    html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
            </div>`
    search_list.append(html);
  }

  function adduser(name,user_id) {

    html = `<div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${user_id}'>
            <p class='chat-group-user__name'>${name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>`
    chat_group_user.append(html);
  }

    // 検索の結果がなかった場合
  function appendErrMsgToHTML(msg) {
    var html = `<li>
                  <div id='chat-group-user clearfix'>${ msg }</div>
                </li>`
    search_list.append(html);
  }

  // // keyup時にテキストフィールドの文字を取得して変数inputに代入する
  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

      // 返ってきたjsonに対しての処理
    .done(function(users) {
      search_list.empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがいません");
        }
      })
    .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
  })
  $(document).on("click",".chat-group-user__btn--add", function(){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    adduser(name,user_id);
    $(this).parent().remove();
  });

  $(document).on("click",".js-remove-btn", function(){
    $(this).parent().remove();
  });
});
