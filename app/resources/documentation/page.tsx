"use client"

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Search, Book, FileText, Code, Terminal } from 'lucide-react';

export default function DocumentationPage() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t('resources.documentation.categories.gettingStarted.title'),
      icon: <Book className="h-6 w-6" />,
      articles: t('resources.documentation.categories.gettingStarted.articles', { returnObjects: true }) || []
    },
    {
      title: t('resources.documentation.categories.challengeGuides.title'),
      icon: <Terminal className="h-6 w-6" />,
      articles: t('resources.documentation.categories.challengeGuides.articles', { returnObjects: true }) || []
    },
    {
      title: t('resources.documentation.categories.apiReference.title'),
      icon: <Code className="h-6 w-6" />,
      articles: t('resources.documentation.categories.apiReference.articles', { returnObjects: true }) || []
    },
    {
      title: t('resources.documentation.categories.resources.title'),
      icon: <FileText className="h-6 w-6" />,
      articles: t('resources.documentation.categories.resources.articles', { returnObjects: true }) || []
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">{t('resources.documentation.title')}</Badge>
            <h1 className="text-4xl font-bold mb-4 break-words">{t('resources.documentation.title')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 break-words">
              {t('resources.documentation.description')}
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t('resources.documentation.searchPlaceholder')}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 mr-3">
                        {category.icon}
                      </div>
                      <h2 className="text-xl font-bold break-words">{category.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {(Array.isArray(category.articles) ? category.articles : []).map((article: string, i: number) => (
                        <li key={i}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left break-words whitespace-normal h-auto py-2"
                          >
                            {article}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}