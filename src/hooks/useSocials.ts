import { useContentful } from './useContentful'
import { getProfile } from '@/lib/contentful'
import { socialLinks as fallback, type SocialLink } from '@/data/site'

/** Social links sourced from the Contentful profile, with a static fallback. */
export function useSocials(): SocialLink[] {
  const { data: profile } = useContentful('profile', getProfile, null)
  if (!profile) return fallback

  const links: SocialLink[] = []
  if (profile.github) links.push({ label: 'GitHub', href: profile.github, icon: 'github' })
  if (profile.linkedin) links.push({ label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' })
  if (profile.tryhackme)
    links.push({ label: 'TryHackMe', href: profile.tryhackme, icon: 'tryhackme' })

  return links.length ? links : fallback
}
