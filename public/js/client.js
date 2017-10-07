var socket = io("http://10.8.0.249:2808");

socket.on("inbox", function(data) {
    var msg = JSON.parse(data);
    if(msg[0].id == socket.id) {
        msgSent(msg[0].msg);
    } else {
        msgTo(msg[0].msg);
    }  
});

socket.on("focusin", function(data) {
    var msg = JSON.parse(data);
    var status = msg[0].status;
    var id = msg[0].id;
    if(status && (id !== socket.id)) {
        $('.dots-loading-container').show();
    } else {
        $('.dots-loading-container').hide();
    }
});