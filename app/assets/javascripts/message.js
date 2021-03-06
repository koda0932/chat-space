$(function() {

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message--left:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__message').append(insertHTML);
      $('.main-chat__message').animate({ scrollTop: $('.main-chat__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  function buildHTML(message) {
    if ( message.image ) {
    var html = `
                  <div class="main-chat__message--left" data-message-id=${message.id}>
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
                `
    return html;
  } else {
    var html = `
                  <div class="main-chat__message--left" data-message-id=${message.id}>
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
                `
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

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});