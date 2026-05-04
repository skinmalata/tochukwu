const { Jimp } = require('jimp');

const posts = [
  { file: 'img-wp-engine-review.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#00d4aa', accent2: '#7c3aed' },
  { file: 'img-wp-engine-vs-siteground-vs-bluehost.png', gradient: ['#0a0a0f', '#1a0a2e'], accent: '#7c3aed', accent2: '#00d4aa' },
  { file: 'img-migrate-wp-engine.png', gradient: ['#0a0a0f', '#0a1a2e'], accent: '#00d4aa', accent2: '#4facfe' },
  { file: 'img-wp-engine-high-traffic.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#ffa500' },
  { file: 'img-wp-engine-coupon-codes.png', gradient: ['#0a0a0f', '#0a1a0f'], accent: '#00d4aa', accent2: '#ffd700' },
  { file: 'img-color-scheme-website.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#00d4aa', accent2: '#7c3aed' },
  { file: 'img-typography-best-practices.png', gradient: ['#0a0a0f', '#0a1a2e'], accent: '#4facfe', accent2: '#00d4aa' },
  { file: 'img-mobile-first-design.png', gradient: ['#0a0a0f', '#1a0a2e'], accent: '#7c3aed', accent2: '#00d4aa' },
  { file: 'img-improve-website-speed.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-web-design-principles.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#00d4aa', accent2: '#ffd700' },
  { file: 'img-image-optimization.png', gradient: ['#0a0a0f', '#0a1a2e'], accent: '#00d4aa', accent2: '#4facfe' },
  { file: 'img-ux-design-best-practices.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-seo-friendly-web-design.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#00d4aa', accent2: '#ffd700' },
  { file: 'img-navigation-design.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#7c3aed', accent2: '#00d4aa' },
  { file: 'img-landing-page-design.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-ecommerce-web-design.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#ffd700', accent2: '#00d4aa' },
  { file: 'img-responsive-web-design.png', gradient: ['#0a0a0f', '#0a1a2e'], accent: '#4facfe', accent2: '#00d4aa' },
  { file: 'img-wordpress-web-design.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#7c3aed', accent2: '#00d4aa' },
  { file: 'img-website-accessibility.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-css-grid-flexbox.png', gradient: ['#0a0a0f', '#0a1a2e'], accent: '#4facfe', accent2: '#00d4aa' },
  { file: 'img-choose-web-hosting.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-design-trends-vs-timeless.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#7c3aed', accent2: '#00d4aa' },
  { file: 'img-website-security.png', gradient: ['#0a0a0f', '#1a0a1a'], accent: '#ff6b6b', accent2: '#00d4aa' },
  { file: 'img-cta-button-design.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#ffd700', accent2: '#00d4aa' },
  { file: 'img-web-design-portfolio.png', gradient: ['#0a0a0f', '#0f0f18'], accent: '#7c3aed', accent2: '#00d4aa' }
];

function hexToRgb(hex) {
  return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) };
}

function setPixel(image, x, y, r, g, b, a) {
  if(x<0||x>=1200||y<0||y>=630) return;
  const idx = (y*1200+x)*4;
  image.bitmap.data[idx]=r; image.bitmap.data[idx+1]=g; image.bitmap.data[idx+2]=b; image.bitmap.data[idx+3]=a;
}

async function generateImage(post) {
  console.log(`Generating ${post.file}...`);
  const image = new Jimp({ width: 1200, height: 630 });
  const c1 = hexToRgb(post.gradient[0]);
  const c2 = hexToRgb(post.gradient[1]);
  const a1 = hexToRgb(post.accent);
  const a2 = hexToRgb(post.accent2);

  const data = image.bitmap.data;
  for (let y = 0; y < 630; y++) {
    const r = y / 630;
    const cr = Math.round(c1.r*(1-r)+c2.r*r);
    const cg = Math.round(c1.g*(1-r)+c2.g*r);
    const cb = Math.round(c1.b*(1-r)+c2.b*r);
    for (let x = 0; x < 1200; x++) {
      const idx = (y*1200+x)*4;
      data[idx]=cr; data[idx+1]=cg; data[idx+2]=cb; data[idx+3]=255;
    }
  }

  const cx=600, cy=315;
  for(let ring=0;ring<3;ring++){
    const [rad,col,op]=[[150,a1,0.08],[100,a2,0.12],[50,a1,0.2]][ring];
    for(let a=0;a<Math.PI*2;a+=0.03){
      const px=Math.floor(cx+Math.cos(a)*rad), py=Math.floor(cy+Math.sin(a)*rad);
      setPixel(image,px,py,col.r,col.g,col.b,Math.floor(op*255));
    }
  }

  if(post.accent==='#00d4aa'&&post.accent2==='#7c3aed'){
    for(let rack=0;rack<4;rack++){
      const rx=100+rack*250;
      for(let y=100;y<530;y+=15){
        for(let x=rx;x<rx+100;x+=10){
          if(Math.random()>0.4) setPixel(image,x,y,a1.r,a1.g,a1.b,100);
        }
      }
    }
  }

  for(let i=0;i<12;i++){
    const px=200+Math.floor(Math.random()*800), py=80+Math.floor(Math.random()*470);
    const rad=3+Math.floor(Math.random()*4);
    for(let dx=-rad;dx<=rad;dx++) for(let dy=-rad;dy<=rad;dy++){
      if(dx*dx+dy*dy<=rad*rad) setPixel(image,px+dx,py+dy,a1.r,a1.g,a1.b,50);
    }
  }

  for(let x=460;x<740;x++) setPixel(image,x,420,a1.r,a1.g,a1.b,255);

  await image.write(post.file);
  console.log(`  Created ${post.file}`);
}

(async()=>{
  for(const p of posts) await generateImage(p);
  console.log('\nAll 5 images generated!');
})().catch(console.error);
