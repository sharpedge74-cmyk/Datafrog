# DataFrog Tools 🐸🍬
> **100% In-Browser Free Image Studio with 50+ Tools**
> Zero uploads. Zero accounts. Zero backend. Your files never leave your device.

---

## 🌟 Overview
**DataFrog Tools** is a privacy-first, production-grade image manipulation suite designed with a playful **"Candy Match Game"** aesthetic (juicy 3D glossy buttons, jelly wobble dropzones, liquid striped progress bars, confetti bursts, sound effects, and combo counters).

Every single tool executes 100% locally in the user's web browser using client-side HTML5 Canvas, WebAssembly (WASM), and the Web Workers API.

---

## 🧰 All 57+ In-Browser Tools Included

### 1. Compress & Resize
- **Image Compressor**: Quality slider, format selection, before/after byte metrics.
- **Image Resizer**: Exact pixels, percentage scaling, aspect ratio locking.
- **Compress to Target Size (20KB, 50KB, 100KB, 200KB, 500KB, 1MB)**: Dedicated mathematical binary search downscaling to guarantee output fits strictly under the target ceiling.
- **Bulk Image Resizer**: Multi-file batch processing with single-click ZIP archive download.
- **Social Media Resizer**: Instant presets for Instagram, YouTube, LinkedIn, Facebook, Twitter, and WhatsApp.
- **Passport / ID Photo Resizer**: US (2x2"), UK/EU (35x45mm), India, Canada, China, and Schengen standards with custom background colors.

### 2. Format Converters
- **HEIC to JPG** & **HEIC to PNG**: Decode Apple iPhone HEIC/HEIF pictures locally.
- **PNG to JPG** & **JPG to PNG**: Lightweight transcoding with custom transparent fill color.
- **WebP to JPG** & **WebP to PNG**: Convert modern web graphics to universal formats.
- **JPG to WebP** & **PNG to WebP**: Slash image file sizes by 30-80% for web performance.
- **AVIF to JPG**: Decode next-generation AVIF images.
- **SVG to PNG**: High-resolution rasterization with up to 4x Retina scaling.
- **PNG to SVG**: Vector contour tracing turning raster pixels into scalable SVG paths.
- **Image to PDF**: Client-side generation of valid binary multi-page PDF documents.
- **PDF to JPG**: Render PDF pages into high-resolution images.
- **GIF to MP4**: Record canvas video streams to convert heavy GIFs into 90% lighter videos.
- **Video to GIF**: Sample short video clips into animated GIFs.
- **ICO / Favicon Generator**: Multi-resolution binary `.ico` compilation (16x16, 32x32, 48x48).
- **Image to Base64** & **Base64 to Image**: Instant Data URI encoders and decoders.

### 3. Photo Editor
- **Crop Image**: Freeform and aspect ratio locks (1:1, 16:9, 4:3, 9:16).
- **Circle Crop**: Circular avatar masks with transparent PNG export and border rings.
- **Rotate & Flip**: 90°, 180°, 270° orientation corrections and horizontal mirror flips.
- **Add Text to Image**: Vector-sharp typography overlays with outlines, font choices, and positioning.
- **Add Watermark**: Text or logo watermarks with opacity and diagonal repeating patterns.
- **Add Border, Corners & Shadow**: Frame graphics with rounded corners and soft drop shadows.
- **Blur & Pixelate Area**: Mosaic censorship and Gaussian blur over sensitive regions.
- **Photo Filters & Adjustments**: Brightness, contrast, saturation, sharpness boost, and sepia.
- **Collage Maker**: 2x1, 1x2, 2x2, 3x1, and 3x3 photo grids with spacing and rounded corners.
- **Merge Images**: Horizontal or vertical panorama stitching with automatic height/width matching.
- **Split Image into Grid**: Slice photos into 3x3 tiles for Instagram grid profile banners (ZIP download).
- **Color Picker**: Interactive loupe magnifier with HEX, RGB, and HSL values.
- **Color Palette Extractor**: Extract 6 dominant harmonious palette swatches with CSS tokens.
- **Meme Maker**: Bold uppercase Impact font with black border outlines.
- **Screenshot Beautifier**: macOS window frames with control buttons, gradient backdrops, and shadows.
- **Image Flip & Mirror**: Horizontal, vertical, and symmetry reflection effects.
- **Grayscale, Invert & Sepia**: 1-click black & white, negative invert, and vintage sepia.

### 4. Local AI & Smart Tools
- **Background Remover**: Client-side chroma & contrast edge segmentation for transparent PNG cutouts.
- **Image Upscaler (2x / 4x)**: Edge-preserving Lanczos/bicubic upscaling with unsharp masking.
- **Blur Background**: Depth-of-field DSLR portrait mode bokeh blur simulation.
- **Object / Watermark Remover**: Brush-based patch inpainting using texture synthesis.
- **OCR Image to Text**: Client-side character recognition and document text extraction.
- **Automatic Face Blur**: Skin-tone and feature cluster detection with auto privacy blur.
- **Photo to Sketch & Cartoon**: Sobel edge outline pass combined with color posterization.

### 5. Privacy Shield
- **EXIF / Metadata Viewer**: Parse TIFF/APP1 binary headers for camera, lens, ISO, and GPS tags.
- **EXIF Data Remover**: Strip all metadata headers and re-encode pure unpolluted pixel buffers.
- **GPS Location Remover**: Zero out and purge geolocation geotags while keeping camera settings.
- **Redact & Black-Out Tool**: Draw irreversible solid black redaction boxes over sensitive text.

### 6. Daily Utilities
- **QR Code Generator**: High-contrast, customizable static QR codes for links, WiFi, and vCards.
- **QR Code Reader**: Decode QR codes from uploaded images, screenshots, or camera feed via `jsQR`.
- **Placeholder Image Generator**: Custom width x height mock images with centered labels.
- **Image Diff / Compare Slider**: Interactive side-by-side split slider to inspect subtle edits.
- **Image Format Detector**: Binary magic byte inspector (PNG, JPEG, WebP, GIF, AVIF, PDF, ICO).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.

### 4. Generate All Static HTML Pages & Sitemap
```bash
node scripts/generate-pages.js
```

---

## 🚢 Deployment Instructions

### Cloudflare Pages
1. Connect your GitHub repository to Cloudflare Pages.
2. Build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Click **Save and Deploy**.

### Netlify
1. Drag and drop the `dist` folder into the Netlify dashboard, or link your git repo.
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add a `_redirects` file in `public/` containing `/* /index.html 200` for client-side routing.

### Vercel
1. Import your Git repository into Vercel.
2. Framework preset will automatically detect `Vite`.
3. Output Directory: `dist`.
4. Click **Deploy**.

---

## 🔒 Privacy Architecture
- **100% In-Browser Execution**: All canvas transforms, conversions, and compressions take place within the user's browser runtime memory.
- **No Telemetry**: No tracking pixels or telemetry that touches user image files.
- **Offline Capable (PWA)**: Includes Web App Manifest and Service Worker (`sw.js`) allowing all tools to work completely offline after the initial visit.
