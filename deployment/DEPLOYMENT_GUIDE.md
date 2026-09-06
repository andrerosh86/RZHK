# RZHK Deployment Guide

## 🚀 Quick Deploy (30 seconds)

### Netlify (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag `website/index.html` to deploy area
3. Get live URL instantly
4. Custom domain: Netlify Settings → Domain Management

### Vercel
```bash
cd website/
vercel
# Follow prompts
```

### GitHub Pages
1. Create repo: `https://github.com/new`
2. Upload `website/index.html`
3. Settings → Pages → Enable
4. Live at: `https://username.github.io/rzhk/`

## 🔧 Advanced Deployment

### Environment Variables (if needed)
Copy `.env.example` to `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Custom Domain
- **Netlify**: Domain Management → Add custom domain
- **Vercel**: Project Settings → Domains
- **GitHub Pages**: Repo Settings → Pages → Custom domain

## ✅ Deployment Checklist
- [ ] File size < 200KB
- [ ] All assets embedded
- [ ] No console errors
- [ ] Mobile responsive (test on device)
- [ ] Gyroscope works on real phone
- [ ] Services drawer opens on mobile
- [ ] Loading animation plays

## 📊 Performance

Lighthouse scores (target):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

Test at: https://pagespeed.web.dev/


