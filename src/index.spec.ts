import xhr, { Xhr } from './index';

const hostname = 'https://www.apiopen.top';
const url = '/satinCommentApi?id=27610708&page=1';
test('测试普通xhr函数', (done) => {
  xhr({
    url: `${hostname}${url}`,
  }).then((data: any) => {
    expect(data.code).toBe(200);
    done();
  }).catch((e: Error) => {
    console.log(e);
    done();
  });
});

test('测试自定义 custom 函数', (done) => {
  const customXhr = Xhr.custom({
    baseURL: hostname
  });
  customXhr({
    url: url
  }).then((data: any) => {
    expect(data.code).toBe(200);
    done();
  }).catch((e: Error) => {
    console.log(e);
    done();
  });
});

test('测试缓存', (done) => {
  xhr({
    url: `${hostname}${url}`,
    cache: {
      filter(data: any) {
        expect(data.code).toBe(200);
        return data.code === 200;
      }
    }
  }).then((data: any) => {
    const cacheData: any = Xhr.cache.values()[0];
    expect(cacheData.code).toBe(200);
    done();
  }).catch((e: Error) => {
    console.log(e);
    done();
  });
});