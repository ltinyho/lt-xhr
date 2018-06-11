import xhr, { Xhr } from './index';

describe('接口', () => {
  it('xhr', () => {
    xhr({
      url: '/new/admin',
    }).then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e);
    });
  });
});