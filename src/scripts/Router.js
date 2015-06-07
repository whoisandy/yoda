'use strict';

export default {
  _router: null,

  get() {
    return this._router;
  },

  set(router) {
    this._router = router;
  }
};