import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://prayertimesriyadh.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://prayertimesriyadh.com/hijri-date',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://prayertimesriyadh.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: 'https://prayertimesriyadh.com/disclaimer',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },

    {
      url: 'https://prayertimesriyadh.com/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },

  ]
}