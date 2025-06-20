import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Function to send metrics to analytics service
const sendToAnalytics = (metric) => {
  // In production, send to your analytics service
  console.log('Web Vital:', metric);
  
  // Example: Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      custom_parameter_1: 'CoinEstate NFT Platform',
    });
  }

  // Example: Custom analytics endpoint
  if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
    fetch(process.env.REACT_APP_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connectionType: navigator.connection?.effectiveType,
      }),
    }).catch(console.error);
  }
};

// Enhanced reporting function with additional context
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Core Web Vitals
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
    
    // Send to analytics
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }

  // Additional performance monitoring
  if ('PerformanceObserver' in window) {
    // Long tasks monitoring
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
            sendToAnalytics({
              name: 'LongTask',
              value: entry.duration,
              id: entry.name,
              delta: entry.duration,
            });
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observer not supported');
    }

    // Memory usage monitoring (Chrome only)
    if ('memory' in performance) {
      const checkMemoryUsage = () => {
        const memory = performance.memory;
        const memoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
        
        // Alert if memory usage is high
        const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercentage > 80) {
          console.warn('High memory usage detected:', memoryInfo);
          sendToAnalytics({
            name: 'HighMemoryUsage',
            value: usagePercentage,
            id: 'memory-usage',
            delta: usagePercentage,
          });
        }
      };

      // Check memory usage every 30 seconds
      setInterval(checkMemoryUsage, 30000);
    }
  }

  // Network information monitoring
  if ('connection' in navigator) {
    const connection = navigator.connection;
    sendToAnalytics({
      name: 'NetworkInfo',
      value: connection.downlink || 0,
      id: connection.effectiveType || 'unknown',
      delta: connection.rtt || 0,
    });
  }

  // Page visibility tracking
  document.addEventListener('visibilitychange', () => {
    sendToAnalytics({
      name: 'PageVisibility',
      value: document.hidden ? 0 : 1,
      id: document.visibilityState,
      delta: Date.now(),
    });
  });
};

export default reportWebVitals;

// Additional utility functions for performance monitoring
export const trackUserInteraction = (action, element) => {
  const startTime = performance.now();
  
  return () => {
    const duration = performance.now() - startTime;
    sendToAnalytics({
      name: 'UserInteraction',
      value: duration,
      id: `${action}-${element}`,
      delta: duration,
    });
  };
};

export const trackComponentRender = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const duration = performance.now() - startTime;
    if (duration > 16) { // Longer than one frame
      console.warn(`Slow render detected for ${componentName}:`, duration);
      sendToAnalytics({
        name: 'SlowRender',
        value: duration,
        id: componentName,
        delta: duration,
      });
    }
  };
};

export const trackAsyncOperation = (operationName) => {
  const startTime = performance.now();
  
  return (success = true) => {
    const duration = performance.now() - startTime;
    sendToAnalytics({
      name: success ? 'AsyncOperationSuccess' : 'AsyncOperationFailure',
      value: duration,
      id: operationName,
      delta: duration,
    });
  };
};
