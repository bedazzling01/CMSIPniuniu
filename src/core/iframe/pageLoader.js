/**
 * 预加载图片资源
 */
import * as PIXI from 'pixi.js';
import {
  EventDispatcher
} from '@core/lib/i-toolkit/eventDispatcher.js';
class PageLoader {
  constructor(options) {
    options = options || {};
    Object.assign(this, EventDispatcher.prototype);
    this.loader = null;
    this.sourceList = options.imgList || [];
    this.imgNum = 0;
    this.maxLen = this.sourceList.length;
  }

  start() {
    this.loader = new PIXI.Loader();
    this.loader.onProgress.add(() => {
      this.imgNum += 1;
      if (this.imgNum >= this.maxLen) {
        this.dispatchEvent({ type: 'page-loading', data: { precent: 100 } });
      } else {
        const precent = Math.floor(this.imgNum / this.maxLen * 100);
        this.dispatchEvent({ type: 'page-loading', data: { precent } });
      }
    });
    // 加载完成
    this.loader.onComplete.add(() => {
      this.dispatchEvent({ type: 'page-loaded' });
    }); // 排队的资源全部加载时调用一次。
    this.loader.add(this.sourceList).load(() => {
      console.log('set up....................');
    });
  }
}
export default PageLoader;
