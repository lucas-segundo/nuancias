export const GA_TRACKING_ID = String(process.env.NEXT_PUBLIC_GA_ID) //TODO:set this to your GA tracking ID env var

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({
  action,
  category,
  label,
  value = 1,
}: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
