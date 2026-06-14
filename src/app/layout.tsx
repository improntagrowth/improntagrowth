import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { ScrollDepthTracker } from '@/components/analytics'
import { GoogleTagManager } from '@/components/google-tag-manager'
import { SiteLoader } from '@/components/site-loader'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impronta Growth',
  description:
    'Escalá tu negocio a US$10.000-30.000 al mes sin volverte viral ni trabajar 12 horas por día.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#fafffa',
}

const vslScript = `
  (function() {
    var floatStart = 700;
    var mobileQuery = window.matchMedia('(max-width: 767px)');

    function trackEvent(eventName, properties) {
      var eventPayload = Object.assign({
        event: eventName,
        page_path: window.location.pathname,
        page_url: window.location.href
      }, properties || {});

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventPayload);

      if (window.__IMPRONTA_ANALYTICS_DEBUG__ === true) {
        console.info('[analytics]', eventPayload);
      }
    }

    function getWrappers() {
      return document.querySelectorAll('[data-vsl-wrapper]');
    }

    function updateUnmuteButton(wrapper) {
      var video = wrapper.querySelector('[data-vsl-video]');
      var wistia = wrapper.__wistiaVideo;
      var button = wrapper.querySelector('[data-vsl-unmute]');

      if (!button) {
        return;
      }

      if (wistia) {
        var shouldShowWistiaButton = true;

        try {
          shouldShowWistiaButton = typeof wistia.isMuted === 'function' ? wistia.isMuted() : true;
        } catch (_) {}

        button.hidden = !shouldShowWistiaButton;
        button.style.display = shouldShowWistiaButton ? '' : 'none';
        button.setAttribute('aria-hidden', shouldShowWistiaButton ? 'false' : 'true');
        return;
      }

      if (!video) {
        button.hidden = false;
        button.style.display = '';
        button.setAttribute('aria-hidden', 'false');
        return;
      }

      var shouldShow = video.muted || video.volume === 0;

      button.hidden = !shouldShow;
      button.style.display = shouldShow ? '' : 'none';
      button.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    }

    function attemptWistiaAutoplay(wrapper, wistiaVideo, attempt) {
      var nextAttempt = attempt || 0;

      if (wrapper.__vslUserUnmuted === true) {
        return;
      }

      try {
        if (wrapper.__vslUserUnmuted !== true && typeof wistiaVideo.mute === 'function') {
          wistiaVideo.mute();
        }

        if (typeof wistiaVideo.play === 'function') {
          var playResult = wistiaVideo.play();

          if (playResult && typeof playResult.catch === 'function') {
            playResult.catch(function() {});
          }
        }
      } catch (_) {}

      if (nextAttempt >= 3) {
        updateUnmuteButton(wrapper);
        return;
      }

      wrapper.__vslAutoplayTimers = wrapper.__vslAutoplayTimers || [];
      wrapper.__vslAutoplayTimers.push(window.setTimeout(function() {
        attemptWistiaAutoplay(wrapper, wistiaVideo, nextAttempt + 1);
      }, [250, 900, 1800][nextAttempt]));
    }

    function clearWistiaAutoplayRetries(wrapper) {
      var timers = wrapper.__vslAutoplayTimers || [];

      for (var i = 0; i < timers.length; i++) {
        window.clearTimeout(timers[i]);
      }

      wrapper.__vslAutoplayTimers = [];
    }

    function attemptLocalAutoplay(video) {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.play().catch(function() {});
      } catch (_) {}
    }

    function initWistia(wrapper) {
      var wistia = wrapper.querySelector('[data-vsl-wistia]');

      if (!wistia || wistia.__vslReady === true) {
        return;
      }

      wistia.__vslReady = true;

      window._wq = window._wq || [];
      window._wq.push({
        id: wistia.dataset.wistiaId,
        onReady: function(wistiaVideo) {
          wrapper.__wistiaVideo = wistiaVideo;
          attemptWistiaAutoplay(wrapper, wistiaVideo, 0);

          wistiaVideo.bind('mutechange', function() {
            updateUnmuteButton(wrapper);
          });

          wistiaVideo.bind('volumechange', function() {
            updateUnmuteButton(wrapper);
          });

          wistiaVideo.bind('play', function() {
            if (wrapper.__vslPlayTracked === true) {
              return;
            }

            wrapper.__vslPlayTracked = true;
            trackEvent('vsl_play', { provider: 'wistia' });
          });

          updateUnmuteButton(wrapper);
        }
      });
    }

    function observeVslView(wrapper) {
      if (wrapper.__vslViewObserverReady === true) {
        return;
      }

      wrapper.__vslViewObserverReady = true;

      if (!('IntersectionObserver' in window)) {
        wrapper.__vslViewed = true;
            trackEvent('vsl_view', {
              provider: wrapper.querySelector('[data-vsl-wistia]') ? 'wistia' : 'local_video'
            });
        return;
      }

      var observer = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting && entries[i].intersectionRatio >= 0.5) {
            if (wrapper.__vslViewed !== true) {
              wrapper.__vslViewed = true;
              trackEvent('vsl_view', {
                provider: wrapper.querySelector('[data-vsl-wistia]') ? 'wistia' : 'local_video'
              });
            }

            observer.disconnect();
            return;
          }
        }
      }, { threshold: [0.5] });

      observer.observe(wrapper);
    }

    function updateFloatingState() {
      var wrappers = getWrappers();
      var isMobile = mobileQuery.matches;
      var shouldFloat = isMobile && window.scrollY > floatStart;

      for (var i = 0; i < wrappers.length; i++) {
        var wrapper = wrappers[i];
        var player = wrapper.querySelector('[data-vsl-player]');

        if (!player) {
          continue;
        }

        player.classList.toggle('is-floating', shouldFloat);
      }
    }

    function initVsl() {
      var wrappers = getWrappers();

      for (var i = 0; i < wrappers.length; i++) {
        var wrapper = wrappers[i];
        var video = wrapper.querySelector('[data-vsl-video]');

        initWistia(wrapper);
        observeVslView(wrapper);

        if (!video || video.__vslReady === true) {
          continue;
        }

        video.__vslReady = true;
        video.addEventListener('volumechange', function(event) {
          var currentWrapper = event.currentTarget.closest('[data-vsl-wrapper]');

          if (currentWrapper) {
            updateUnmuteButton(currentWrapper);
          }
        });

        video.addEventListener('play', function(event) {
          var currentWrapper = event.currentTarget.closest('[data-vsl-wrapper]');

          if (!currentWrapper || currentWrapper.__vslPlayTracked === true) {
            return;
          }

          currentWrapper.__vslPlayTracked = true;
          trackEvent('vsl_play', { provider: 'local_video' });
        });

        updateUnmuteButton(wrapper);
      }

      updateFloatingState();
    }

    document.addEventListener('click', function(event) {
      var fullscreenButton = event.target && event.target.closest ? event.target.closest('[data-vsl-fullscreen]') : null;

      if (fullscreenButton) {
        event.preventDefault();

        var fullscreenWrapper = fullscreenButton.closest('[data-vsl-wrapper]');
        var fullscreenVideo = fullscreenWrapper ? fullscreenWrapper.querySelector('[data-vsl-video]') : null;
        var fullscreenPlayer = fullscreenWrapper ? fullscreenWrapper.querySelector('[data-vsl-player]') : null;
        var fullscreenWistia = fullscreenWrapper ? fullscreenWrapper.__wistiaVideo : null;

        trackEvent('vsl_fullscreen', { provider: fullscreenWistia ? 'wistia' : 'local_video' });

        if (fullscreenWistia && typeof fullscreenWistia.requestFullscreen === 'function') {
          fullscreenWistia.requestFullscreen();
          return;
        }

        if (fullscreenVideo && typeof fullscreenVideo.requestFullscreen === 'function') {
          fullscreenVideo.requestFullscreen();
          return;
        }

        if (fullscreenPlayer && typeof fullscreenPlayer.requestFullscreen === 'function') {
          fullscreenPlayer.requestFullscreen();
        }

        return;
      }

      var button = event.target && event.target.closest ? event.target.closest('[data-vsl-unmute]') : null;

      if (!button) {
        return;
      }

      event.preventDefault();

      var wrapper = button.closest('[data-vsl-wrapper]');
      var video = wrapper ? wrapper.querySelector('[data-vsl-video]') : null;
      var wistia = wrapper ? wrapper.__wistiaVideo : null;

      if (wrapper) {
        wrapper.__vslUserUnmuted = true;
        clearWistiaAutoplayRetries(wrapper);
      }

      trackEvent('vsl_unmute', { provider: wistia ? 'wistia' : 'local_video' });

      if (wistia) {
        try {
          wistia.unmute();
          wistia.volume(1);
          wistia.play();
        } catch (_) {}

        button.hidden = true;
        button.style.display = 'none';
        button.setAttribute('aria-hidden', 'true');
        return;
      }

      if (!video) {
        return;
      }

      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1;
      video.removeAttribute('muted');
      video.play().catch(function() {});

      button.hidden = true;
      button.style.display = 'none';
      button.setAttribute('aria-hidden', 'true');
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initVsl);
    } else {
      initVsl();
    }

    window.addEventListener('load', initVsl);
    window.addEventListener('scroll', updateFloatingState, { passive: true });
    window.addEventListener('resize', updateFloatingState);
    mobileQuery.addEventListener('change', updateFloatingState);
  })();
`

const headerScript = `
  (function() {
    function updateHeader() {
      var header = document.querySelector('[data-site-header]');

      if (!header) {
        return;
      }

      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateHeader);
    } else {
      updateHeader();
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang='es' className='h-full antialiased'>
      <head>
        <link rel='preconnect' href='https://fast.wistia.net' />
        <link rel='preconnect' href='https://embed-ssl.wistia.com' />
        <link rel='preconnect' href='https://assets.calendly.com' />
        <link rel='preconnect' href='https://calendly.com' />
        <link rel='preconnect' href='https://www.youtube.com' />
        <link rel='dns-prefetch' href='https://fast.wistia.net' />
        <link rel='dns-prefetch' href='https://assets.calendly.com' />
        <link rel='dns-prefetch' href='https://calendly.com' />
        <Script
          id='analytics-debug'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `window.__IMPRONTA_ANALYTICS_DEBUG__ = ${process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' ? 'true' : 'false'};`,
          }}
        />
        <Script
          id='vsl-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: vslScript }}
        />
        <Script
          id='header-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: headerScript }}
        />
      </head>
      <body className='min-h-full flex flex-col'>
        <GoogleTagManager id={gtmId} />
        <ScrollDepthTracker />
        <SiteLoader />
        {children}
      </body>
    </html>
  )
}
