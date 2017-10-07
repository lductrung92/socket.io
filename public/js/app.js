$(document).ready(function() {
    $('ul.list li').on('click', function() {
        loadBoxChat();
    });

    $('input[name=message-to-send]').on('keyup', function(e) {
        if(e.keyCode === 13) {
            var msg = $(this).val();
            $(this).val('');
            socket.emit("messages", msg);
        }
    });

    $('input[name=message-to-send]').focusin(function() {
        socket.emit('typing', true);
    });

    $('input[name=message-to-send]').focusout(function() {
        socket.emit('typing', false);
    });

    $(".chat-history ul").on('scroll', function(){
        console.log('adasd');
    });


});

function updateBoxChat()
{
    var elm = $('.chat-history');
    elm[0].scrollTop = elm[0].scrollHeight;
}

function closeBoxChat()
{
    $('.chat').hide(200);
}

function loadBoxChat()
{
    $('.chat').show(200);
    updateBoxChat();

    socket.emit("register-rom", true);

}

function msgTo(msg) {
    var msg =   '<li class="clearfix">'+
                    '<div class="message-data align-right">'+
                        '<span class="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;'+
                        '<span class="message-data-name">Olia</span> <i class="fa fa-circle me"></i>'+
                    '</div>'+
                    '<div class="message other-message float-right">'+ msg + '</div>'+
                '</li>';
    $('.chat-history ul').append(msg);
    updateBoxChat();
}

function msgSent(msg) {
    var msg =   '<li>'+
                    '<div class="message-data">'+
                        '<span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>'+
                        '<span class="message-data-time">10:20 AM, Today</span>'+
                    '</div>'+
                    '<div class="message my-message">'+ msg + '</div>'+
                '</li>';
    $('.chat-history ul').append(msg);
    updateBoxChat();
}