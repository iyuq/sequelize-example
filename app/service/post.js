'use strict';

module.exports = app => {
  return class Post extends app.Service {
    * list({ offset = 0, limit = 10, user_id }) {
      const options = {
        offset,
        limit,
        attributes: [ 'id', 'title', 'created_at', 'updated_at' ],
        order: [[ 'create_at', 'desc' ]],
      };
      if (user_id) {
        options.where = {
          user_id,
        };
      }
      return yield this.ctx.model.Post.findAndCountAll(options);
    }

    * find(id) {
      const post = yield this.ctx.model.Post.findById(id, {
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'name', 'age' ],
        }],
      });
      if (!post) {
        this.ctx.throw(404, 'post not found');
      }
      return post;
    }

    * create(post) {
      return yield this.ctx.model.Post.create(post);
    }

    * update({ id, updates }) {
      const post = yield this.ctx.model.Post.findById(id);
      if (!post) {
        this.ctx.throw(404, 'post not found');
      }
      return yield post.update(updates);
    }

    * del(id) {
      const post = yield this.ctx.model.Post.findById(id);
      if (!post) {
        this.ctx.throw(404, 'post not found');
      }
      return post.destroy();
    }
  };
};
