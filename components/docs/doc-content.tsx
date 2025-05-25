"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Doc } from '@/lib/docs';
import { cn } from '@/lib/utils';

interface DocContentProps {
  doc: Doc;
}

export function DocContent({ doc }: DocContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none"
    >
      <ReactMarkdown
        components={{
          h1: ({ className, ...props }) => (
            <h1 
              className={cn(
                "scroll-m-20 text-4xl font-bold tracking-tight",
                className
              )} 
              {...props} 
            />
          ),
          h2: ({ className, ...props }) => (
            <h2 
              className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className
              )} 
              {...props} 
            />
          ),
          h3: ({ className, ...props }) => (
            <h3 
              className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className
              )} 
              {...props} 
            />
          ),
          h4: ({ className, ...props }) => (
            <h4 
              className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className
              )} 
              {...props} 
            />
          ),
          p: ({ className, ...props }) => (
            <p 
              className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} 
              {...props} 
            />
          ),
          ul: ({ className, ...props }) => (
            <ul 
              className={cn("my-6 ml-6 list-disc", className)} 
              {...props} 
            />
          ),
          ol: ({ className, ...props }) => (
            <ol 
              className={cn("my-6 ml-6 list-decimal", className)} 
              {...props} 
            />
          ),
          li: ({ className, ...props }) => (
            <li 
              className={cn("mt-2", className)} 
              {...props} 
            />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                className="rounded-md"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code 
                className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} 
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {doc.content}
      </ReactMarkdown>
    </motion.div>
  );
}