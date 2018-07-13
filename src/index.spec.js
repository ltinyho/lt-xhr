"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var hostname = 'https://www.apiopen.top';
var url = '/satinCommentApi?id=27610708&page=1';
test('测试普通xhr函数', function (done) {
    index_1.default({
        url: "" + hostname + url,
    }).then(function (data) {
        expect(data.code).toBe(200);
        done();
    }).catch(function (e) {
        console.log(e);
        done();
    });
});
test('测试自定义 custom 函数', function (done) {
    var customXhr = index_1.Xhr.custom({
        baseURL: hostname,
    });
    customXhr({
        url: url,
    }).then(function (data) {
        expect(data.code).toBe(200);
        done();
    }).catch(function (e) {
        console.log(e);
        done();
    });
});
test('测试缓存', function (done) {
    index_1.default({
        url: "" + hostname + url,
        cache: {
            filter: function (data) {
                expect(data.code).toBe(200);
                return data.code === 200;
            },
        },
    }).then(function (data) {
        var cacheData = index_1.Xhr.cache.values()[0];
        expect(cacheData.code).toBe(200);
        done();
    }).catch(function (e) {
        console.log(e);
        done();
    });
});
test('测试post数组问题', function (done) {
    return index_1.default({
        method: 'post',
        url: '/test',
        data: {
            test: [1, 2, 22, 3],
        },
    }).then(function () {
        done();
    }).catch(function () {
        done();
    });
});
//# sourceMappingURL=index.spec.js.map