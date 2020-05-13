$(function() {

  function buildHTML(message) {
    if ( message.image ) {
    var html = `<div class="main-chat__message">
                  <div class="main-chat__message--left">
                    ${message.user_name}
                    <div class="main-chat__message--left--item">
                      ${message.created_at}
                  </div>
                  </div>
                  <div class="main-chat__message--bottom">
                    <p class="main-chat__message--bottom__content">
                    ${message.content}
                    </p>
                    <img src=${message.image}>
                  </div>
                </div>`
    return html;
  } else {
    var html = `<div class="main-chat__message">
                  <div class="main-chat__message--left">
                    ${message.user_name}
                    <div class="main-chat__message--left--item">
                      ${message.created_at}
                  </div>
                  </div>
                  <div class="main-chat__message--bottom">
                    <p class="main-chat__message--bottom__content">
                    ${message.content}
                    </p>
                  </div>
                </div>`
    return html;
  };
  }


  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main-chat__message").append(html);
      $('.main-chat__message').animate({ scrollTop: $('.main-chat__message')[0].scrollHeight});
      $('form')[0].reset();
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});