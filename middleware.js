// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
 
  
  // Remove URL-encoded invisible characters directly
  const cleanedPathname = url.pathname.replace(/%E2%81%A0/g, '') // Word Joiner
                                    .replace(/%E2%80%8B/g, '') // Zero Width Space
                                    .replace(/%E2%80%8C/g, '') // Zero Width Non-Joiner
                                    .replace(/%E2%80%8D/g, '') // Zero Width Joiner
                                    .replace(/%EF%BB%BF/g, '') // BOM
  

  
  // If the pathname was cleaned, redirect to the clean URL
  if (cleanedPathname !== url.pathname) {
    url.pathname = cleanedPathname
    return NextResponse.redirect(url, 301)
  }
  
  return NextResponse.next()
}