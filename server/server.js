require('dotenv').config()

USERNAME = process.env.USERNAME
PASSWORD = process.env.PASSWORD

const io = require('socket.io')(4321, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@chatter.hvjqadm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const users = client.db("chatter").collection('users')
  console.log("err:", err)


  users.find().forEach(function(item){
    console.log(item)
    })


  // const findResult = users.find({}, ()=> {}).toArray();
  // console.log('Found documents =>', findResult);

  // console.log(users)
  // users.findOne({}, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
    
  // });

  io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    
    socket.on('send-message', ({ recipients, text }) => {
      recipients.forEach(recipient => {
        const newRecipients = recipients.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('receive-message', {
          recipients: newRecipients, sender: id, text
        })
      })
    })
  })
  
  
  // client.close();
});




