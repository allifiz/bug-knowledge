import { defineConfig } from 'vitepress';

export default defineConfig({
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
      { text: 'Bug Tree', link: '/bug-tree/' },
      { text: 'Theory to Real Case', link: '/theory-to-real-case/sql-injection' },
      { text: 'Output', link: '/output-encyclopedia/sql-errors' }
    ],
    sidebar: [
      {
        text: 'Mulai dari Sini',
        items: [
          { text: 'Overview', link: '/mulai-dari-sini/' },
          { text: 'Aturan Legal', link: '/mulai-dari-sini/aturan-legal' },
          { text: 'Membaca Scope', link: '/mulai-dari-sini/membaca-scope' }
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
          { text: 'Profile', link: '/feature-map/profile' },
          { text: 'Upload', link: '/feature-map/upload' },
          { text: 'Invoice & Order', link: '/feature-map/invoice-order' }
        ]
      },
      {
        text: 'Bug Tree',
        items: [
          { text: 'Overview', link: '/bug-tree/' },
          { text: 'Access Control', link: '/bug-tree/access-control/' },
          { text: 'IDOR Read', link: '/bug-tree/access-control/idor-read' },
          { text: 'IDOR Write', link: '/bug-tree/access-control/idor-write' },
          { text: 'Authentication', link: '/bug-tree/authentication/' },
          { text: 'Input Validation', link: '/bug-tree/input-validation/' }
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
          { text: 'Access Control Response', link: '/output-encyclopedia/access-control-response' }
        ]
      },
      {
        text: 'Report Template',
        items: [
          { text: 'General', link: '/report-template/general' },
          { text: 'IDOR', link: '/report-template/idor' },
          { text: 'SQLi Indicator', link: '/report-template/sqli-indicator' }
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
