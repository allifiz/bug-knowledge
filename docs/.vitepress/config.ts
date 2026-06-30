import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/bug-knowledge/',
  title: 'Bug Knowledge',
  description: 'Panduan bug bounty Indonesia dari teori ke real case.',
  lang: 'id-ID',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Bug Knowledge',
    nav: [
      { text: 'Mulai', link: '/mulai-dari-sini/' },
      { text: 'Guided Hunt', link: '/guided-hunt-flow/program-baru' },
      { text: 'Feature Map', link: '/feature-map/' },
      { text: 'Endpoint Scenarios', link: '/endpoint-scenarios/' },
      { text: 'Real Case', link: '/real-case-simulation/' },
      { text: 'Bug Tree', link: '/bug-tree/' },
      { text: 'Output', link: '/output-encyclopedia/sql-errors' }
    ],
    sidebar: [
      {
        text: 'Mulai dari Sini',
        items: [
          { text: 'Overview', link: '/mulai-dari-sini/' },
          { text: 'Aturan Legal', link: '/mulai-dari-sini/aturan-legal' },
          { text: 'Membaca Scope', link: '/mulai-dari-sini/membaca-scope' },
          { text: 'Tools untuk Pemula', link: '/mulai-dari-sini/tools-untuk-pemula' },
          { text: 'Cara Baca Request & Response', link: '/mulai-dari-sini/cara-baca-request-response' },
          { text: 'Cara Pakai DevTools Network', link: '/mulai-dari-sini/cara-pakai-devtools-network' },
          { text: 'Cara Copy as cURL', link: '/mulai-dari-sini/cara-copy-as-curl' },
          { text: 'Kapan Butuh Burp', link: '/mulai-dari-sini/kapan-butuh-burp' }
        ]
      },
      {
        text: 'Guided Hunt Flow',
        items: [
          { text: 'Program Baru', link: '/guided-hunt-flow/program-baru' },
          { text: 'Mapping Fitur', link: '/guided-hunt-flow/mapping-fitur' },
          { text: 'Mapping Endpoint', link: '/guided-hunt-flow/mapping-endpoint' },
          { text: 'Kapan Berhenti Testing', link: '/guided-hunt-flow/kapan-berhenti-testing' }
        ]
      },
      {
        text: 'Feature Map',
        items: [
          { text: 'Overview', link: '/feature-map/' },
          { text: 'Login', link: '/feature-map/login' },
          { text: 'Register', link: '/feature-map/register' },
          { text: 'Forgot Password', link: '/feature-map/forgot-password' },
          { text: 'Profile', link: '/feature-map/profile' },
          { text: 'Upload', link: '/feature-map/upload' },
          { text: 'Search & Filter', link: '/feature-map/search-filter' },
          { text: 'Invoice & Order', link: '/feature-map/invoice-order' },
          { text: 'Team & Role', link: '/feature-map/team-role' },
          { text: 'Export & Download', link: '/feature-map/export-download' }
        ]
      },
      {
        text: 'Endpoint Scenarios',
        items: [
          { text: 'Overview', link: '/endpoint-scenarios/' },
          { text: 'GET /api/users/{id}', link: '/endpoint-scenarios/user-by-id' },
          { text: 'PATCH /api/users/{id}', link: '/endpoint-scenarios/update-user' },
          { text: 'POST /api/login', link: '/endpoint-scenarios/login' },
          { text: 'Invoice Download', link: '/endpoint-scenarios/invoice-download' },
          { text: 'Upload File', link: '/endpoint-scenarios/upload-file' },
          { text: 'Team Role', link: '/endpoint-scenarios/team-role' },
          { text: 'Coupon Apply', link: '/endpoint-scenarios/coupon-apply' }
        ]
      },
      {
        text: 'Real Case Simulation',
        items: [
          { text: 'Overview', link: '/real-case-simulation/' },
          { text: 'Toko Online', link: '/real-case-simulation/toko-online' },
          { text: 'SaaS Team Workspace', link: '/real-case-simulation/saas-team-workspace' }
        ]
      },
      {
        text: 'Bug Tree',
        items: [
          { text: 'Overview', link: '/bug-tree/' },
          { text: 'Access Control', link: '/bug-tree/access-control/' },
          { text: 'IDOR Read', link: '/bug-tree/access-control/idor-read' },
          { text: 'IDOR Write', link: '/bug-tree/access-control/idor-write' },
          { text: 'Mass Assignment', link: '/bug-tree/access-control/mass-assignment' },
          { text: 'Vertical Privilege Escalation', link: '/bug-tree/access-control/vertical-privilege-escalation' },
          { text: 'Role Tampering', link: '/bug-tree/access-control/role-tampering' },
          { text: 'Unauthorized Action', link: '/bug-tree/access-control/unauthorized-action' },
          { text: 'Authentication', link: '/bug-tree/authentication/' },
          { text: 'User Enumeration', link: '/bug-tree/authentication/user-enumeration' },
          { text: 'Missing Rate Limit', link: '/bug-tree/authentication/missing-rate-limit' },
          { text: 'Weak Account Lockout', link: '/bug-tree/authentication/weak-account-lockout' },
          { text: 'Session Fixation', link: '/bug-tree/authentication/session-fixation' },
          { text: 'Token/Session Not Rotated', link: '/bug-tree/authentication/token-session-not-rotated' },
          { text: 'Email Verification Bypass', link: '/bug-tree/authentication/email-verification-bypass' },
          { text: 'Weak Password Policy', link: '/bug-tree/authentication/weak-password-policy' },
          { text: 'Reset Token Reusable', link: '/bug-tree/authentication/reset-token-reusable' },
          { text: 'Reset Token Not Expired', link: '/bug-tree/authentication/reset-token-not-expired' },
          { text: 'Token Leaked in Response', link: '/bug-tree/authentication/token-leaked-in-response' },
          { text: 'Old Session Valid After Reset', link: '/bug-tree/authentication/old-session-valid-after-reset' },
          { text: 'Weak Reset Flow', link: '/bug-tree/authentication/weak-reset-flow' },
          { text: 'Input Validation', link: '/bug-tree/input-validation/' },
          { text: 'File Exposure', link: '/bug-tree/input-validation/file-exposure' },
          { text: 'Path Traversal Indicator', link: '/bug-tree/input-validation/path-traversal-indicator' },
          { text: 'Business Logic', link: '/bug-tree/business-logic/' },
          { text: 'Price Manipulation', link: '/bug-tree/business-logic/price-manipulation' },
          { text: 'Quantity Manipulation', link: '/bug-tree/business-logic/quantity-manipulation' },
          { text: 'Coupon Reuse', link: '/bug-tree/business-logic/coupon-reuse' },
          { text: 'Workflow Bypass', link: '/bug-tree/business-logic/workflow-bypass' },
          { text: 'Information Disclosure', link: '/bug-tree/information-disclosure/' },
          { text: 'Excessive Response', link: '/bug-tree/information-disclosure/excessive-response' },
          { text: 'Internal Path Leakage', link: '/bug-tree/information-disclosure/internal-path-leakage' },
          { text: 'Sensitive Metadata Exposure', link: '/bug-tree/information-disclosure/sensitive-metadata-exposure' }
        ]
      },
      {
        text: 'Theory to Real Case',
        items: [
          { text: 'SQL Injection', link: '/theory-to-real-case/sql-injection' },
          { text: 'IDOR', link: '/theory-to-real-case/idor' },
          { text: 'XSS', link: '/theory-to-real-case/xss' },
          { text: 'Open Redirect', link: '/theory-to-real-case/open-redirect' }
        ]
      },
      {
        text: 'Output Encyclopedia',
        items: [
          { text: 'SQL Errors', link: '/output-encyclopedia/sql-errors' },
          { text: 'HTTP Status', link: '/output-encyclopedia/http-status-code' },
          { text: 'Access Control Response', link: '/output-encyclopedia/access-control-response' },
          { text: 'XSS Rendering Context', link: '/output-encyclopedia/xss-rendering-context' },
          { text: 'Redirect Headers', link: '/output-encyclopedia/redirect-headers' },
          { text: 'Stack Trace', link: '/output-encyclopedia/stack-trace' },
          { text: 'File Upload Output', link: '/output-encyclopedia/file-upload-output' }
        ]
      },
      {
        text: 'Report Template',
        items: [
          { text: 'General', link: '/report-template/general' },
          { text: 'IDOR', link: '/report-template/idor' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/allifiz/bug-knowledge' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Dibuat untuk edukasi bug bounty yang legal, aman, dan terstruktur.',
      copyright: 'Copyright © 2026-present'
    }
  }
});
