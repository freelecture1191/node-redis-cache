

module.exports = {

  createQueue: (req, res) => {
    req.rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
      if( err ){
        console.error( err )
        return res.status(400).send(err);
      }
      if (resp===1) {
        const msg = {
          message: 'queue created', resp
        };
        console.log(msg);
        res.json(msg);
      }
    });
  },
  setMessage: (req, res) => {
    req.rsmq.sendMessage({qname:"myqueue", message:req.params.message}, function (err, resp) {
      if( err ){
        console.error( err )
        return res.status(400).send(err);
      }
      if (resp) {
        const msg = {
          message: 'Message sent. ID:', resp
        };
        console.log(msg);
        res.json(msg);
      }
    });
  },
  getMessage: (req, res) => {
    req.rsmq.receiveMessage({qname:"myqueue"}, function (err, resp) {
      if( err ){
        console.error( err )
        return res.status(400).send(err);
      }
      if (resp.id) {
        const msg = {
          message: 'Message received:', resp
        };
        console.log(msg);
        res.json(msg);
      }
      else {
        console.log("No messages for me...")
      }
    });
  },
  deleteMessage: (req, res) => {
    req.rsmq.deleteMessage({qname:"myqueue", id:req.params.id}, function (err, resp) {
      if( err ){
        console.error( err )
        return res.status(400).send(err);
      }
      console.log('req id : ', req.params.id);
      if (resp===1) {
        const msg = {
          message: 'Message deleted:', resp
        };
        console.log(msg);
        res.json(msg);
      }
      else {
        const msg = {
          message: 'Message not found:', resp
        };
        console.log(msg);
        res.json(msg);
      }
    });
  },
  getQueue: (req, res) => {
    req.rsmq.listQueues( function (err, queues) {
      if( err ){
        console.error( err )
        return res.status(400).send(err);
      }
      const msg = {
        message: 'Active queues:'+queues.join( "," )
      };
      console.log(msg);
      res.json(msg);
    });
  },

  /** redis */
/*
  setProfile: (req, res) => {
    const key = req.body.name;
    const value = JSON.stringify(req.body);

    req.cache.set(key, value, (err,data) => {
      if(err){
        console.error(err);
        res.send("error ",err);
      }
      req.cache.expire(key,10);
      console.log(value);
      res.json(value);
    })
  },

  getProfile: (req, res) => {
    const key = req.params.name;

    req.cache.get(key, (err, data) => {
      if(err){
        console.error(err);
        res.send("error",err);
        return;
      }
      const value = JSON.parse(data);
      console.log(value);
      res.json(value);
    })
  }
*/

  /** ioredis */
  setProfile: (req, res) => {
    // req.accepts('application/json');

    const key = req.body.name;
    const value = JSON.stringify(req.body);

    req.redis.set(key, value, (err,data) => {
      if(err){
        console.error(err);
        res.send("error ",err);
      }
      req.redis.lpush('news','aaa');
      req.redis.lpush('news','bbb');
      req.redis.subscribe('news', 'music', function (err, count) {
        // 'news'와 'music'채널에 모두 가입했습니다
        // 'count'는 현재 구독중인 채널의 수를 나타냅니다.

        req.pub.publish('news', 'Hello world!');
        req.pub.publish('music', 'Hello again!');
      });
      // req.redis.expire(key,10);
      console.log(value);
      res.json(value);
    })
  },

  getProfile: (req, res) => {
    const key = req.params.name;

    req.redis.get(key, (err, data) => {
      if(err){
        console.error(err);
        res.send("error",err);
        return;
      }
      const value = JSON.parse(data);
      console.log(value);
      res.json(value);
    })
  }


}