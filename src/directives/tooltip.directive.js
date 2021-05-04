export default {
  bind(el, { value }) {
    global.M.Tooltip.init(el, { html: value });
  },
  unbind(el) {
    const tooltip = global.M.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
