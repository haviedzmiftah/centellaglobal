import { readFileSync } from 'fs'
import path from 'path'

export const prerender = true

export async function GET({ params }: any) {
  const { filename } = params
  
  // Security: Validate filename to prevent path traversal
  const allowedFiles = [
    'about.md', 'about.id.md', 'about.tr.md',
    'contact.md', 'contact.id.md', 'contact.tr.md',
    'features.md', 'features.id.md', 'features.tr.md',
    'header.md', 'header.id.md', 'header.tr.md',
    'operations.md', 'operations.id.md', 'operations.tr.md',
  ]
  
  if (!allowedFiles.includes(filename)) {
    return new Response('Forbidden', { status: 403 })
  }
  
  const filePath = path.join(process.cwd(), 'src', 'content', 'sections', filename)
  
  // Ensure resolved path is within the allowed directory
  const resolvedPath = path.resolve(filePath)
  const allowedDir = path.resolve(process.cwd(), 'src', 'content', 'sections')
  
  if (!resolvedPath.startsWith(allowedDir)) {
    return new Response('Forbidden', { status: 403 })
  }
  
  try {
    const content = readFileSync(filePath, 'utf-8')
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    return new Response('Not found', { status: 404 })
  }
}

export function getStaticPaths() {
  const sections = ['about', 'contact', 'features', 'header', 'operations']
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
