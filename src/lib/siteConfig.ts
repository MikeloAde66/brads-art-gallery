import { cache } from 'react';
import { supabaseAdmin, SITE_CONFIG_TABLE, SITE_CONFIG_ROW_ID } from './supabaseAdmin';

export interface HeroConfig {
  subtitle: string;
  title: string;
  description: string;
}

export interface VideoConfig {
  enabled: boolean;
  url: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  aspectRatio: string;
}

export interface ShowcaseConfig {
  imageUrl: string;
  dimensions: string;
  medium: string;
  showAcquisitionNote: boolean;
  acquisitionNoteText: string;
  showPricing: boolean;
  /** Internal reference links — never rendered on the public site. */
  canvaLink: string;
  highResExportUrl: string;
  mockupUrl: string;
}

export interface NarrationConfig {
  text: string;
  typewriterSpeedMs: number;
  audioUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export interface SiteConfig {
  hero: HeroConfig;
  video: VideoConfig;
  showcase: ShowcaseConfig;
  narration: NarrationConfig;
  nav: NavItem[];
}

// Mirrors today's hardcoded content exactly, so the public site is
// unaffected until Supabase is configured and something is actually
// published — this is also the fallback whenever Supabase is unreachable.
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    subtitle: 'Original Works · Private Collection',
    title: 'The New Earth Collection',
    description:
      'Original works available for private acquisition. Archival reproductions offered ' +
      'in select configurations, fulfilled by FinerWorks and shipped directly to you.',
  },
  video: {
    enabled: false,
    url: '',
    autoplay: false,
    loop: true,
    muted: true,
    aspectRatio: '16/9',
  },
  showcase: {
    imageUrl: '',
    dimensions: '',
    medium: '',
    showAcquisitionNote: false,
    acquisitionNoteText: '',
    showPricing: true,
    canvaLink: '',
    highResExportUrl: '',
    mockupUrl: '',
  },
  narration: {
    text: '',
    typewriterSpeedMs: 40,
    audioUrl: '',
  },
  nav: [
    { label: 'Wall Art', href: '/shop', description: 'Canvas, framed, and paper prints' },
    { label: 'Media', href: '/products/media', description: 'Charcoal, Acrylic, Liquid Lead, Oil' },
    { label: 'Rooms', href: '/products/rooms', description: 'Room mockup previews' },
    { label: 'Collections', href: '/collections/new-earth', description: 'Curated series like "New Earth"' },
  ],
};

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  // Skip the network call entirely when Supabase isn't configured yet —
  // otherwise every request pays for a DNS failure against the
  // placeholder host in supabaseAdmin.ts before falling back.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return DEFAULT_SITE_CONFIG;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from(SITE_CONFIG_TABLE)
      .select('data')
      .eq('id', SITE_CONFIG_ROW_ID)
      .single();

    if (error || !data?.data) return DEFAULT_SITE_CONFIG;

    const stored = data.data as Partial<SiteConfig>;

    return {
      hero: { ...DEFAULT_SITE_CONFIG.hero, ...stored.hero },
      video: { ...DEFAULT_SITE_CONFIG.video, ...stored.video },
      showcase: { ...DEFAULT_SITE_CONFIG.showcase, ...stored.showcase },
      narration: { ...DEFAULT_SITE_CONFIG.narration, ...stored.narration },
      nav: Array.isArray(stored.nav) && stored.nav.length > 0 ? stored.nav : DEFAULT_SITE_CONFIG.nav,
    };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
});
