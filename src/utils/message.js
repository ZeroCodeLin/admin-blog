import { message,notification } from 'antd';

export function showMsg(msg, type){
    message[type?type:'success'](msg)
};

export function showNotification (msg,desc,type) {
    notification[type?type:'success']({
      message: msg,
      description:desc?desc:''
    });
};