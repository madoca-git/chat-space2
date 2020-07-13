$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = `<div class="Main_chat__lists__log" data-message-id=${message.id}>
                    <div class="name-date">
                      <div class="name">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="Main_chat__lists__log" data-message-id=${message.id}>
                    <div class="name-date">
                      <div class="name">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
 
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message)
      $('.Main_chat__lists').append(html)
      $('.Main_chat__lists').animate({ scrollTop: $('.Main_chat__lists')[0].scrollHeight});
      $('form')[0].reset();
      $(".input-btn").attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });
  // let reloadMessages = function() {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   let last_message_id = $('.message:last').data("message-id") || 0;
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/messages",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
  //     if (messages.length !== 0) {
  //       //追加するHTMLの入れ物を作る
  //       let insertHTML = '';
  //       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
  //       $.each(messages, function(i, message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       //メッセージが入ったHTMLに、入れ物ごと追加
  //       $('.MessageField').append(insertHTML);
  //       $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  // setInterval(reloadMessages, 7000);
});


