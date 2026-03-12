export default class AppConfig {
  // Shared viewport config — once: true avoids re-triggering animations on scroll-up
  static VIEWPORT = { once: true, margin: "-100px" } as const;
  static VIEWPORT_UNDERLINE = { once: true, margin: "-50px" } as const;
}
