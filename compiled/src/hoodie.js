// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

window.Hoodie = (function() {

  function Hoodie(url) {
    this.url = url;
  }

  Hoodie.prototype.ready = function(cb) {
    var _this = this;
    return requirejs(['hoodie'], function(Hoodie) {
      var hoodie;
      hoodie = new Hoodie(_this.url);
      return hoodie.ready(function() {
        return cb(hoodie);
      });
    });
  };

  return Hoodie;

})();

define('hoodie', ['hoodie/events'], function(Events) {
  var Hoodie;
  return Hoodie = (function(_super) {

    __extends(Hoodie, _super);

    Hoodie.prototype.modules = ['hoodie/store', 'hoodie/config', 'hoodie/account', 'hoodie/remote', 'hoodie/email', 'hoodie/sharing'];

    function Hoodie(base_url) {
      this.base_url = base_url != null ? base_url : '';
      this.base_url = this.base_url.replace(/\/+$/, '');
      this._load_modules();
    }

    Hoodie.prototype.request = function(type, path, options) {
      var defaults;
      if (options == null) {
        options = {};
      }
      defaults = {
        type: type,
        url: "" + this.base_url + path,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
      };
      return $.ajax($.extend(defaults, options));
    };

    Hoodie.prototype.defer = $.Deferred;

    Hoodie.prototype.isPromise = function(obj) {
      return typeof obj.done === 'function' && typeof obj.fail === 'function';
    };

    Hoodie.prototype._ready_callbacks = [];

    Hoodie.prototype._ready = false;

    Hoodie.prototype.ready = function(callback) {
      if (this._ready) {
        return callback();
      } else {
        return this._ready_callbacks.push(callback);
      }
    };

    Hoodie.prototype._load_modules = function() {
      var _this = this;
      return require(this.modules, function() {
        var Module, ModuleClasses, cb, instance_name, _i, _len;
        ModuleClasses = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (_i = 0, _len = ModuleClasses.length; _i < _len; _i++) {
          Module = ModuleClasses[_i];
          instance_name = Module.name.toLowerCase();
          _this[instance_name] = new Module(_this);
        }
        while (cb = _this._ready_callbacks.shift()) {
          cb(_this);
        }
        return _this._ready = true;
      });
    };

    return Hoodie;

  })(Events);
});
