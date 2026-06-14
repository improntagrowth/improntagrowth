# Tracking setup

The site sends custom events to `window.dataLayer`. If `NEXT_PUBLIC_GTM_ID` is configured, Google Tag Manager can forward those events to GA4 or another destination.

## Environment variables

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ANALYTICS_DEBUG=false
```

Use `NEXT_PUBLIC_ANALYTICS_DEBUG=true` only while testing locally. It prints each event payload in the browser console.

## Events

- `cta_click`: clicks on scheduling/result CTAs.
- `lead_intent`: clicks that indicate intent to schedule a call.
- `agenda_view`: `/agenda` page viewed.
- `agenda_event_type_viewed`: Calendly event type loaded.
- `agenda_date_selected`: user selected a date/time in Calendly.
- `agenda_scheduled`: Calendly meeting scheduled.
- `results_view`: `/resultados` page viewed.
- `testimonial_click`: testimonial video opened.
- `vsl_view`: VSL enters the viewport.
- `vsl_play`: VSL starts playing.
- `vsl_unmute`: user clicks the sound button.
- `vsl_fullscreen`: user clicks the fullscreen button.
- `scroll_50`: user reaches 50% scroll depth.
- `scroll_75`: user reaches 75% scroll depth.

## Required external setup

Create a GTM web container and set `NEXT_PUBLIC_GTM_ID`. Inside GTM, create GA4 event tags triggered by the custom event names above.
