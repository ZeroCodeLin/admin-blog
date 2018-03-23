import { isUrl } from '../utils/utils';

const menuData = [{
  name: '基本信息',
  icon: 'dashboard',
  path: 'basic',
  children: [{
    name: '个人信息',
    path: 'basicInfo',
  }],
}, {
  name: '文章管理',
  icon: 'dashboard',
  path: 'essay',
  children: [{
    name: '文章列表',
    path: 'list',
  },{
    name: '发布文章',
    path: 'write',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
