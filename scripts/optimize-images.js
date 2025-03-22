import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images/carousel');
const outputDir = path.join(__dirname, '../public/images/carousel/optimized');

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configurações de otimização
const optimizationOptions = {
  jpeg: {
    quality: 85,
    progressive: true,
    chromaSubsampling: '4:4:4'
  },
  png: {
    quality: 85,
    compressionLevel: 9
  },
  resize: {
    width: 1920,
    height: 1080, // Proporção 16:9
    fit: sharp.fit.cover,
    position: 'center'
  }
};

// Função para otimizar uma imagem
async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calcular dimensões para manter proporção 16:9
    const aspectRatio = 16 / 9;
    let width = optimizationOptions.resize.width;
    let height = Math.round(width / aspectRatio);
    
    // Se a altura resultante for maior que o máximo permitido, ajustar a largura
    if (height > optimizationOptions.resize.height) {
      height = optimizationOptions.resize.height;
      width = Math.round(height * aspectRatio);
    }
    
    // Aplicar redimensionamento com proporção 16:9
    image.resize({
      width,
      height,
      fit: sharp.fit.cover,
      position: 'center'
    });
    
    // Aplicar otimizações específicas baseadas no formato
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      image.jpeg(optimizationOptions.jpeg);
    } else if (metadata.format === 'png') {
      image.png(optimizationOptions.png);
    }
    
    // Salvar imagem otimizada
    await image.toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✓ ${path.basename(inputPath)}:`);
    console.log(`  Tamanho: ${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB (${reduction}% menor)`);
    console.log(`  Dimensões: ${width}x${height} (16:9)\n`);
  } catch (error) {
    console.error(`✗ Erro ao otimizar ${path.basename(inputPath)}:`, error.message);
  }
}

// Processar todas as imagens
async function processImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  console.log(`\nIniciando otimização de ${imageFiles.length} imagens...\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await optimizeImage(inputPath, outputPath);
  }
  
  console.log('\nOtimização concluída!');
}

processImages(); 