/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  exclude: ['404', '500'],
  generateRobotsTxt: true,
}
