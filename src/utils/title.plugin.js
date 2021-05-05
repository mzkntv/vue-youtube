import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue) {
    const app = Vue;
    app.prototype.$title = function (titleKey) {
      const appName = process.env.VUE_APP_TITLE;

      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
