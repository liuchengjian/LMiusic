import {Service} from "./Service";

const defaultConfig = {
  notCheckToken: false, //不需要检查token
  callBack: () => {
    //无token跳转到登录界面
    // NavigationUtil.goPage(ModuleType.login,{isReLogin: true});
  },
};

const setConfig = (config) => {
  return {
    ...defaultConfig,
    ...config,
  };
};

export const toLogin = (params) => {
  return Service(
    setConfig({
      url: "/login/cellphone",
      method: 'get',
      params: params,
      notCheckToken: true,
    }),
  );
};

/**
 * 发现列表
 */
export const findList = (params) => {
  return Service(
    setConfig({
      url: '/homepage/block/page',
      method: 'get',
      params:params,
      notCheckToken: true
    }),
  );
};
