class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isRecording = false;
  }

  startRecording() {
    if (this.isRecording) return;
    this.isRecording = true;
    this.setupObservers();
  }

  stopRecording() {
    this.isRecording = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  setupObservers() {
    if (typeof window === 'undefined') return;

    this.observeFCP();
    this.observeLCP();
    this.observeCLS();
    this.observeFID();
    this.observeINP();
    this.observeTTFB();
  }

  observeFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[0];
      this.metrics.FCP = fcp.startTime;
      this.logMetric('First Contentful Paint', fcp.startTime);
    });
    observer.observe({ entryTypes: ['paint'] });
    this.observers.push(observer);
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      this.metrics.LCP = lcp.startTime;
      this.logMetric('Largest Contentful Paint', lcp.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  observeCLS() {
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
      this.metrics.CLS = clsValue;
      this.logMetric('Cumulative Layout Shift', clsValue);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.FID = entry.processingStart - entry.startTime;
        this.logMetric('First Input Delay', this.metrics.FID);
        observer.disconnect();
      }
    });
    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  observeINP() {
    let inpValue = 0;
    let inpEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        inpEntries.push(entry);
        const duration = entry.duration;
        if (duration > inpValue) {
          inpValue = duration;
        }
      }
      this.metrics.INP = inpValue;
      this.logMetric('Interaction to Next Paint', inpValue);
    });
    observer.observe({ entryTypes: ['interaction'] });
    this.observers.push(observer);
  }

  observeTTFB() {
    if (performance.timing) {
      const timing = performance.timing;
      const ttfb = timing.responseStart - timing.navigationStart;
      this.metrics.TTFB = ttfb;
      this.logMetric('Time to First Byte', ttfb);
    }
  }

  observeImageLoad(imageUrl, callback) {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    const img = new Image();

    img.onload = () => {
      const loadTime = performance.now() - startTime;
      callback({ url: imageUrl, loadTime, success: true });
      this.logMetric(`Image Load: ${imageUrl}`, loadTime);
    };

    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      callback({ url: imageUrl, loadTime, success: false });
      this.logMetric(`Image Load Failed: ${imageUrl}`, loadTime);
    };

    img.src = imageUrl;
  }

  observeMemoryUsage() {
    if (performance.memory) {
      const memory = performance.memory;
      this.metrics.memory = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
  }

  logMetric(name, value) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getPerformanceScore() {
    const metrics = this.getMetrics();
    let score = 100;

    if (metrics.LCP > 2500) score -= 10;
    if (metrics.LCP > 4000) score -= 20;

    if (metrics.FID > 100) score -= 10;
    if (metrics.FID > 300) score -= 20;

    if (metrics.CLS > 0.1) score -= 10;
    if (metrics.CLS > 0.25) score -= 20;

    if (metrics.INP > 200) score -= 10;
    if (metrics.INP > 500) score -= 20;

    return Math.max(0, score);
  }

  exportMetrics() {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      metrics: this.getMetrics(),
      score: this.getPerformanceScore(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }, null, 2);
  }
}

export default new PerformanceMonitor();
