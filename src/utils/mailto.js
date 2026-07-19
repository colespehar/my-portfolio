export const CONTACT_EMAIL = "cole.spehar97@gmail.com";

// mailto: URLs get truncated by mail clients somewhere past ~2000 chars, and
// the limit varies by client. Stay well under it and tell the user rather than
// letting their message get silently cut off.
const MAILTO_SAFE_LENGTH = 1500;

/**
 * Builds a mailto: URL with the enquiry pre-filled.
 *
 * Navigating to a mailto: URL works fine — it is mailto *form submission*
 * (method="post" action="mailto:") that browsers silently drop, which is what
 * this contact form used to do.
 */
export function buildMailto({ name, email, message }) {
  const subject = `Portfolio enquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return {
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    tooLong: body.length > MAILTO_SAFE_LENGTH,
  };
}
