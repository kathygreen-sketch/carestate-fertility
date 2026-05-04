/**
 * CareState Real-time State Bridge
 * BroadcastChannel (same-browser cross-tab) + storage event (cross-window) fallback.
 * Drop <script src="state.js"> on any page that needs live sync.
 */
(function () {
  'use strict';

  var ch = null;
  try { ch = new BroadcastChannel('carestate_rt'); } catch (e) {}

  function broadcast(payload) {
    try {
      if (ch) ch.postMessage(payload);
    } catch (e) {}
    // storage event fires in OTHER windows/tabs (not current) — complementary to BroadcastChannel
    localStorage.setItem('cs_rt_event', JSON.stringify(payload));
  }

  window.CARE_STATE = {

    // ── Patient side ─────────────────────────────────────────────
    // Call when patient confirms a dose. Partner grid flips to Verified instantly.
    emitLoopClosed: function (medId, medName) {
      broadcast({
        type: 'loop_closed',
        medId: medId,
        medName: medName,
        patientCode: 'IVF-2847',   // demo: always Patient A
        ts: Date.now()
      });
    },

    // ── Nurse side ───────────────────────────────────────────────
    // Call when nurse sends a Precision Rescue. Appears on patient's Now Card.
    emitRescue: function (patientCode, patientAlias, message, sentBy) {
      var payload = {
        type: 'rescue',
        patientCode: patientCode,
        patientAlias: patientAlias,
        message: message,
        sentBy: sentBy || 'Clinical Team',
        ts: Date.now()
      };
      // Also write to the key dashboard.html already polls
      localStorage.setItem('carestate_nurse_rescue', JSON.stringify(payload));
      broadcast(payload);
    },

    // ── Shared listener ──────────────────────────────────────────
    onMessage: function (callback) {
      if (ch) {
        ch.addEventListener('message', function (e) { callback(e.data); });
      }
      window.addEventListener('storage', function (e) {
        if (e.key === 'cs_rt_event' || e.key === 'carestate_nurse_rescue') {
          try { if (e.newValue) callback(JSON.parse(e.newValue)); } catch (_) {}
        }
      });
    }
  };
})();
