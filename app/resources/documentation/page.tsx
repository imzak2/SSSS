"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { DocContent } from '@/components/docs/doc-content';
import { Search, Book, ChevronRight } from 'lucide-react';
import { docs, getAllCategories, getDocsByCategory, getDocById } from '@/lib/docs';
import { cn } from '@/lib/utils';

export default function DocumentationPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);
  const categories = getAllCategories();

  const filteredDocs = searchQuery
    ? docs.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : docs;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-4">{t('resources.documentation.title')}</Badge>
            <h1 className="text-4xl font-bold mb-4">{t('resources.documentation.title')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('resources.documentation.description')}
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t('resources.documentation.searchPlaceholder')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-1 bg-background/50 backdrop-blur-sm">
              <ScrollArea className="h-[calc(100vh-250px)]">
                <CardContent className="p-4">
                  {categories.map(({ category, section }, index) => {
                    const categoryDocs = getDocsByCategory(category);
                    return (
                      <div key={index} className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">{section}</h3>
                        <ul className="space-y-1">
                          {categoryDocs.map((doc) => (
                            <li key={doc.id}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-left",
                                  selectedDoc.id === doc.id && "bg-purple-500/10 text-purple-500"
                                )}
                                onClick={() => setSelectedDoc(doc)}
                              >
                                <Book className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{doc.title}</span>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </CardContent>
              </ScrollArea>
            </Card>

            <Card className="lg:col-span-3 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <DocContent doc={selectedDoc} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}