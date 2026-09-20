import type { TSnackbarDetails } from '@Roots'

export function showSnackbar(detail: TSnackbarDetails) {
  const SnackbarEvent = new CustomEvent('showSnackbar', { detail })
  const el = document.getElementById('snackbar')
  el?.dispatchEvent(SnackbarEvent)
}
