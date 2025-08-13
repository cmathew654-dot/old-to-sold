export function PerformanceOptimizations() {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" href="/vintage-leather-jacket.png" as="image" />
      <link rel="preload" href="/luxury-quilted-handbag.png" as="image" />
      <link rel="preload" href="/antique-wooden-chair.png" as="image" />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.ebay.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  )
}
