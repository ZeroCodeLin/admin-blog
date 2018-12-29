import Vue from 'vue';
import App from './app'
import router from './router'
import iView from 'iview';
import iEditor from 'iview-editor';
import 'iview/dist/styles/iview.css';  
import 'iview-editor/dist/iview-editor.css';

// require('../mock/mock.js')

// import { Layout, Sider, Header, Content, Footer, Menu, MenuItem, Icon, Row, Col, Tabs, TabPane, Table, Message, Form, FormItem, Input, Button, Progress, Modal, Upload  } from 'iview';
// Vue.component('Layout', Layout);
// Vue.component('Sider', Sider);
// Vue.component('Header', Header);
// Vue.component('Content', Content), 
// Vue.component('Footer', Footer);
// Vue.component('Menu', Menu);
// Vue.component('MenuItem', MenuItem);
// Vue.component('Row', Row);
// Vue.component('Col', Col);
// Vue.component('Icon', Icon);
// Vue.component('Tabs', Tabs);
// Vue.component('TabPane', TabPane);
// Vue.component('Table', Table);
// Vue.component('Input', Input);
// Vue.component('Form', Form);
// Vue.component('FormItem', FormItem);
// Vue.component('Button', Button);
// Vue.component('Progress', Progress);
// Vue.component('Modal', Modal);
// Vue.component('Upload', Upload);

// Vue.prototype.$Message = Message;
Vue.use(iEditor);
Vue.use(iView);

new Vue({
    el: "#app",
    // template: '<App/>',
    // components:{ App },
    router,
    render: h => h(App)
})