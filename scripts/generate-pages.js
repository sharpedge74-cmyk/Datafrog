/**
 * DataFrog Static Page Generator Script
 * Generates standalone static HTML pages for all 57+ tools + sitemap.xml.
 * Run with: node scripts/generate-pages.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Basic tool list for static generator
const tools = [
  { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress JPG, PNG, and WebP images with custom quality.' },
  { id: 'image-resizer', name: 'Image Resizer', desc: 'Resize image dimensions by exact pixels or percentage with aspect ratio lock.' },
  { id: 'compress-to-20kb', name: 'Compress Image to 20KB', desc: 'Compress photos down to strictly under 20KB for portals.' },
  { id: 'compress-to-50kb', name: 'Compress Image to 50KB', desc: 'Compress pictures to strictly under 50KB for job applications.' },
  { id: 'compress-to-100kb', name: 'Compress Image to 100KB', desc: 'Compress photos and graphics to strictly under 100KB.' },
  { id: 'compress-to-200kb', name: 'Compress Image to 200KB', desc: 'Compress images to strictly under 200KB for listings.' },
  { id: 'compress-to-500kb', name: 'Compress Image to 500KB', desc: 'Compress high-res photos to under 500KB.' },
  { id: 'compress-to-1mb', name: 'Compress Image to 1MB', desc: 'Compress heavy camera photos to under 1MB.' },
  { id: 'bulk-image-resizer', name: 'Bulk Image Resizer', desc: 'Resize dozens of photos at once and download as ZIP.' },
  { id: 'social-media-resizer', name: 'Social Media Resizer', desc: 'Instant presets for Instagram, YouTube, LinkedIn, Facebook.' },
  { id: 'passport-photo-resizer', name: 'Passport / ID Photo Resizer', desc: 'Format photos for official passports (US 2x2, UK/EU 35x45mm).' },
  { id: 'heic-to-jpg', name: 'HEIC to JPG Converter', desc: 'Convert Apple iPhone HEIC photos to standard JPG.' },
  { id: 'heic-to-png', name: 'HEIC to PNG Converter', desc: 'Convert iPhone HEIC images to crisp, lossless PNG.' },
  { id: 'png-to-jpg', name: 'PNG to JPG Converter', desc: 'Convert transparent or heavy PNGs into lightweight JPGs.' },
  { id: 'jpg-to-png', name: 'JPG to PNG Converter', desc: 'Convert JPEG photos into high-compatibility PNG format.' },
  { id: 'webp-to-jpg', name: 'WebP to JPG Converter', desc: 'Convert modern WebP web images to standard JPG pictures.' },
  { id: 'webp-to-png', name: 'WebP to PNG Converter', desc: 'Convert WebP graphics to PNG format with transparency.' },
  { id: 'jpg-to-webp', name: 'JPG to WebP Converter', desc: 'Convert JPG photos to modern WebP for 30% smaller size.' },
  { id: 'png-to-webp', name: 'PNG to WebP Converter', desc: 'Convert heavy PNGs to WebP format with transparency.' },
  { id: 'avif-to-jpg', name: 'AVIF to JPG Converter', desc: 'Convert next-generation AVIF images to standard JPG.' },
  { id: 'svg-to-png', name: 'SVG to PNG Converter', desc: 'Convert vector SVG graphics into high-resolution PNG images.' },
  { id: 'png-to-svg', name: 'PNG to SVG Vectorizer', desc: 'Trace raster PNG/JPG images into scalable vector SVG paths.' },
  { id: 'image-to-pdf', name: 'Image to PDF Converter', desc: 'Combine multiple images into a clean PDF document.' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG Converter', desc: 'Render PDF pages into high-resolution JPG images.' },
  { id: 'gif-to-mp4', name: 'GIF to MP4 Video Converter', desc: 'Convert heavy animated GIFs into lightweight MP4/WebM videos.' },
  { id: 'video-to-gif', name: 'Video to GIF Maker', desc: 'Convert short video clips into animated GIFs.' },
  { id: 'ico-favicon-generator', name: 'ICO / Favicon Generator', desc: 'Generate multi-size .ICO favicon files.' },
  { id: 'image-to-base64', name: 'Image to Base64 Encoder', desc: 'Encode images into Base64 Data URI strings.' },
  { id: 'base64-to-image', name: 'Base64 to Image Decoder', desc: 'Decode Base64 Data URIs back into downloadable image files.' },
  { id: 'crop-image', name: 'Crop Image', desc: 'Crop images with interactive handles and presets.' },
  { id: 'circle-crop', name: 'Circle Crop Tool', desc: 'Crop photos into clean circular avatars with transparent background.' },
  { id: 'rotate-and-flip', name: 'Rotate & Flip Image', desc: 'Rotate images 90°, 180°, 270° and flip horizontally or vertically.' },
  { id: 'add-text-to-image', name: 'Add Text to Image', desc: 'Add custom typography overlays to photos with fonts and shadows.' },
  { id: 'add-watermark', name: 'Add Watermark to Image', desc: 'Protect photos with custom text or logo watermarks.' },
  { id: 'add-border-shadow', name: 'Add Border, Corners & Shadow', desc: 'Frame photos with borders, rounded corners, and drop shadows.' },
  { id: 'blur-pixelate-area', name: 'Blur & Pixelate Area Tool', desc: 'Blur or pixelate sensitive regions such as faces and plates.' },
  { id: 'photo-filters-adjustments', name: 'Photo Filters & Adjustments', desc: 'Adjust brightness, contrast, saturation, sharpness, and hue.' },
  { id: 'collage-maker', name: 'Photo Collage Maker', desc: 'Combine multiple photos into grid collages with spacing.' },
  { id: 'merge-images', name: 'Merge Images (Stitcher)', desc: 'Stitch two or more images together horizontally or vertically.' },
  { id: 'split-image-grid', name: 'Split Image into Grid', desc: 'Split photos into 3x3 grid for Instagram profile banners.' },
  { id: 'color-picker', name: 'Color Picker from Image', desc: 'Inspect and pick exact HEX, RGB, and HSL values from pixels.' },
  { id: 'color-palette-extractor', name: 'Color Palette Extractor', desc: 'Extract harmonious dominant color palettes with CSS export.' },
  { id: 'meme-maker', name: 'Meme Maker', desc: 'Create viral memes with classic bold Impact text and outlines.' },
  { id: 'screenshot-beautifier', name: 'Screenshot Beautifier', desc: 'Transform screenshots into mockups with gradient backdrops.' },
  { id: 'image-flip-mirror', name: 'Image Flip & Mirror Tool', desc: 'Mirror images horizontally or vertically for symmetry.' },
  { id: 'grayscale-invert-sepia', name: 'Grayscale, Invert & Sepia', desc: 'Transform photos with black & white, negative, or sepia.' },
  { id: 'background-remover', name: 'Background Remover', desc: 'Remove photo backgrounds to create transparent cutouts locally.' },
  { id: 'image-upscaler', name: 'Image Upscaler (2x / 4x)', desc: 'Enlarge low-resolution photos 2x or 4x with detail enhancement.' },
  { id: 'blur-background', name: 'Blur Background (Portrait Mode)', desc: 'Add DSLR-like shallow depth bokeh blur to background.' },
  { id: 'object-watermark-remover', name: 'Object & Watermark Remover', desc: 'Erase unwanted objects, blemishes, and timestamps.' },
  { id: 'ocr-image-to-text', name: 'OCR Image to Text Extractor', desc: 'Extract editable text from document scans and receipts.' },
  { id: 'face-blur', name: 'Automatic Face Blur Tool', desc: 'Auto-detect human faces and apply privacy blur in one click.' },
  { id: 'photo-to-sketch-cartoon', name: 'Photo to Sketch & Cartoon', desc: 'Transform photos into pencil sketches or cartoon art.' },
  { id: 'exif-metadata-viewer', name: 'EXIF / Metadata Viewer', desc: 'Inspect hidden camera model, lens, ISO, and GPS coordinates.' },
  { id: 'exif-remover', name: 'EXIF Data Remover', desc: 'Wipe all hidden EXIF metadata and device details from photos.' },
  { id: 'gps-location-remover', name: 'GPS Location Remover', desc: 'Strip exact GPS coordinates from photos to protect privacy.' },
  { id: 'redact-blackout', name: 'Redact & Black-Out Tool', desc: 'Draw irreversible solid black redaction boxes over sensitive text.' },
  { id: 'qr-code-generator', name: 'QR Code Generator', desc: 'Generate high-contrast, customizable static QR codes.' },
  { id: 'qr-code-reader', name: 'QR Code Reader & Scanner', desc: 'Scan and decode QR codes from photos and screenshots.' },
  { id: 'placeholder-generator', name: 'Placeholder Image Generator', desc: 'Generate custom dummy placeholder images for web development.' },
  { id: 'image-diff-compare', name: 'Image Diff / Compare Slider', desc: 'Compare two images side-by-side with an interactive split slider.' },
  { id: 'image-format-detector', name: 'Image Format Detector', desc: 'Detect true underlying image file format by inspecting magic bytes.' },
];

const templatePath = path.join(rootDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const outputDir = path.join(rootDir, 'public', 'pages');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating ${tools.length} static HTML pages...`);

tools.forEach((tool) => {
  const pageHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${tool.name} - Free 100% In-Browser Image Tool | DataFrog</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${tool.desc} 100% in-browser, zero uploads, complete privacy." />\n    <link rel="canonical" href="https://datafrog.tools/${tool.id}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${tool.name} - Free 100% In-Browser Image Tool | DataFrog" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${tool.desc} Zero uploads, 100% private." />\n    <meta property="og:url" content="https://datafrog.tools/${tool.id}" />`);

  const filePath = path.join(outputDir, `${tool.id}.html`);
  fs.writeFileSync(filePath, pageHtml, 'utf8');
});

console.log(`Successfully generated all ${tools.length} static tool pages in public/pages/!`);
