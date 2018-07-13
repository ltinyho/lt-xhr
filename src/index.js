"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url = require("url");
var qs = require("qs");
var LruCache = require("lru-cache");
axios_1.default.defaults.transformRequest = [function (data) {
        if (typeof data === 'object') {
            data = qs.stringify(data, { arrayFormat: 'brackets' });
        }
        return data;
    }];
var Xhr = /** @class */ (function () {
    function Xhr() {
    }
    Xhr.xhr = function (setting) {
        var cacheData;
        var cacheKey = url.format({
            pathname: setting.url,
            search: qs.stringify(setting.params),
        });
        if (setting.cache) {
            cacheData = Xhr.cache.get(cacheKey);
            if (cacheData) {
                return new Promise(function (resolve) {
                    resolve(cacheData);
                });
            }
        }
        return axios_1.default(setting).then(function (res) {
            var data = res.data;
            if (setting.cache) {
                // 通过结果判断是否缓存
                if (typeof setting.cache === 'boolean') {
                    Xhr.cache.set(cacheKey, data);
                }
                else if (typeof setting.cache === 'object') {
                    if (setting.cache.filter && typeof setting.cache.filter === 'function') {
                        if (setting.cache.filter(data)) {
                            Xhr.cache.set(cacheKey, data);
                        }
                    }
                }
            }
            return data;
        });
    };
    Xhr.custom = function (settting) {
        var _this = this;
        return function (set) {
            if (settting.baseURL) {
                set.url = settting.baseURL + set.url;
            }
            return _this.xhr(set);
        };
    };
    Xhr.cache = LruCache({ max: 500 });
    return Xhr;
}());
exports.Xhr = Xhr;
var xhr = Xhr.xhr;
exports.default = xhr;
//# sourceMappingURL=index.js.map