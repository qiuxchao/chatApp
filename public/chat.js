// 设置 socket 客户端
// 实现和服务端的连接
let socket = io.connect('http://localhost:5000');

// 获取 DOM 节点
let message = document.getElementById('message'),   // 消息输入框
    handle = document.getElementById('handle'),         // 昵称输入框
    chatWindow = document.getElementById('chat-window'),    // 中间消息区
    btn = document.getElementById('send'),              // 发送按钮
    output = document.getElementById('output'),     // 消息输出文本
    feedback = document.getElementById('feedback'); // xxx正在发送消息文本

// 事件监听
function send() {
    // 点击发送按钮后，客户端向服务器发送数据
    // socket.emit()   向服务器端注册事件并传递数据
    // 数据会发送到服务端的 io.on() 方法的第二个参数回调函数的参数中
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    // 将自己发的消息显示的右侧
    output.innerHTML += `
    <p class="self"><span>${message.value}</span></p>
    `;

    // 清空信息框的值
    message.value = '';
    
    // 滚动到消息区底部
    chatWindow.scrollBy(0, chatWindow.scrollHeight);
}
btn.addEventListener('click', send);

// 监听键盘事件，实现某一个用户输入信息时其他用户能看到该用户正在输入信息的提示
message.addEventListener('keydown', () => {
    // 当用户在输入信息时，将用户的昵称发送到服务器
    socket.emit('typing', handle.value);
});

// 获取从服务器发送过来的数据
// 监听服务器注册的 chat 事件，回调函数的参数是服务器发送的数据
socket.on('chat', (data) => {
    // 清空提示信息
    feedback.innerHTML = '';
    // 将数据更新到 DOM 节点中
    output.innerHTML += `
    <p><strong>${ data.handle}：</strong><span>${data.message}</span></p>
    `;

    // 滚动到消息区底部
    chatWindow.scrollBy(0, chatWindow.scrollHeight);
});

// 监听服务器的 typing 事件
// 获取从服务器广播的数据
socket.on('typing', (data) => {
    // console.log(data);
    feedback.innerHTML = `<p><em>${data}正在输入...</em></p>`;
});




