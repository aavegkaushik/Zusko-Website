/**
 * Amazon / Next.js Style Route Prefetching Engine for Zusko
 *
 * Automatically downloads and caches page chunks in background on:
 * 1. Link Hover (mouse over)
 * 2. Touch Start (mobile finger touch)
 * 3. Viewport intersection (optional)
 *
 * Result: 0ms perceived delay when the user clicks a link.
 */

export const routeLoaders = {
  "/": () => import("../Pages/Home.jsx"),
  "/about": () => import("../Pages/About.jsx"),
  "/services": () => import("../Pages/Services.jsx"),
  "/contact": () => import("../Pages/Contact.jsx"),
  "/place-order": () => import("../Pages/Order.jsx"),
  "/cart": () => import("../Pages/Cart.jsx"),
  "/checkout": () => import("../Pages/Checkout.jsx"),
  "/my-orders": () => import("../Pages/MyOrders.jsx"),
  "/user/profile": () => import("../Pages/Profile.jsx"),
  "/profile/edit": () => import("../Pages/EditProfile.jsx"),
  "/addresses": () => import("../Pages/Addresses.jsx"),
  "/auth/login": () => import("../Pages/Login.jsx"),
  "/help": () => import("../Pages/Help&Support.jsx"),
  "/for-business": () => import("../Pages/ForBusiness.jsx"),
  "/blog": () => import("../Pages/Blog.jsx"),
  "/partnerwithus": () => import("../Pages/PartnerwithUs.jsx"),
  "/terms": () => import("../Pages/TermsCondition.jsx"),
  "/privacy": () => import("../Pages/Privacy.jsx"),
  "/career": () => import("../Pages/Career.jsx"),
  "/team": () => import("../Pages/Team.jsx"),
};

const prefetchedCache = new Set();

/**
 * Preload a route component in the background.
 * Uses requestIdleCallback so it never interferes with smooth 60fps animations or user input.
 *
 * @param {string} path - Target path e.g. "/services", "/place-order"
 */
export const prefetchRoute = (path) => {
  if (!path || prefetchedCache.has(path)) return;

  const normalizedPath = path.split("?")[0].split("#")[0];
  const loader = routeLoaders[normalizedPath];

  if (loader) {
    prefetchedCache.add(normalizedPath);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => {
          loader().catch(() => {});
        },
        { timeout: 1500 }
      );
    } else {
      setTimeout(() => {
        loader().catch(() => {});
      }, 50);
    }
  }
};
