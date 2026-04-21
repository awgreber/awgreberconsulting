const DEFAULT_BOOKINGS_URL = '/contact'

/** Set `VITE_MICROSOFT_BOOKINGS_URL` in `client/.env` for Microsoft Bookings. */
export function getBookingsUrl(): string {
  const v = import.meta.env.VITE_MICROSOFT_BOOKINGS_URL
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : DEFAULT_BOOKINGS_URL
}
