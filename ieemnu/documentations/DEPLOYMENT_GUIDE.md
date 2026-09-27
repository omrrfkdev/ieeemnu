# 🚀 IEEE MNU Website - Deployment Guide

## 📋 Pre-Deployment Checklist

### **1. Environment Setup**
- ✅ Node.js 18+ installed
- ✅ All dependencies installed (`npm install`)
- ✅ Environment variables configured (if any)

### **2. Code Quality**
- ✅ No console errors in development
- ✅ All images optimized (WebP format)
- ✅ All routes tested
- ✅ Mobile responsiveness verified

### **3. Performance Optimizations Applied**
- ✅ Vite build configuration optimized
- ✅ Code splitting enabled
- ✅ Compression configured (Gzip + Brotli)
- ✅ Image lazy loading implemented
- ✅ Caching headers configured
- ✅ Web Vitals tracking added

---

## 🏗️ Build Process

### **Step 1: Clean Build**
```bash
# Remove old build
rm -rf dist

# Install dependencies (if needed)
npm install

# Run production build
npm run build
```

### **Step 2: Verify Build**
```bash
# Preview production build locally
npm run preview
```

**Check the following:**
- ✅ All pages load correctly
- ✅ Images display properly
- ✅ Animations work smoothly
- ✅ Navigation functions
- ✅ No console errors

### **Step 3: Test Performance**
```bash
# Open in browser and check:
# - Chrome DevTools > Lighthouse
# - Network tab (check file sizes)
# - Performance tab (check load times)
```

**Expected Results:**
- Performance Score: 90+
- Accessibility Score: 90+
- Best Practices Score: 90+
- SEO Score: 90+

---

## 📦 Deployment Options

### **Option 1: Netlify (Recommended)**

#### **Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### **Via Netlify UI:**
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" > "Deploy manually"
3. Drag and drop the `dist` folder
4. Configure custom domain (optional)

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18+

### **Option 2: Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### **Option 3: Traditional Hosting (cPanel, Apache, etc.)**

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Upload entire `dist/` folder contents to your web root
   - Ensure `.htaccess` is in the root directory
   - Set correct file permissions (644 for files, 755 for directories)

3. **Configure server:**
   - Enable `mod_rewrite` (for SPA routing)
   - Enable `mod_deflate` (for compression)
   - Enable `mod_expires` (for caching)
   - Enable `mod_headers` (for security headers)

---

## 🔧 Server Configuration

### **Apache (.htaccess)**
Already configured in `public/.htaccess` with:
- ✅ SPA routing
- ✅ Gzip compression
- ✅ Cache headers (1 year for static assets)
- ✅ Security headers
- ✅ MIME types

### **Nginx (nginx.conf)**
If using Nginx, add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## 🌐 Domain Configuration

### **1. DNS Settings**
Point your domain to your hosting:
- **A Record:** `@` → `Your server IP`
- **CNAME Record:** `www` → `your-domain.com`

### **2. SSL Certificate**
- Use Let's Encrypt (free)
- Or use hosting provider's SSL
- Ensure HTTPS redirect is enabled

### **3. CDN (Optional but Recommended)**
- Cloudflare (free tier available)
- Configure caching rules
- Enable auto-minification
- Enable Brotli compression

---

## 📊 Post-Deployment Verification

### **1. Functionality Check**
- ✅ All pages accessible
- ✅ Navigation works
- ✅ Images load correctly
- ✅ Forms submit (if any)
- ✅ Social media links work

### **2. Performance Check**
```bash
# Run Lighthouse audit
lighthouse https://your-domain.com --view

# Check Web Vitals
# Open browser console and check for Web Vitals logs
```

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### **3. SEO Check**
- ✅ Meta tags present
- ✅ Open Graph tags working
- ✅ Sitemap accessible (if created)
- ✅ robots.txt configured (if needed)

### **4. Mobile Check**
- ✅ Test on real mobile devices
- ✅ Check touch interactions
- ✅ Verify responsive design
- ✅ Test different screen sizes

---

## 🔍 Monitoring & Analytics

### **1. Set Up Analytics**
Add Google Analytics or similar:

```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **2. Error Tracking**
Consider adding Sentry or similar:

```bash
npm install @sentry/react
```

### **3. Uptime Monitoring**
Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🐛 Troubleshooting

### **Issue: 404 on page refresh**
**Solution:** Ensure server is configured for SPA routing (`.htaccess` or nginx config)

### **Issue: Images not loading**
**Solution:** 
- Check file paths are correct
- Verify images are in `public/` folder
- Check file permissions on server

### **Issue: Slow load times**
**Solution:**
- Verify compression is enabled
- Check CDN is working
- Optimize images further
- Enable HTTP/2 on server

### **Issue: CSS not applying**
**Solution:**
- Clear browser cache
- Check CSS files are being served
- Verify build process completed successfully

---

## 📝 Maintenance

### **Regular Tasks**
- **Weekly:** Check uptime and performance metrics
- **Monthly:** Update dependencies (`npm update`)
- **Quarterly:** Review and optimize images
- **Yearly:** Renew SSL certificate (if not auto-renewed)

### **Updating Content**
1. Make changes locally
2. Test thoroughly
3. Run `npm run build`
4. Deploy updated `dist/` folder
5. Clear CDN cache (if using)

---

## 🎯 Performance Targets

### **Lighthouse Scores**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

### **Load Times**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Total Page Size: < 2MB

### **Core Web Vitals**
- LCP: < 2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)

---

## 📞 Support

### **Resources**
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Web Vitals](https://web.dev/vitals/)

### **Common Commands**
```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## ✅ Deployment Checklist

Before going live, ensure:

- [ ] Production build tested locally
- [ ] All environment variables configured
- [ ] Analytics tracking added
- [ ] Error tracking configured
- [ ] SSL certificate installed
- [ ] DNS configured correctly
- [ ] CDN configured (if using)
- [ ] Backup strategy in place
- [ ] Monitoring tools set up
- [ ] Performance targets met
- [ ] Mobile testing completed
- [ ] Cross-browser testing done
- [ ] SEO verification completed

---

**Deployment Guide Version:** 1.0
**Last Updated:** January 28, 2026
**Status:** ✅ Ready for Production
