export default {
  install(Vue) {
    const V = Vue;
    V.prototype.$message = function mess(html) {
      global.M.toast({
        html,
      });
    };

    V.prototype.$error = function err(html) {
      global.M.toast({
        html: `[Ошибка]: ${html}`,
      });
    };
  },
};
