// scripts/revalidate-og.js
const https = require('https');
const fs = require('fs');
const path = require('path');

// URL da sua aplicação Next.js em produção
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://seusite.com';

// Função para disparar revalidação
async function triggerRevalidation() {
  console.log('🔄 Iniciando revalidação da imagem OG...');
  
  try {
    // Cria um arquivo de timestamp para forçar a revalidação
    const timestampFile = path.join(process.cwd(), '.og-last-update');
    fs.writeFileSync(timestampFile, new Date().toISOString());
    
    // Acessa a rota da imagem OG para forçar revalidação
    const url = `${BASE_URL}/api/og`;
    
    await new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Revalidação concluída com sucesso!');
          resolve();
        } else {
          console.error(`❌ Falha na revalidação: status ${res.statusCode}`);
          reject(new Error(`Falha ao acessar ${url}: ${res.statusCode}`));
        }
      });
      
      req.on('error', (error) => {
        console.error('❌ Erro ao tentar revalidar:', error.message);
        reject(error);
      });
      
      req.end();
    });
    
  } catch (error) {
    console.error('❌ Erro durante o processo de revalidação:', error);
    process.exit(1);
  }
}

// Executa a revalidação
triggerRevalidation();