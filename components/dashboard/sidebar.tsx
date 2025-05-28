"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Code, Lock, Users, Trophy, Settings, HelpCircle, BarChart3, Home, X, ChevronRight, GraduationCap, PenTool as Tool } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DashboardSidebar({ isOpen, isMobile, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>('academy');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const navItems = [
    {
      title: 'Overview',
      icon: <Home className="h-5 w-5" />,
      href: '/dashboard',
      items: []
    },
    {
      title: 'Academy',
      icon: <GraduationCap className="h-5 w-5" />,
      key: 'academy',
      items: [
        {
          title: 'Pentesting Web',
          items: [
            { title: 'XSS Attacks', href: '/dashboard/academy/pentesting/xss' },
            { title: 'SQL Injection', href: '/dashboard/academy/pentesting/sql-injection' },
            { title: 'CSRF', href: '/dashboard/academy/pentesting/csrf' },
            { title: 'Authentication Bypass', href: '/dashboard/academy/pentesting/auth-bypass' },
            { title: 'File Inclusion', href: '/dashboard/academy/pentesting/file-inclusion' },
          ]
        },
        {
          title: 'Programming',
          items: [
            { title: 'Secure Coding', href: '/dashboard/academy/programming/secure-coding' },
            { title: 'Exploit Development', href: '/dashboard/academy/programming/exploit-dev' },
            { title: 'Automation', href: '/dashboard/academy/programming/automation' },
            { title: 'Reverse Engineering', href: '/dashboard/academy/programming/reverse-engineering' },
          ]
        },
        {
          title: 'Cryptography',
          items: [
            { title: 'Encryption', href: '/dashboard/academy/cryptography/encryption' },
            { title: 'Hashing', href: '/dashboard/academy/cryptography/hashing' },
            { title: 'Key Exchange', href: '/dashboard/academy/cryptography/key-exchange' },
            { title: 'Digital Signatures', href: '/dashboard/academy/cryptography/digital-signatures' },
          ]
        }
      ]
    },
    {
      title: 'Tools',
      icon: <Tool className="h-5 w-5" />,
      href: '/dashboard/tools',
      items: []
    },
    {
      title: 'Leaderboard',
      icon: <Trophy className="h-5 w-5" />,
      href: '/dashboard/leaderboard',
      items: []
    },
    {
      title: 'Community',
      icon: <Users className="h-5 w-5" />,
      href: '/dashboard/community',
      items: []
    },
    {
      title: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      href: '/dashboard/analytics',
      items: []
    },
  ];
  
  const bottomNavItems = [
    {
      title: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5" />,
      href: '/dashboard/help',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings',
    },
  ];
  
  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };
  
  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div 
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : (isOpen ? "translate-x-0" : "-translate-x-full"),
          "lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-4 border-b border-border">
            <Link href="/" className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
                KaliumLabs
              </span>
            </Link>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="absolute right-2"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <div key={index} className="space-y-1">
                  {item.items.length > 0 ? (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => toggleExpand(item.key || '')}
                        className={cn(
                          "w-full justify-between",
                          expanded === item.key && "bg-purple-500/10 text-purple-500"
                        )}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </div>
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform", 
                          expanded === item.key && "rotate-90"
                        )} />
                      </Button>
                      
                      {expanded === item.key && (
                        <div className="ml-6 space-y-4 pt-2">
                          {item.items.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h4 className="text-sm font-medium mb-2">{section.title}</h4>
                              <div className="space-y-1">
                                {section.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-center py-1.5 px-3 text-sm rounded-md",
                                      pathname === subItem.href
                                        ? "bg-purple-500/10 text-purple-500 font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                    onClick={() => isMobile && setIsOpen(false)}
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md",
                        pathname === item.href
                          ? "bg-purple-500/10 text-purple-500 font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            <Separator className="my-4 mx-2" />
            
            <nav className="grid gap-1 px-2">
              {bottomNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md",
                    pathname === item.href
                      ? "bg-purple-500/10 text-purple-500 font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          
          <div className="p-4 border-t border-border">
            <div className="rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <p className="text-xs font-medium mb-1">Pro Upgrade Available</p>
              <p className="text-xs text-muted-foreground mb-3">Unlock advanced challenges and features</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}