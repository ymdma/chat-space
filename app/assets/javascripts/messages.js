$(function(){

  //追加するHTMLの記述
  function buildHTML(message){

    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `${message.image}` : "";

    var html =`<div class="message" data-message-id=${message.id}>
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${content}
                  </p>
                  <img src=${img}>
                </div>
              </div>`
              return html;
  }


  //インクルメンタルサーチ
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    //.ajax 送信するデータ
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //.done
    .done(function(data){
        var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
    })
    //.fail
    .fail(function(){
      alert('エラーが起きました')
    });
    return false;
  });

  //自動更新
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages", //api/message_controllerに処理を飛ばす
      type: 'get',//ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json',
      data: {id: last_message_id}//dataオプションでリクエストに値を含める
    })

    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);//メッセージを追加
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
    })
    .fail(function () {
      alert('自動更新に失敗しました');//ダメだったらアラートを出す
    });
  };
  //自動読み込み(msec)
  if (document.URL.match("/messages")){
    setInterval(reloadMessages, 5000);// *ここにメッセージ画面でのみ自動更新するための 条件分岐を追記する
  }
});