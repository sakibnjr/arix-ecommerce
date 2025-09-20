'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import AnimeCategoryPage from '../../components/AnimeCategoryPage';
import { getAnimeBySlug } from '../../data/animeConfig';

export default function DynamicAnimePage() {
  const params = useParams();
  const slug = params.slug;
  
  // Get anime configuration based on slug
  const animeData = getAnimeBySlug(slug);
  
  // If anime not found, show 404
  if (!animeData) {
    notFound();
  }
  
  return (
    <AnimeCategoryPage
      animeName={animeData.name}
      animeDisplayName={animeData.displayName}
      description={animeData.description}
      gradientColor={animeData.gradientColor}
      heroStats={animeData.heroStats}
    />
  );
}
