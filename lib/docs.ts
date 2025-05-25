import { z } from "zod";

export const DocSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  section: z.string(),
  order: z.number(),
});

export type Doc = z.infer<typeof DocSchema>;

export const docs: Doc[] = [
  // Getting Started
  {
    id: "platform-overview",
    title: "Platform Overview",
    category: "getting-started",
    section: "Getting Started",
    order: 1,
    content: `
# Platform Overview

KaliumLabs is a comprehensive cybersecurity learning platform designed to help you master practical security skills through hands-on challenges and structured learning paths.

## Key Features

- **Interactive Challenges**: Real-world scenarios that simulate actual security vulnerabilities
- **Progressive Learning**: Structured paths from basics to advanced concepts
- **Hands-on Labs**: Safe environment to practice security techniques
- **Real-time Feedback**: Immediate feedback on your solutions
- **Community Support**: Learn alongside other security enthusiasts

## Platform Structure

1. **Challenge Labs**: Isolated environments for practicing security techniques
2. **Learning Paths**: Structured courses covering various security domains
3. **Progress Tracking**: Monitor your advancement and skill development
4. **Community Forums**: Discuss solutions and share knowledge
    `
  },
  {
    id: "quick-start-guide",
    title: "Quick Start Guide",
    category: "getting-started",
    section: "Getting Started",
    order: 2,
    content: `
# Quick Start Guide

Get started with KaliumLabs in just a few steps.

## 1. Create Your Account

- Sign up using your email
- Verify your email address
- Complete your profile

## 2. Choose Your Path

- Browse available learning paths
- Select a path matching your skill level
- Start with fundamentals if you're new

## 3. Start Your First Challenge

- Navigate to the Challenges section
- Choose a beginner-friendly challenge
- Read the challenge description carefully
- Follow the setup instructions

## 4. Join the Community

- Introduce yourself in the forums
- Join study groups
- Participate in discussions
    `
  },
  {
    id: "account-setup",
    title: "Account Setup",
    category: "getting-started",
    section: "Getting Started",
    order: 3,
    content: `
# Account Setup

Configure your KaliumLabs account for the best learning experience.

## Profile Setup

1. **Personal Information**
   - Add your full name
   - Upload a profile picture
   - Set your time zone

2. **Security Settings**
   - Enable two-factor authentication
   - Set up recovery options
   - Review security preferences

3. **Learning Preferences**
   - Choose your primary learning path
   - Set difficulty preferences
   - Configure notification settings

## Environment Setup

1. **Development Environment**
   - Install recommended tools
   - Configure your IDE
   - Set up required dependencies

2. **Lab Access**
   - Configure VPN access
   - Test lab connectivity
   - Verify tool access
    `
  },
  {
    id: "first-challenge",
    title: "First Challenge",
    category: "getting-started",
    section: "Getting Started",
    order: 4,
    content: `
# Your First Challenge

Learn how to approach and complete your first security challenge.

## Challenge Structure

1. **Overview**
   - Challenge description
   - Learning objectives
   - Difficulty level
   - Estimated completion time

2. **Prerequisites**
   - Required knowledge
   - Necessary tools
   - Environment setup

3. **Step-by-Step Guide**
   - Read the scenario
   - Analyze the target
   - Plan your approach
   - Execute your solution
   - Submit your findings

## Tips for Success

- Read all instructions carefully
- Take notes during your attempt
- Use provided hints wisely
- Ask for help when stuck
- Review solutions after completion
    `
  },
  // Challenge Guides
  {
    id: "web-security-fundamentals",
    title: "Web Security Fundamentals",
    category: "challenge-guides",
    section: "Challenge Guides",
    order: 1,
    content: `
# Web Security Fundamentals

Essential concepts for understanding web security.

## Core Concepts

1. **HTTP Protocol**
   - Request/Response cycle
   - Headers and methods
   - Status codes
   - HTTPS and TLS

2. **Web Architecture**
   - Client-server model
   - Same-origin policy
   - CORS
   - Web storage

3. **Common Vulnerabilities**
   - Input validation
   - Authentication flaws
   - Authorization bypass
   - Session management

## Security Headers

\`\`\`http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
\`\`\`

## Best Practices

- Always validate input
- Implement proper authentication
- Use secure session management
- Enable security headers
- Keep dependencies updated
    `
  },
  {
    id: "xss-prevention",
    title: "XSS Prevention",
    category: "challenge-guides",
    section: "Challenge Guides",
    order: 2,
    content: `
# XSS Prevention Guide

Learn how to prevent Cross-Site Scripting (XSS) attacks.

## Types of XSS

1. **Reflected XSS**
   - Payload in request
   - Reflected in response
   - Not stored

2. **Stored XSS**
   - Payload persisted
   - Affects multiple users
   - Higher impact

3. **DOM-based XSS**
   - Client-side vulnerability
   - Manipulates DOM
   - No server interaction

## Prevention Techniques

\`\`\`typescript
// Bad
element.innerHTML = userInput;

// Good
element.textContent = userInput;

// Using DOMPurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
\`\`\`

## Security Headers

\`\`\`http
Content-Security-Policy: script-src 'self'
X-XSS-Protection: 1; mode=block
\`\`\`

## Best Practices

- Encode output
- Validate input
- Use CSP headers
- Implement sanitization
- Use security libraries
    `
  },
  {
    id: "sql-injection-defense",
    title: "SQL Injection Defense",
    category: "challenge-guides",
    section: "Challenge Guides",
    order: 3,
    content: `
# SQL Injection Defense

Protect your applications from SQL injection attacks.

## Understanding SQL Injection

1. **Types of SQL Injection**
   - Union-based
   - Error-based
   - Blind
   - Time-based

2. **Attack Vectors**
   - User input fields
   - HTTP headers
   - Cookie values
   - File uploads

## Prevention Techniques

\`\`\`typescript
// Bad
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Good
const query = 'SELECT * FROM users WHERE id = $1';
const values = [userId];
await client.query(query, values);
\`\`\`

## Best Practices

- Use parameterized queries
- Implement proper escaping
- Validate input
- Limit database privileges
- Use ORMs when possible
    `
  },
  {
    id: "authentication-best-practices",
    title: "Authentication Best Practices",
    category: "challenge-guides",
    section: "Challenge Guides",
    order: 4,
    content: `
# Authentication Best Practices

Implement secure authentication in your applications.

## Core Concepts

1. **Password Security**
   - Hashing algorithms
   - Salt and pepper
   - Password policies
   - Storage best practices

2. **Multi-factor Authentication**
   - Types of factors
   - Implementation
   - Recovery options
   - User experience

## Implementation Example

\`\`\`typescript
import { hash, compare } from 'bcrypt';

// Hash password
const hashedPassword = await hash(password, 12);

// Verify password
const isValid = await compare(password, hashedPassword);
\`\`\`

## Security Checklist

- Implement proper password hashing
- Use secure session management
- Enable MFA
- Implement rate limiting
- Provide secure password reset
    `
  },
  // Resources
  {
    id: "best-practices",
    title: "Best Practices",
    category: "resources",
    section: "Resources",
    order: 1,
    content: `
# Security Best Practices

Essential security practices for modern applications.

## Application Security

1. **Input Validation**
   - Validate all input
   - Sanitize data
   - Use strong types
   - Implement rate limiting

2. **Authentication**
   - Use strong password policies
   - Implement MFA
   - Secure session management
   - Safe password recovery

3. **Authorization**
   - Implement RBAC
   - Use principle of least privilege
   - Validate permissions
   - Audit access logs

## Code Security

- Use security linters
- Regular dependency updates
- Code review processes
- Security testing
    `
  },
  {
    id: "security-guidelines",
    title: "Security Guidelines",
    category: "resources",
    section: "Resources",
    order: 2,
    content: `
# Security Guidelines

Comprehensive security guidelines for development.

## Development Guidelines

1. **Secure Coding**
   - Input validation
   - Output encoding
   - Error handling
   - Logging practices

2. **API Security**
   - Authentication
   - Rate limiting
   - Input validation
   - Error handling

3. **Database Security**
   - Connection security
   - Query parameterization
   - Access control
   - Backup procedures

## Deployment Guidelines

- Use HTTPS
- Configure security headers
- Implement monitoring
- Regular updates
- Backup procedures
    `
  },
  {
    id: "tool-recommendations",
    title: "Tool Recommendations",
    category: "resources",
    section: "Resources",
    order: 3,
    content: `
# Security Tools

Recommended tools for security testing and development.

## Development Tools

1. **IDEs & Editors**
   - VS Code + Security extensions
   - JetBrains Security plugins
   - Vim security plugins

2. **Security Testing**
   - OWASP ZAP
   - Burp Suite
   - Metasploit
   - Nmap

3. **Code Analysis**
   - SonarQube
   - ESLint security rules
   - SAST tools
   - Dependency scanners

## Monitoring Tools

- ELK Stack
- Prometheus
- Grafana
- Security Information and Event Management (SIEM)
    `
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    category: "resources",
    section: "Resources",
    order: 4,
    content: `
# Troubleshooting Guide

Common issues and their solutions.

## Common Issues

1. **Authentication Problems**
   - Session issues
   - MFA problems
   - Password reset
   - Account lockouts

2. **Access Control**
   - Permission errors
   - Role issues
   - Token problems
   - API access

3. **Performance**
   - Slow responses
   - High resource usage
   - Memory leaks
   - Database issues

## Debug Techniques

- Log analysis
- Network monitoring
- Performance profiling
- Security scanning
    `
  }
];

export function getDocsByCategory(category: string): Doc[] {
  return docs.filter(doc => doc.category === category).sort((a, b) => a.order - b.order);
}

export function getDocById(id: string): Doc | undefined {
  return docs.find(doc => doc.id === id);
}

export function getAllCategories(): { category: string; section: string }[] {
  const categoriesMap = new Map<string, string>();
  docs.forEach(doc => {
    if (!categoriesMap.has(doc.category)) {
      categoriesMap.set(doc.category, doc.section);
    }
  });
  return Array.from(categoriesMap.entries()).map(([category, section]) => ({ category, section }));
}
