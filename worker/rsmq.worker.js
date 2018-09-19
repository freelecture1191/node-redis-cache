const RSMQWorker = require( "rsmq-worker" );
const worker = new RSMQWorker( "myqueue" , {
  autostart: true,
  maxReceiveCount: 1,
  // defaultDelay: 5,
  // timeout: 1000,
  invisibletime: 1
});

module.exports = () => {
  console.log('work start...');
  /*
  worker.on("message", function (msg, next, id) {
    // process your message
    console.log("Message id : " + id);
    console.log(msg);
    next()
  });
  */
/*
  worker.on("ready", function() {
    var i, len, msg, ref;
    ref = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (i = 0, len = ref.length; i < len; i++) {
      msg = ref[i];
      console.log("SEND", msg);
      worker.send(msg);
    }
  });
  */

// optional error listeners
  worker.on('error', function (err, msg) {
    console.log("ERROR", err, msg.id);
  });
  worker.on('exceeded', function (msg) {
    console.log("EXCEEDED", msg.id);
  });
  worker.on('timeout', function (msg) {
    console.log("TIMEOUT", msg.id, msg.rc);
  });

  // worker.start();
}