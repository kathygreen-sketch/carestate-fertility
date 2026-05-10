/**
 * CareState Real-time State Bridge
 * Supabase Realtime Broadcast (cross-device) +
 * BroadcastChannel (same-browser) + storage event fallback.
 */
(function () {
  'use strict';

  var SUPA_URL = 'https://ygfktzxdfokymkoodvyh.supabase.co';
  var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZmt0enhkZm9reW1rb29kdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTAxMjgsImV4cCI6MjA5MzkyNjEyOH0.atQoZ2TdxHwh_cRgwJUzaFbmjkBxqMYuTWEjEApGc8g';

  var _callbacks = [];
  var _seen = {};   // dedup: ts+type -> true

  function dispatch(payload) {
    if (!payload || !payload.ts) return;
    var key = payload.ts + ':' + payload.type;
    if (_seen[key]) return;
    _seen[key] = true;
    setTimeout(function () { delete _seen[key]; }, 5000);
    _callbacks.forEach(function (cb) { try { cb(payload); } catch (e) {} });
  }

  // ── Supabase Realtime Broadcast (cross-device / cross-network) ──
  var _supaChannel = null;

  function initSupabase() {
    if (!window.supabase || !window.supabase.createClient) return;
    var client = window.supabase.createClient(SUPA_URL, SUPA_KEY);
    _supaChannel = client
      .channel('carestate_rt')
      .on('broadcast', { event: '*' }, function (msg) {
        if (msg && msg.payload) dispatch(msg.payload);
      })
      .subscribe();
  }

  // ── BroadcastChannel (same-browser, cross-tab) ──────────────────
  var _bc = null;
  try { _bc = new BroadcastChannel('carestate_rt'); } catch (e) {}
  if (_bc) {
    _bc.addEventListener('message', function (e) {
      if (e.data) dispatch(e.data);
    });
  }

  // ── Storage event fallback (cross-window, same origin) ──────────
  window.addEventListener('storage', function (e) {
    if (e.key === 'cs_rt_event' || e.key === 'carestate_nurse_rescue') {
      try { if (e.newValue) dispatch(JSON.parse(e.newValue)); } catch (_) {}
    }
  });

  // ── Outbound broadcast ───────────────────────────────────────────
  function broadcast(payload) {
    if (_supaChannel) {
      try {
        _supaChannel.send({ type: 'broadcast', event: payload.type, payload: payload });
      } catch (e) {}
    }
    try { if (_bc) _bc.postMessage(payload); } catch (e) {}
    localStorage.setItem('cs_rt_event', JSON.stringify(payload));
  }

  window.CARE_STATE = {

    emitLoopClosed: function (medId, medName) {
      broadcast({
        type: 'loop_closed',
        medId: medId,
        medName: medName,
        patientCode: 'IVF-2847',
        ts: Date.now()
      });
    },

    emitRescue: function (patientCode, patientAlias, message, sentBy) {
      var payload = {
        type: 'rescue',
        patientCode: patientCode,
        patientAlias: patientAlias,
        message: message,
        sentBy: sentBy || 'Clinical Team',
        ts: Date.now()
      };
      localStorage.setItem('carestate_nurse_rescue', JSON.stringify(payload));
      broadcast(payload);
    },

    onMessage: function (callback) {
      _callbacks.push(callback);
    }
  };

  // Init Supabase once DOM is ready (CDN script may not be parsed yet)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
  } else {
    initSupabase();
  }
})();
