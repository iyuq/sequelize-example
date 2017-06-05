'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    * posts() {
      this.ctx.body = yield this.service.post.list(this.ctx.query);
    }

    * post() {
      this.ctx.body = yield this.service.post.find(this.ctx.params.id);
    }

    * create() {
      const created = yield this.service.post.create(this.ctx.request.body);
      this.ctx.status = 201;
      this.ctx.body = created;
    }

    * update() {
      const id = this.ctx.params.id;
      const body = this.ctx.request.body;
      this.ctx.body = yield this.service.post.update({ id, updates: body });
    }

    * del() {
      const id = this.ctx.params.id;
      yield this.service.post.del(id);
      this.ctx.status = 200;
    }
  };
};
