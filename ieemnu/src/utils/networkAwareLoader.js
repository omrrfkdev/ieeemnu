class NetworkAwareLoader {
  constructor() {
    this.connection = this.getConnectionInfo();
    this.setupConnectionListener();
  }

  getConnectionInfo() {
    if (typeof navigator === 'undefined' || !navigator.connection) {
      return {
        effectiveType: '4g',
        downlink: 10,
        rtt: 100,
        saveData: false
      };
    }

    const conn = navigator.connection;
    return {
      effectiveType: conn.effectiveType || '4g',
      downlink: conn.downlink || 10,
      rtt: conn.rtt || 100,
      saveData: conn.saveData || false
    };
  }

  setupConnectionListener() {
    if (typeof navigator !== 'undefined' && navigator.connection) {
      navigator.connection.addEventListener('change', () => {
        this.connection = this.getConnectionInfo();
      });
    }
  }

  getImageQuality() {
    const { effectiveType, saveData } = this.connection;

    if (saveData) return 0.5;

    switch (effectiveType) {
      case 'slow-2g':
        return 0.5;
      case '2g':
        return 0.6;
      case '3g':
        return 0.75;
      case '4g':
      default:
        return 0.85;
    }
  }

  getMaxImageWidth() {
    const { effectiveType, downlink } = this.connection;

    if (this.connection.saveData) return 320;

    switch (effectiveType) {
      case 'slow-2g':
        return 320;
      case '2g':
        return 480;
      case '3g':
        return 640;
      case '4g':
      default:
        return downlink > 5 ? 1920 : 1280;
    }
  }

  shouldLazyLoad(index, totalImages) {
    const { effectiveType, downlink } = this.connection;

    const immediateLoadCount = this.getImmediateLoadCount(effectiveType, downlink);
    return index >= immediateLoadCount;
  }

  getImmediateLoadCount(effectiveType, downlink) {
    if (this.connection.saveData) return 2;

    switch (effectiveType) {
      case 'slow-2g':
        return 1;
      case '2g':
        return 2;
      case '3g':
        return 4;
      case '4g':
      default:
        return downlink > 5 ? 6 : 4;
    }
  }

  getOptimizedImageUrl(originalUrl, width, height) {
    const maxW = this.getMaxImageWidth();
    const quality = this.getImageQuality();
    
    const optimizedWidth = Math.min(width, maxW);
    const optimizedHeight = height ? Math.round(height * (optimizedWidth / width)) : null;

    const separator = originalUrl.includes('?') ? '&' : '?';
    
    let url = `${originalUrl}${separator}w=${optimizedWidth}&q=${quality}`;
    if (optimizedHeight) {
      url += `&h=${optimizedHeight}`;
    }

    return url;
  }

  shouldUseProgressiveJPEG() {
    const { effectiveType } = this.connection;
    return effectiveType !== '4g';
  }

  getPreloadStrategy() {
    const { effectiveType, saveData } = this.connection;

    if (saveData) return 'minimal';

    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'minimal';
      case '3g':
        return 'conservative';
      case '4g':
      default:
        return 'aggressive';
    }
  }

  estimateLoadTime(imageSizeKB) {
    const { downlink } = this.connection;
    if (!downlink) return 5000;

    const downlinkMbps = downlink;
    const sizeMb = imageSizeKB / 1024;
    const timeSeconds = sizeMb / downlinkMbps;

    return timeSeconds * 1000;
  }

  getOptimizationLevel() {
    const { effectiveType, saveData } = this.connection;

    if (saveData) return 'extreme';

    switch (effectiveType) {
      case 'slow-2g':
        return 'extreme';
      case '2g':
        return 'high';
      case '3g':
        return 'medium';
      case '4g':
      default:
        return 'low';
    }
  }
}

export default new NetworkAwareLoader();
