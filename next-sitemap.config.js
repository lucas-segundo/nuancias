/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  exclude: ['404', '500'],
  generateRobotsTxt: true,
}
