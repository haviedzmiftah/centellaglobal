import { readFileSync } from 'fs'
import path from 'path'

export const prerender = true

export async function GET({ params }: any) {
  const { lang } = params
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'features.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const featuresData = JSON.parse(fileContent)
    
    const features = featuresData[lang] || featuresData.en
    
    return new Response(JSON.stringify(features), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      },
    })
  } catch (error) {
    console.error(`Error fetching features for language: ${lang}`, error)
    return new Response(JSON.stringify([]), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
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
