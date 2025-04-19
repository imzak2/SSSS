'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Terminal, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const links = {
    resources: [
      {
        name: t('footer.sections.resources.items.documentation'),
        href: '/resources/documentation',
      },
      {
        name: t('footer.sections.resources.items.blog'),
        href: '/resources/blog',
      },
      {
        name: t('footer.sections.resources.items.community'),
        href: '/resources/community',
      },
    ],
    company: [
      {
        name: t('footer.sections.company.items.about'),
        href: '/company/about',
      },
      {
        name: t('footer.sections.company.items.careers'),
        href: '/company/careers',
      },
      {
        name: t('footer.sections.company.items.contact'),
        href: '/company/contact',
      },
      {
        name: t('footer.sections.company.items.privacy'),
        href: '/company/privacy',
      },
    ],
  };

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
                KaliumLabs
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-purple-400 transition"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-purple-400 transition"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-purple-400 transition"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              {t('footer.sections.resources.title')}
            </h3>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              {t('footer.sections.company.title')}
            </h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            {t('footer.builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
