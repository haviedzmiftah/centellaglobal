import { readFileSync } from 'fs'
import path from 'path'

export const prerender = true

export async function GET({ params }: any) {
  const { lang } = params
  
  // Security: Validate language parameter to prevent injection
  const allowedLanguages = ['en', 'id', 'tr']
  
  if (!allowedLanguages.includes(lang)) {
    return new Response(JSON.stringify([]), { 
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
      }
    })
  }
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'features.json')
    
    // Ensure resolved path is within the allowed directory
    const resolvedPath = path.resolve(filePath)
    const allowedDir = path.resolve(process.cwd(), 'src', 'data')
    
    if (!resolvedPath.startsWith(allowedDir)) {
      return new Response(JSON.stringify([]), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const fileContent = readFileSync(filePath, 'utf-8')
    const featuresData = JSON.parse(fileContent)
    
    const features = featuresData[lang] || featuresData.en
    
    return new Response(JSON.stringify(features), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify([]), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
      }
    })
  }
}

export function getStaticPaths() {
  const languages = ['en', 'id', 'tr']
  
  return languages.map(lang => ({
    params: { lang }
  }))
}
