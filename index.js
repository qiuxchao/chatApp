// 引入 express 框架模块
let express = require('express');

// 引入 socket 模块
let socket = require('socket.io');

// 实例化 express 对象
let app = express();


// 监听端口号
let server = app.listen(5000, () => console.log('服务器已经在5000端口运行...'));


// 让服务器能够识别静态文件
app.use(express.static('public'));



// 实例化 socket 来得到里面的方法和属性
// 参数为当前创建的 http 服务器，这样 socket 协议就可以在服务器上运行
let io = socket(server);

// io.on()  服务器端的 socket 配置
// 第一个参数为 connection ，表示客户端和服务端通过 socket 连接
// 第二个参数是一个回调函数，回调函数的参数会接收到此次连接的数据，该回调函数会在客户端与服务端连接成功后触发。
io.on('connection', (socket) => {
    console.log('实现 socket 连接', socket.id);

    // 获取从客户端发送的数据
    // socket.on()  第一个参数为客户端发送数据时注册的事件名
    // 第二个参数为客户端注册第一个参数时传递的数据
    socket.on('chat', (data) => {
        // console.log(data); 
        // 将数据发送给所有通过 socket 连接到服务器的客户端
        // io.sockets.emit('chat', data);
        socket.broadcast.emit('chat', data);
    });

    // 监听用户输入信息时注册的 typing 事件
    socket.on('typing', (data) => {
        // console.log(data);
        // 将正在输入的用户的昵称广播给其他用户（发送该数据的用户不会收到广播）
        socket.broadcast.emit('typing', data);
    });
});
