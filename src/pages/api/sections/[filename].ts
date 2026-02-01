import { readFileSync } from 'fs'
import path from 'path'

export const prerender = true

export async function GET({ params }: any) {
  const { filename } = params
  const filePath = path.join(process.cwd(), 'src', 'content', 'sections', `${filename}`)
  
  try {
    const content = readFileSync(filePath, 'utf-8')
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      },
    })
  } catch (error) {
    console.error(`File not found: ${filePath}`)
    return new Response('Not found', { status: 404 })
  }
}

export function getStaticPaths() {
  const sections = ['about', 'contact', 'features', 'header']
  const languages = ['id', 'tr']
  
  const paths = []
  
  // Tambahkan path untuk file default (tanpa suffix, untuk bahasa EN)
  for (const section of sections) {
    paths.push({
      params: { filename: `${section}.md` },
    })
  }
  
  // Tambahkan path untuk file language-specific (id, tr)
  for (const section of sections) {
    for (const lang of languages) {
      paths.push({
        params: { filename: `${section}.${lang}.md` },
      })
    }
  }
  
  return paths
}
