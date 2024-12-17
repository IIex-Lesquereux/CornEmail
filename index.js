const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// 每分钟触发一次
// const loopTime="* * * * *";

// 每五分钟触发一次
const loopTime = "*/5 * * * *";

// 每年的 11月24日触发一次
// const loopTime = "0 0 24 11 *";

// 创建发件对象
const transporter = nodemailer.createTransport({
  // 这里以QQ为例，其他具体查看 https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json
  host: "smtp.qq.com",
  port: 465,
  // 465端口使用true, 其他的端口使用false
  secure: true,
  auth: {
    // 发件人邮箱地址
    user: "chengyongliu@foxmail.com",
    // mtp 验证码 这个有了才可以发送邮件，以 QQ 邮箱为例：设置->账户->开启服务 (选择 POP3/SMTP 服务)->点击开启 (需要发送短信开启)->授权码生成。
    pass: "xxxxxxxxxx",
  },
});

// 全局作用域中不允许使用 async..await，这里使用包装器测试
async function main() {
  // 设置发送的邮件内容
  const info = await transporter.sendMail({
    // 发件人名称，格式要求必须：xxxxx <邮箱地址>
    from: '"中华小当家" <chengyongliu@foxmail.com>',
    // 收件人邮箱,多个邮箱之间以逗号分隔 "xxx1, xxx2, xxx3"
    to: "1919806591@qq.com",
    // 邮件主题
    subject: "生日快乐",
    // 邮件文本内容（若邮件内容为纯为本，则使用该字段即可。）
    text: "",
    // html形式的内容（当同时存在text和html字段内容时，仅html字段内容生效，所以看需求进行text字段与html字段内容二选一即可）
    html: `
    <p style="font-weight:bold">亲爱的xxx，生日快乐！你是我的一切，我的世界因为有了你而变得更加美好。愿你的生日充满快乐和温馨。</p>
    <p>
        <img src="https://app.gxgif.com/pic/sr/20221029114416.png" style="display:block"/>
    </p>
    `,
    attachments: [], // 附件内容，更具体配置查看 https://nodemailer.com/message/attachments/
  });
  console.log("Message sent: %s", info.messageId);
}

schedule.scheduleJob(loopTime, () => {
  main().catch(console.error);
});
