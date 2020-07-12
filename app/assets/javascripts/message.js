$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = `<div class="Main_chat__lists__log">
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
      let html = `<div class="Main_chat__lists__log">
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
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })

  })
});


