import { getAllAnimeSlugs, getAnimeBySlug } from './animeConfig';

// Generate all anime routes dynamically
export const generateAnimeRoutes = () => {
  return getAllAnimeSlugs().map(slug => ({
    path: `/anime/${slug}`,
    slug,
    ...getAnimeBySlug(slug)
  }));
};

// Generate sitemap entries for anime pages
export const getAnimeSitemapEntries = () => {
  return getAllAnimeSlugs().map(slug => ({
    url: `/anime/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));
};

// Get breadcrumb data for anime pages
export const getAnimeBreadcrumbs = (slug) => {
  const anime = getAnimeBySlug(slug);
  return [
    { name: 'Home', href: '/' },
    { name: 'Anime', href: '/#anime-categories' },
    { name: anime?.displayName || 'Unknown', href: `/anime/${slug}` }
  ];
};
