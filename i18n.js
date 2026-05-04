/**
 * CareState i18n — shared multilingual layer
 * Drop <script src="i18n.js"> before </body> on any page.
 * Register re-render callbacks via I18N.onSwitch(fn).
 * Translate static text with data-i18n="key" on any element.
 * Translate placeholders with data-i18n-placeholder="key".
 * Translate JS strings with t('key') or window.I18N.t('key').
 */
(function () {
  'use strict';

  // ── Language registry ─────────────────────────────────────────────
  var LANGS = {
    en:  { name: 'English',   flag: '🇬🇧', short: 'EN'  },
    zh:  { name: '中文',       flag: '🇨🇳', short: 'ZH'  },
    es:  { name: 'Español',   flag: '🇪🇸', short: 'ES'  },
    hi:  { name: 'हिन्दी',     flag: '🇮🇳', short: 'HI'  }
  };

  // ── Translation strings ───────────────────────────────────────────
  var STRINGS = {
    /* ═══════════════════════════════════════════════════════════════
       ENGLISH  (canonical reference)
    ═══════════════════════════════════════════════════════════════ */
    en: {
      // Common
      'common.back':    'Back',
      'common.cancel':  'Cancel',
      'common.close':   'Close',
      'common.save':    'Save',
      'common.confirm': 'Confirm',
      'common.reset':   'Reset',
      'common.clear':   'Clear',
      'common.discard': 'Discard',

      // Navigation
      'nav.today':      'Today',
      'nav.schedule':   'Schedule',
      'nav.safe_room':  'Safe Room',
      'nav.lexicon':    'Lexicon',
      'nav.dashboard':  'Dashboard',
      'nav.capture':    'Capture',
      'nav.synced':     'Synced',
      'nav.pending':    'Pending',

      // Phase tabs
      'phase.stim':     'Stimulation',
      'phase.wait':     'Day 5 Wait',
      'phase.retrieval':'Retrieval',

      // Dashboard
      'dash.protocol_imported':    'Protocol Imported via Scan',
      'dash.captured_from':        'Captured from clinical handout',
      'dash.night_mode_title':     'Night Mode · Injection Window',
      'dash.night_mode_msg':       '9 PM SOS Bridge is active — help is one tap away.',
      'dash.med_inventory':        'Med Inventory Verified',
      'dash.med_inventory_sub':    '3-day supply confirmed · Next audit in 18h',
      'dash.upcoming':             'Upcoming Today',
      'dash.protocol_complete':    "Tonight's protocol is complete.",
      'dash.protocol_complete_sub':'All doses confirmed and synced with clinic.',
      'dash.logistics_verified':   'Logistics Verified',
      'dash.verification_pending': 'Verification Pending',
      'dash.next_action':          'Next Action · Now',
      'dash.what_is':              'What is',
      'dash.mark_complete':        'Mark Dose Complete',
      'dash.loop_closed':          'Loop Closed ✓',
      'dash.syncing':              'Syncing…',
      'dash.all_clear':            'All Clear',
      'dash.pending_sync':         'Pending Sync',
      'dash.bridge_rx_active':     'Awaiting sync · Bridge Rx active',
      'dash.delivered_verified':   'Delivered & Verified · 6:30 PM',
      'dash.no_more_actions':      'No more actions today.',
      'dash.specialty_pharmacy':   'Specialty Pharmacy',
      'dash.clinic_dr':            'Clinic · Dr. Chen',
      'dash.protocol_confirmed':   'Protocol Confirmed · 7:15 PM',
      'dash.verified_by':          'Verified by',

      // Confirm dose sheet
      'sheet.confirm_dose':        'Confirm Dose',
      'sheet.injection_site':      'Injection Site',
      'sheet.right_abdomen':       'Right Abdomen',
      'sheet.left_abdomen':        'Left Abdomen',
      'sheet.confirm_complete':    'Confirm Dose Complete',
      'sheet.sync_note':           'Logs time, site, and syncs with your clinic.',

      // SOS
      'sos.label':    '9 PM SOS Bridge',
      'sos.title':    "You're not alone.",
      'sos.cta':      'Connect with Clinical Triage',
      'sos.hours':    'Available 7 AM – 11 PM, 7 days',
      'sos.fab':      'SOS Bridge',

      // Clinic Capture
      'capture.safe_room_ready':   'Safe Room Ready',
      'capture.label':             'In-Clinic Capture',
      'capture.headline':          'Capture what your doctor just said.',
      'capture.subhead':           'Eliminate instruction amnesia. Everything goes straight to your Safe Room.',
      'capture.scan_handout':      'Scan Handout',
      'capture.scan_desc':         'Point at any printed schedule or handout. We extract medications, dosages, and times instantly.',
      'capture.voice_title':       'Record Doctor Recap',
      'capture.voice_desc':        'Tap record as your doctor speaks. Clinical AI extracts your next best step and any schedule updates.',
      'capture.recent':            'Recent Captures',
      'capture.no_captures':       'No captures yet. Use scan or voice above.',
      'capture.rescan':            'Re-scan',
      'capture.precision_review':  'Precision Review',
      'capture.review_title':      'Review Extracted Data',
      'capture.review_desc':       'Verify each instruction before saving to your Safe Room. Tap any card to edit.',
      'capture.add_manual':        'Add instruction manually',
      'capture.slide_to_save':     'Slide to save to Safe Room',
      'capture.encrypt_note':      'AES-256 encrypted · Loop Closer will ping your pharmacy',
      'capture.record_title':      "Record your doctor's instructions",
      'capture.record_sub':        'Tap the mic and speak freely. Clinical AI will extract your next steps.',
      'capture.record_recap':      'Record Recap',
      'capture.ai_summary':        'AI Summary',
      'capture.ai_processing':     'Clinical AI is processing',
      'capture.ai_extracting':     'Extracting your next best step',
      'capture.ai_note':           'Powered by Claude · Secure · Not stored',
      'capture.next_best_step':    'Next Best Step',
      'capture.extracted_actions': 'Extracted Actions',
      'capture.full_transcript':   'Full Transcript',
      'capture.add_to_protocol':   'Add to My Protocol',
      'capture.dismiss':           'Dismiss without saving',
      'capture.saved':             'Saved to Safe Room',
      'capture.verified_seal':     'Verified Seal Active',
      'capture.view_now_card':     'View Now Card →',
      'capture.what_is_for':       'What is this for?',
      'capture.loop_sync':         'Loop Closer — Pharmacy Sync',
      'capture.terms_in_recap':    'Terms in This Recap',
      'capture.instructions_extracted': 'instructions extracted',
      'capture.pinging':           'Pinging…',

      // Lexicon
      'lex.title':                 'Precision Lexicon',
      'lex.search_placeholder':    'Search medications, procedures, terms…',
      'lex.medications':           'Medications',
      'lex.procedures':            'Procedures',
      'lex.clinical_terms':        'Clinical Terms',
      'lex.definition':            'Definition',
      'lex.side_effects':          'Side Effects',
      'lex.storage':               'Storage',
      'lex.no_results':            'No results for',
      'lex.no_results_sub':        'Try searching by medication name, procedure, or clinical term.',

      // Partner Command
      'partner.live_sync':         'Live Sync Active',
      'partner.patient_view':      'Patient View',
      'partner.nav.med_sync':      'Med-Sync Grid',
      'partner.nav.package':       'Package State',
      'partner.nav.rescue':        'Precision Rescue',
      'partner.nav.qsbs':          'QSBS Monitor',
      'partner.active_patients':   'Active Patients',
      'partner.critical_alerts':   'Critical Alerts',
      'partner.verified_today':    'Verified Today',
      'partner.navigation':        'Navigation',
      'partner.shift_summary':     'Shift Summary',
      'partner.filter.all':        'All',
      'partner.filter.critical':   'Critical',
      'partner.filter.pending':    'Pending',
      'partner.filter.verified':   'Verified',
      'partner.authorize':         'Authorize',
      'partner.rescue_btn':        'Rescue',
      'partner.auth.label':        'Authorize Verification',
      'partner.auth.meds_to_verify':'Medications to Verify',
      'partner.auth.confirm':      'Confirm & Push Verification',
      'partner.auth.pushed':       'Status pushed to patient\'s Now Card via Supabase realtime.',
      'partner.auth.sig_note':     'Digital signature applied on confirm',
      'partner.rescue.title':      'Precision Rescue',
      'partner.rescue.sub':        "Send a one-touch clinical override directly to a patient's Now Card",
      'partner.rescue.select':     'Select Patient',
      'partner.rescue.override':   'Override Message',
      'partner.rescue.templates':  'Quick Templates',
      'partner.rescue.custom':     'Custom Message',
      'partner.rescue.no_patient': 'No patient selected — choose from the left panel.',
      'partner.rescue.send':       'Send Precision Rescue',
      'partner.rescue.note':       "Override will appear instantly on the patient's Now Card.",
      'partner.qsbs.safe':         'Safe',
      'partner.qsbs.warning':      'Warning',
      'partner.qsbs.critical':     'Critical',
      'partner.qsbs.view_report':  'View Full Report',
      'partner.grid.title':        'Patient Med-Sync Grid',
      'partner.grid.sub':          'Real-time medication verification status · Shift B',
      'partner.package.title':     'Package State — BIFI Layer',
      'partner.package.sub':       'Financial authorization status · Clinical execution is gated on approval',
      'partner.last_sync':         'Last synced:',
      'partner.auto_refresh':      '· Auto-refreshes every 60s',
      'partner.th.patient':        'Patient',
      'partner.th.phase':          'Phase · Day',
      'partner.th.injection':      'Next Injection',
      'partner.th.medications':    'Medications',
      'partner.th.pharmacy':       'Pharmacy',
      'partner.th.status':         'Status',
      'partner.th.actions':        'Actions',
    },

    /* ═══════════════════════════════════════════════════════════════
       MANDARIN SIMPLIFIED
    ═══════════════════════════════════════════════════════════════ */
    zh: {
      'common.back':    '返回',
      'common.cancel':  '取消',
      'common.close':   '关闭',
      'common.save':    '保存',
      'common.confirm': '确认',
      'common.reset':   '重置',
      'common.clear':   '清除',
      'common.discard': '丢弃',

      'nav.today':      '今天',
      'nav.schedule':   '日程',
      'nav.safe_room':  '安全室',
      'nav.lexicon':    '词典',
      'nav.dashboard':  '主界面',
      'nav.capture':    '扫描',
      'nav.synced':     '已同步',
      'nav.pending':    '待处理',

      'phase.stim':     '促排卵',
      'phase.wait':     '第5天等待',
      'phase.retrieval':'取卵日',

      'dash.protocol_imported':    '已通过扫描导入方案',
      'dash.captured_from':        '从临床手册中获取',
      'dash.night_mode_title':     '夜间模式 · 注射时间窗',
      'dash.night_mode_msg':       '晚9点SOS紧急支持已激活 — 帮助一触即达。',
      'dash.med_inventory':        '药品库存已确认',
      'dash.med_inventory_sub':    '3天供应已确认 · 18小时后下次审计',
      'dash.upcoming':             '今日即将到来',
      'dash.protocol_complete':    '今晚的方案已完成。',
      'dash.protocol_complete_sub':'所有剂量已确认并与诊所同步。',
      'dash.logistics_verified':   '物流已确认',
      'dash.verification_pending': '待验证',
      'dash.next_action':          '下一步 · 现在',
      'dash.what_is':              '什么是',
      'dash.mark_complete':        '标记剂量完成',
      'dash.loop_closed':          '循环已关闭 ✓',
      'dash.syncing':              '同步中…',
      'dash.all_clear':            '一切正常',
      'dash.pending_sync':         '待同步',
      'dash.bridge_rx_active':     '等待同步 · Bridge Rx激活',
      'dash.delivered_verified':   '已送达并确认 · 下午6:30',
      'dash.no_more_actions':      '今天没有更多操作。',
      'dash.specialty_pharmacy':   '特种药房',
      'dash.clinic_dr':            '诊所 · 陈医生',
      'dash.protocol_confirmed':   '方案已确认 · 晚7:15',
      'dash.verified_by':          '由…验证',

      'sheet.confirm_dose':        '确认剂量',
      'sheet.injection_site':      '注射部位',
      'sheet.right_abdomen':       '右腹部',
      'sheet.left_abdomen':        '左腹部',
      'sheet.confirm_complete':    '确认剂量完成',
      'sheet.sync_note':           '记录时间、部位，并与诊所同步。',

      'sos.label':  '晚9点SOS紧急通道',
      'sos.title':  '您并不孤单。',
      'sos.cta':    '联系临床分诊',
      'sos.hours':  '每天早7时至晚11时提供服务',
      'sos.fab':    'SOS紧急',

      'capture.safe_room_ready':   '安全室已就绪',
      'capture.label':             '诊所信息采集',
      'capture.headline':          '记录医生刚说的话。',
      'capture.subhead':           '消除指令遗忘症。所有内容直接存入安全室。',
      'capture.scan_handout':      '扫描手册',
      'capture.scan_desc':         '对准任何打印的日程或手册。我们立即提取药物、剂量和时间。',
      'capture.voice_title':       '录制医生回顾',
      'capture.voice_desc':        '当医生说话时点击录制。临床AI提取您的下一最佳步骤和任何日程更新。',
      'capture.recent':            '最近采集',
      'capture.no_captures':       '暂无采集记录。请使用上方扫描或语音功能。',
      'capture.rescan':            '重新扫描',
      'capture.precision_review':  '精准审查',
      'capture.review_title':      '审查提取的数据',
      'capture.review_desc':       '保存到安全室前核验每条指令。点击任何卡片进行编辑。',
      'capture.add_manual':        '手动添加指令',
      'capture.slide_to_save':     '滑动保存到安全室',
      'capture.encrypt_note':      'AES-256加密 · Loop Closer将联系您的药房',
      'capture.record_title':      '录制医生的指示',
      'capture.record_sub':        '点击麦克风自由发言。临床AI将提取您的下一步骤。',
      'capture.record_recap':      '录制回顾',
      'capture.ai_summary':        'AI摘要',
      'capture.ai_processing':     '临床AI正在处理',
      'capture.ai_extracting':     '正在提取您的下一最佳步骤',
      'capture.ai_note':           '由Claude驱动 · 安全 · 不存储',
      'capture.next_best_step':    '下一最佳步骤',
      'capture.extracted_actions': '提取的行动',
      'capture.full_transcript':   '完整记录',
      'capture.add_to_protocol':   '添加到我的方案',
      'capture.dismiss':           '不保存关闭',
      'capture.saved':             '已保存到安全室',
      'capture.verified_seal':     '已验证印章激活',
      'capture.view_now_card':     '查看今日方案 →',
      'capture.what_is_for':       '这是用来做什么的？',
      'capture.loop_sync':         'Loop Closer — 药房同步',
      'capture.terms_in_recap':    '此回顾中的术语',
      'capture.instructions_extracted': '条指令已提取',
      'capture.pinging':           '联系中…',

      'lex.title':              '精准词典',
      'lex.search_placeholder': '搜索药物、程序、术语…',
      'lex.medications':        '药物',
      'lex.procedures':         '程序',
      'lex.clinical_terms':     '临床术语',
      'lex.definition':         '定义',
      'lex.side_effects':       '副作用',
      'lex.storage':            '储存',
      'lex.no_results':         '无结果：',
      'lex.no_results_sub':     '请尝试搜索药物名称、程序或临床术语。',

      'partner.live_sync':          '实时同步激活',
      'partner.patient_view':       '患者视图',
      'partner.nav.med_sync':       '药物同步表格',
      'partner.nav.package':        '套餐状态',
      'partner.nav.rescue':         '精准救援',
      'partner.nav.qsbs':           'QSBS监控',
      'partner.active_patients':    '活跃患者',
      'partner.critical_alerts':    '紧急警报',
      'partner.verified_today':     '今日已验证',
      'partner.navigation':         '导航',
      'partner.shift_summary':      '班次摘要',
      'partner.filter.all':         '全部',
      'partner.filter.critical':    '紧急',
      'partner.filter.pending':     '待确认',
      'partner.filter.verified':    '已确认',
      'partner.authorize':          '授权',
      'partner.rescue_btn':         '救援',
      'partner.auth.label':         '授权验证',
      'partner.auth.meds_to_verify':'待验证药物',
      'partner.auth.confirm':       '确认并推送验证',
      'partner.auth.pushed':        '状态已通过Supabase实时推送至患者今日方案。',
      'partner.auth.sig_note':      '确认后应用数字签名',
      'partner.rescue.title':       '精准救援',
      'partner.rescue.sub':         '向患者今日方案发送一键临床覆盖指令',
      'partner.rescue.select':      '选择患者',
      'partner.rescue.override':    '覆盖消息',
      'partner.rescue.templates':   '快速模板',
      'partner.rescue.custom':      '自定义消息',
      'partner.rescue.no_patient':  '未选择患者 — 请从左侧面板选择。',
      'partner.rescue.send':        '发送精准救援',
      'partner.rescue.note':        '覆盖指令将立即显示在患者的今日方案中。',
      'partner.qsbs.safe':          '安全',
      'partner.qsbs.warning':       '警告',
      'partner.qsbs.critical':      '危急',
      'partner.qsbs.view_report':   '查看完整报告',
      'partner.grid.title':         '患者药物同步表格',
      'partner.grid.sub':           '实时药物验证状态 · B班',
      'partner.package.title':      '套餐状态 — BIFI层',
      'partner.package.sub':        '财务授权状态 · 临床执行以批准为前提',
      'partner.last_sync':          '上次同步：',
      'partner.auto_refresh':       '· 每60秒自动刷新',
      'partner.th.patient':         '患者',
      'partner.th.phase':           '阶段 · 天数',
      'partner.th.injection':       '下次注射',
      'partner.th.medications':     '药物',
      'partner.th.pharmacy':        '药房',
      'partner.th.status':          '状态',
      'partner.th.actions':         '操作',
    },

    /* ═══════════════════════════════════════════════════════════════
       SPANISH
    ═══════════════════════════════════════════════════════════════ */
    es: {
      'common.back':    'Atrás',
      'common.cancel':  'Cancelar',
      'common.close':   'Cerrar',
      'common.save':    'Guardar',
      'common.confirm': 'Confirmar',
      'common.reset':   'Restablecer',
      'common.clear':   'Limpiar',
      'common.discard': 'Descartar',

      'nav.today':      'Hoy',
      'nav.schedule':   'Horario',
      'nav.safe_room':  'Sala Segura',
      'nav.lexicon':    'Léxico',
      'nav.dashboard':  'Panel',
      'nav.capture':    'Captura',
      'nav.synced':     'Sincronizado',
      'nav.pending':    'Pendiente',

      'phase.stim':     'Estimulación',
      'phase.wait':     'Espera Día 5',
      'phase.retrieval':'Extracción',

      'dash.protocol_imported':    'Protocolo Importado por Escaneo',
      'dash.captured_from':        'Obtenido del folleto clínico',
      'dash.night_mode_title':     'Modo Nocturno · Ventana de Inyección',
      'dash.night_mode_msg':       'El Puente SOS de las 9 PM está activo — la ayuda está a un toque.',
      'dash.med_inventory':        'Inventario de Medicamentos Verificado',
      'dash.med_inventory_sub':    'Suministro de 3 días confirmado · Próxima auditoría en 18h',
      'dash.upcoming':             'Próximamente Hoy',
      'dash.protocol_complete':    'El protocolo de esta noche está completo.',
      'dash.protocol_complete_sub':'Todas las dosis confirmadas y sincronizadas con la clínica.',
      'dash.logistics_verified':   'Logística Verificada',
      'dash.verification_pending': 'Verificación Pendiente',
      'dash.next_action':          'Próxima Acción · Ahora',
      'dash.what_is':              '¿Qué es',
      'dash.mark_complete':        'Marcar Dosis Completa',
      'dash.loop_closed':          'Ciclo Cerrado ✓',
      'dash.syncing':              'Sincronizando…',
      'dash.all_clear':            'Todo en Orden',
      'dash.pending_sync':         'Sincronización Pendiente',
      'dash.bridge_rx_active':     'Esperando sincronización · Bridge Rx activo',
      'dash.delivered_verified':   'Entregado y verificado · 6:30 PM',
      'dash.no_more_actions':      'No hay más acciones hoy.',
      'dash.specialty_pharmacy':   'Farmacia Especializada',
      'dash.clinic_dr':            'Clínica · Dra. Chen',
      'dash.protocol_confirmed':   'Protocolo confirmado · 7:15 PM',
      'dash.verified_by':          'Verificado por',

      'sheet.confirm_dose':        'Confirmar Dosis',
      'sheet.injection_site':      'Sitio de Inyección',
      'sheet.right_abdomen':       'Abdomen Derecho',
      'sheet.left_abdomen':        'Abdomen Izquierdo',
      'sheet.confirm_complete':    'Confirmar Dosis Completa',
      'sheet.sync_note':           'Registra hora, sitio y sincroniza con tu clínica.',

      'sos.label':  'Puente SOS 9 PM',
      'sos.title':  'No estás sola.',
      'sos.cta':    'Conectar con Triaje Clínico',
      'sos.hours':  'Disponible 7 AM – 11 PM, 7 días',
      'sos.fab':    'SOS Puente',

      'capture.safe_room_ready':   'Sala Segura Lista',
      'capture.label':             'Captura en Clínica',
      'capture.headline':          'Capta lo que tu médico acaba de decir.',
      'capture.subhead':           'Elimina la amnesia de instrucciones. Todo va directo a tu Sala Segura.',
      'capture.scan_handout':      'Escanear Folleto',
      'capture.scan_desc':         'Apunta a cualquier horario o folleto impreso. Extraemos medicamentos, dosis y horarios al instante.',
      'capture.voice_title':       'Grabar Resumen del Médico',
      'capture.voice_desc':        'Toca grabar mientras habla tu médico. La IA clínica extrae tu próximo mejor paso y cualquier actualización de horario.',
      'capture.recent':            'Capturas Recientes',
      'capture.no_captures':       'Sin capturas aún. Usa el escaneo o la voz arriba.',
      'capture.rescan':            'Reescanear',
      'capture.precision_review':  'Revisión de Precisión',
      'capture.review_title':      'Revisar Datos Extraídos',
      'capture.review_desc':       'Verifica cada instrucción antes de guardar en tu Sala Segura. Toca cualquier tarjeta para editar.',
      'capture.add_manual':        'Añadir instrucción manualmente',
      'capture.slide_to_save':     'Desliza para guardar en Sala Segura',
      'capture.encrypt_note':      'Cifrado AES-256 · Loop Closer notificará a tu farmacia',
      'capture.record_title':      'Graba las instrucciones de tu médico',
      'capture.record_sub':        'Toca el micrófono y habla libremente. La IA clínica extraerá tus próximos pasos.',
      'capture.record_recap':      'Grabar Resumen',
      'capture.ai_summary':        'Resumen de IA',
      'capture.ai_processing':     'La IA Clínica está procesando',
      'capture.ai_extracting':     'Extrayendo tu próximo mejor paso',
      'capture.ai_note':           'Con Claude · Seguro · No almacenado',
      'capture.next_best_step':    'Próximo Mejor Paso',
      'capture.extracted_actions': 'Acciones Extraídas',
      'capture.full_transcript':   'Transcripción Completa',
      'capture.add_to_protocol':   'Agregar a Mi Protocolo',
      'capture.dismiss':           'Descartar sin guardar',
      'capture.saved':             'Guardado en Sala Segura',
      'capture.verified_seal':     'Sello Verificado Activo',
      'capture.view_now_card':     'Ver Protocolo →',
      'capture.what_is_for':       '¿Para qué es esto?',
      'capture.loop_sync':         'Loop Closer — Sincronización de Farmacia',
      'capture.terms_in_recap':    'Términos en Este Resumen',
      'capture.instructions_extracted': 'instrucciones extraídas',
      'capture.pinging':           'Contactando…',

      'lex.title':              'Léxico de Precisión',
      'lex.search_placeholder': 'Buscar medicamentos, procedimientos, términos…',
      'lex.medications':        'Medicamentos',
      'lex.procedures':         'Procedimientos',
      'lex.clinical_terms':     'Términos Clínicos',
      'lex.definition':         'Definición',
      'lex.side_effects':       'Efectos Secundarios',
      'lex.storage':            'Almacenamiento',
      'lex.no_results':         'Sin resultados para',
      'lex.no_results_sub':     'Intenta buscar por nombre de medicamento, procedimiento o término clínico.',

      'partner.live_sync':          'Sincronización en Vivo Activa',
      'partner.patient_view':       'Vista del Paciente',
      'partner.nav.med_sync':       'Tabla Med-Sync',
      'partner.nav.package':        'Estado del Paquete',
      'partner.nav.rescue':         'Rescate de Precisión',
      'partner.nav.qsbs':           'Monitor QSBS',
      'partner.active_patients':    'Pacientes Activos',
      'partner.critical_alerts':    'Alertas Críticas',
      'partner.verified_today':     'Verificados Hoy',
      'partner.navigation':         'Navegación',
      'partner.shift_summary':      'Resumen de Turno',
      'partner.filter.all':         'Todos',
      'partner.filter.critical':    'Crítico',
      'partner.filter.pending':     'Pendiente',
      'partner.filter.verified':    'Verificado',
      'partner.authorize':          'Autorizar',
      'partner.rescue_btn':         'Rescate',
      'partner.auth.label':         'Autorizar Verificación',
      'partner.auth.meds_to_verify':'Medicamentos a Verificar',
      'partner.auth.confirm':       'Confirmar y Enviar Verificación',
      'partner.auth.pushed':        'Estado enviado al Protocolo del paciente vía Supabase realtime.',
      'partner.auth.sig_note':      'Firma digital aplicada al confirmar',
      'partner.rescue.title':       'Rescate de Precisión',
      'partner.rescue.sub':         'Envía una anulación clínica de un toque directamente al Protocolo del paciente',
      'partner.rescue.select':      'Seleccionar Paciente',
      'partner.rescue.override':    'Mensaje de Anulación',
      'partner.rescue.templates':   'Plantillas Rápidas',
      'partner.rescue.custom':      'Mensaje Personalizado',
      'partner.rescue.no_patient':  'Ningún paciente seleccionado — elige del panel izquierdo.',
      'partner.rescue.send':        'Enviar Rescate de Precisión',
      'partner.rescue.note':        'La anulación aparecerá instantáneamente en el Protocolo del paciente.',
      'partner.qsbs.safe':          'Seguro',
      'partner.qsbs.warning':       'Advertencia',
      'partner.qsbs.critical':      'Crítico',
      'partner.qsbs.view_report':   'Ver Informe Completo',
      'partner.grid.title':         'Tabla Med-Sync de Pacientes',
      'partner.grid.sub':           'Estado de verificación de medicamentos en tiempo real · Turno B',
      'partner.package.title':      'Estado del Paquete — Capa BIFI',
      'partner.package.sub':        'Estado de autorización financiera · La ejecución clínica está condicionada a la aprobación',
      'partner.last_sync':          'Última sincronización:',
      'partner.auto_refresh':       '· Se actualiza automáticamente cada 60s',
      'partner.th.patient':         'Paciente',
      'partner.th.phase':           'Fase · Día',
      'partner.th.injection':       'Próxima Inyección',
      'partner.th.medications':     'Medicamentos',
      'partner.th.pharmacy':        'Farmacia',
      'partner.th.status':          'Estado',
      'partner.th.actions':         'Acciones',
    },

    /* ═══════════════════════════════════════════════════════════════
       HINDI
    ═══════════════════════════════════════════════════════════════ */
    hi: {
      'common.back':    'वापस',
      'common.cancel':  'रद्द करें',
      'common.close':   'बंद करें',
      'common.save':    'सहेजें',
      'common.confirm': 'पुष्टि करें',
      'common.reset':   'रीसेट करें',
      'common.clear':   'साफ़ करें',
      'common.discard': 'त्यागें',

      'nav.today':      'आज',
      'nav.schedule':   'कार्यक्रम',
      'nav.safe_room':  'सेफ रूम',
      'nav.lexicon':    'शब्दकोश',
      'nav.dashboard':  'डैशबोर्ड',
      'nav.capture':    'स्कैन',
      'nav.synced':     'सिंक्ड',
      'nav.pending':    'लंबित',

      'phase.stim':     'स्टिमुलेशन',
      'phase.wait':     'दिन 5 प्रतीक्षा',
      'phase.retrieval':'रिट्रीवल',

      'dash.protocol_imported':    'स्कैन से प्रोटोकॉल आयात हुआ',
      'dash.captured_from':        'क्लिनिकल हैंडआउट से कैप्चर किया',
      'dash.night_mode_title':     'नाइट मोड · इंजेक्शन विंडो',
      'dash.night_mode_msg':       'रात 9 बजे SOS ब्रिज सक्रिय है — मदद एक टैप दूर है।',
      'dash.med_inventory':        'दवा इन्वेंटरी सत्यापित',
      'dash.med_inventory_sub':    '3 दिन की आपूर्ति पुष्टि · अगला ऑडिट 18 घंटे में',
      'dash.upcoming':             'आज के आगामी',
      'dash.protocol_complete':    'आज रात का प्रोटोकॉल पूरा हो गया।',
      'dash.protocol_complete_sub':'सभी डोज पुष्टि की गई और क्लिनिक के साथ सिंक हुईं।',
      'dash.logistics_verified':   'लॉजिस्टिक्स सत्यापित',
      'dash.verification_pending': 'सत्यापन लंबित',
      'dash.next_action':          'अगला कदम · अभी',
      'dash.what_is':              'क्या है',
      'dash.mark_complete':        'डोज पूर्ण करें',
      'dash.loop_closed':          'लूप बंद ✓',
      'dash.syncing':              'सिंक हो रहा है…',
      'dash.all_clear':            'सब ठीक',
      'dash.pending_sync':         'सिंक लंबित',
      'dash.bridge_rx_active':     'सिंक का इंतजार · Bridge Rx सक्रिय',
      'dash.delivered_verified':   'डिलीवर और सत्यापित · शाम 6:30',
      'dash.no_more_actions':      'आज कोई और कदम नहीं।',
      'dash.specialty_pharmacy':   'स्पेशलिटी फार्मेसी',
      'dash.clinic_dr':            'क्लिनिक · डॉ. चेन',
      'dash.protocol_confirmed':   'प्रोटोकॉल पुष्टि · शाम 7:15',
      'dash.verified_by':          'द्वारा सत्यापित',

      'sheet.confirm_dose':        'डोज पुष्टि करें',
      'sheet.injection_site':      'इंजेक्शन स्थान',
      'sheet.right_abdomen':       'दाया पेट',
      'sheet.left_abdomen':        'बाया पेट',
      'sheet.confirm_complete':    'डोज पूर्ण पुष्टि करें',
      'sheet.sync_note':           'समय, स्थान लॉग करता है और क्लिनिक से सिंक करता है।',

      'sos.label':  'रात 9 बजे SOS ब्रिज',
      'sos.title':  'आप अकेले नहीं हैं।',
      'sos.cta':    'क्लिनिकल ट्राइज से जुड़ें',
      'sos.hours':  'उपलब्ध सुबह 7 बजे – रात 11 बजे, 7 दिन',
      'sos.fab':    'SOS ब्रिज',

      'capture.safe_room_ready':   'सेफ रूम तैयार',
      'capture.label':             'इन-क्लिनिक कैप्चर',
      'capture.headline':          'डॉक्टर ने जो कहा उसे कैप्चर करें।',
      'capture.subhead':           'निर्देश भूलने की समस्या खत्म करें। सब कुछ सीधे आपके सेफ रूम में जाएगा।',
      'capture.scan_handout':      'हैंडआउट स्कैन करें',
      'capture.scan_desc':         'किसी भी प्रिंटेड शेड्यूल या हैंडआउट पर इंगित करें। हम दवाएं, खुराक और समय तुरंत निकालते हैं।',
      'capture.voice_title':       'डॉक्टर रिकैप रिकॉर्ड करें',
      'capture.voice_desc':        'जब डॉक्टर बोलें तो रिकॉर्ड टैप करें। क्लिनिकल AI आपका अगला सर्वश्रेष्ठ कदम निकालती है।',
      'capture.recent':            'हाल की कैप्चर',
      'capture.no_captures':       'अभी तक कोई कैप्चर नहीं। ऊपर स्कैन या आवाज़ उपयोग करें।',
      'capture.rescan':            'पुनः स्कैन करें',
      'capture.precision_review':  'प्रिसिजन रिव्यू',
      'capture.review_title':      'निकाले गए डेटा की समीक्षा',
      'capture.review_desc':       'सेफ रूम में सेव करने से पहले हर निर्देश सत्यापित करें। किसी भी कार्ड को संपादित करने के लिए टैप करें।',
      'capture.add_manual':        'मैन्युअल रूप से निर्देश जोड़ें',
      'capture.slide_to_save':     'सेफ रूम में सेव करने के लिए स्लाइड करें',
      'capture.encrypt_note':      'AES-256 एन्क्रिप्टेड · Loop Closer आपकी फार्मेसी को सूचित करेगा',
      'capture.record_title':      'अपने डॉक्टर के निर्देश रिकॉर्ड करें',
      'capture.record_sub':        'माइक टैप करें और स्वतंत्र रूप से बोलें। क्लिनिकल AI आपके अगले कदम निकालेगी।',
      'capture.record_recap':      'रिकैप रिकॉर्ड करें',
      'capture.ai_summary':        'AI सारांश',
      'capture.ai_processing':     'क्लिनिकल AI प्रोसेस कर रही है',
      'capture.ai_extracting':     'आपका अगला सर्वश्रेष्ठ कदम निकाला जा रहा है',
      'capture.ai_note':           'Claude द्वारा संचालित · सुरक्षित · संग्रहीत नहीं',
      'capture.next_best_step':    'अगला सर्वश्रेष्ठ कदम',
      'capture.extracted_actions': 'निकाली गई क्रियाएं',
      'capture.full_transcript':   'पूरी ट्रांसक्रिप्ट',
      'capture.add_to_protocol':   'मेरे प्रोटोकॉल में जोड़ें',
      'capture.dismiss':           'बिना सहेजे बंद करें',
      'capture.saved':             'सेफ रूम में सहेजा',
      'capture.verified_seal':     'सत्यापित मुहर सक्रिय',
      'capture.view_now_card':     'प्रोटोकॉल देखें →',
      'capture.what_is_for':       'यह किसके लिए है?',
      'capture.loop_sync':         'Loop Closer — फार्मेसी सिंक',
      'capture.terms_in_recap':    'इस सारांश के शब्द',
      'capture.instructions_extracted': 'निर्देश निकाले गए',
      'capture.pinging':           'संपर्क में…',

      'lex.title':              'सटीक शब्दकोश',
      'lex.search_placeholder': 'दवाएं, प्रक्रियाएं, शर्तें खोजें…',
      'lex.medications':        'दवाएं',
      'lex.procedures':         'प्रक्रियाएं',
      'lex.clinical_terms':     'नैदानिक शर्तें',
      'lex.definition':         'परिभाषा',
      'lex.side_effects':       'दुष्प्रभाव',
      'lex.storage':            'भंडारण',
      'lex.no_results':         'कोई परिणाम नहीं:',
      'lex.no_results_sub':     'दवा का नाम, प्रक्रिया या नैदानिक शब्द खोजने का प्रयास करें।',

      'partner.live_sync':          'लाइव सिंक सक्रिय',
      'partner.patient_view':       'मरीज़ दृश्य',
      'partner.nav.med_sync':       'मेड-सिंक ग्रिड',
      'partner.nav.package':        'पैकेज स्थिति',
      'partner.nav.rescue':         'प्रिसिजन रेस्क्यू',
      'partner.nav.qsbs':           'QSBS मॉनिटर',
      'partner.active_patients':    'सक्रिय मरीज़',
      'partner.critical_alerts':    'महत्वपूर्ण अलर्ट',
      'partner.verified_today':     'आज सत्यापित',
      'partner.navigation':         'नेविगेशन',
      'partner.shift_summary':      'शिफ्ट सारांश',
      'partner.filter.all':         'सभी',
      'partner.filter.critical':    'महत्वपूर्ण',
      'partner.filter.pending':     'लंबित',
      'partner.filter.verified':    'सत्यापित',
      'partner.authorize':          'प्राधिकृत करें',
      'partner.rescue_btn':         'बचाव',
      'partner.auth.label':         'सत्यापन प्राधिकृत करें',
      'partner.auth.meds_to_verify':'सत्यापित करने वाली दवाएं',
      'partner.auth.confirm':       'पुष्टि करें और सत्यापन भेजें',
      'partner.auth.pushed':        'Supabase रियलटाइम के माध्यम से स्थिति मरीज़ के प्रोटोकॉल में भेजी गई।',
      'partner.auth.sig_note':      'पुष्टि पर डिजिटल हस्ताक्षर लागू',
      'partner.rescue.title':       'प्रिसिजन रेस्क्यू',
      'partner.rescue.sub':         'मरीज़ के प्रोटोकॉल पर सीधे एक-टैप क्लिनिकल ओवरराइड भेजें',
      'partner.rescue.select':      'मरीज़ चुनें',
      'partner.rescue.override':    'ओवरराइड संदेश',
      'partner.rescue.templates':   'त्वरित टेम्पलेट',
      'partner.rescue.custom':      'कस्टम संदेश',
      'partner.rescue.no_patient':  'कोई मरीज़ नहीं चुना — बाएं पैनल से चुनें।',
      'partner.rescue.send':        'प्रिसिजन रेस्क्यू भेजें',
      'partner.rescue.note':        'ओवरराइड तुरंत मरीज़ के प्रोटोकॉल पर दिखेगा।',
      'partner.qsbs.safe':          'सुरक्षित',
      'partner.qsbs.warning':       'चेतावनी',
      'partner.qsbs.critical':      'महत्वपूर्ण',
      'partner.qsbs.view_report':   'पूरी रिपोर्ट देखें',
      'partner.grid.title':         'मरीज़ मेड-सिंक ग्रिड',
      'partner.grid.sub':           'रियलटाइम दवा सत्यापन स्थिति · शिफ्ट B',
      'partner.package.title':      'पैकेज स्थिति — BIFI परत',
      'partner.package.sub':        'वित्तीय प्राधिकरण स्थिति · क्लिनिकल निष्पादन अनुमोदन पर आधारित',
      'partner.last_sync':          'अंतिम सिंक:',
      'partner.auto_refresh':       '· हर 60 सेकंड में स्वतः रिफ्रेश',
      'partner.th.patient':         'मरीज़',
      'partner.th.phase':           'चरण · दिन',
      'partner.th.injection':       'अगला इंजेक्शन',
      'partner.th.medications':     'दवाएं',
      'partner.th.pharmacy':        'फार्मेसी',
      'partner.th.status':          'स्थिति',
      'partner.th.actions':         'क्रियाएं',
    }
  };

  // ── Core API ──────────────────────────────────────────────────────
  window.I18N = {
    lang: localStorage.getItem('carestate_lang') || 'en',
    _callbacks: [],

    t: function (key) {
      return (STRINGS[this.lang] && STRINGS[this.lang][key] !== undefined)
        ? STRINGS[this.lang][key]
        : (STRINGS.en[key] !== undefined ? STRINGS.en[key] : key);
    },

    apply: function () {
      var self = this;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        el.textContent = self.t(el.getAttribute('data-i18n'));
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        el.placeholder = self.t(el.getAttribute('data-i18n-placeholder'));
      });
      // HTML lang
      var langMap = { zh:'zh-Hans', es:'es', hi:'hi', en:'en' };
      document.documentElement.lang = langMap[this.lang] || 'en';
      // Update FAB label
      var fab = document.getElementById('_i18n-fab');
      if (fab) {
        var cur = LANGS[this.lang];
        fab.querySelector('._i18n-flag').textContent = cur.flag;
        fab.querySelector('._i18n-code').textContent = cur.short;
      }
    },

    setLang: function (code) {
      if (!LANGS[code]) return;
      this.lang = code;
      localStorage.setItem('carestate_lang', code);
      this.apply();
      // Refresh picker active state
      document.querySelectorAll('._i18n-opt').forEach(function (opt) {
        opt.classList.toggle('active', opt.dataset.code === code);
      });
      // Close picker
      var picker = document.getElementById('_i18n-picker');
      if (picker) picker.classList.remove('open');
      // Notify page render functions
      this._callbacks.forEach(function (fn) { try { fn(code); } catch (e) {} });
    },

    onSwitch: function (fn) {
      this._callbacks.push(fn);
    }
  };

  window.t = function (key) { return window.I18N.t(key); };

  // ── Self-inject styles + switcher UI ─────────────────────────────
  function _inject() {
    if (document.getElementById('_i18n-fab')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#_i18n-fab{position:fixed;bottom:82px;left:14px;z-index:990;',
        'background:#fff;border:1.5px solid #E5E7EB;border-radius:20px;',
        'padding:5px 10px;font-size:12px;font-weight:700;',
        'font-family:Inter,sans-serif;cursor:pointer;',
        'box-shadow:0 2px 10px rgba(0,0,0,.1);',
        'transition:box-shadow .15s,border-color .15s;',
        'display:flex;align-items:center;gap:5px;color:#1A1A1B;',
        'user-select:none;-webkit-tap-highlight-color:transparent;}',
      '#_i18n-fab:hover{border-color:#00BAFF;box-shadow:0 4px 14px rgba(0,186,255,.2);}',
      '#_i18n-fab ._i18n-flag{font-size:16px;line-height:1;}',
      '#_i18n-fab ._i18n-code{letter-spacing:.04em;}',
      '#_i18n-picker{position:fixed;bottom:130px;left:14px;z-index:991;',
        'background:#fff;border:1.5px solid #E5E7EB;border-radius:14px;',
        'padding:6px;box-shadow:0 8px 32px rgba(0,0,0,.13);',
        'flex-direction:column;gap:2px;min-width:158px;display:none;}',
      '#_i18n-picker.open{display:flex;}',
      '._i18n-opt{display:flex;align-items:center;gap:8px;',
        'padding:8px 10px;border-radius:9px;cursor:pointer;',
        'font-size:13px;font-weight:600;font-family:Inter,sans-serif;',
        'color:#1A1A1B;transition:background .12s;}',
      '._i18n-opt:hover{background:#F0F9FF;}',
      '._i18n-opt.active{background:#00BAFF;color:#fff;}',
      '._i18n-opt-flag{font-size:18px;line-height:1;}'
    ].join('');
    document.head.appendChild(style);

    // Picker panel
    var picker = document.createElement('div');
    picker.id = '_i18n-picker';
    Object.keys(LANGS).forEach(function (code) {
      var meta = LANGS[code];
      var opt = document.createElement('div');
      opt.className = '_i18n-opt' + (code === window.I18N.lang ? ' active' : '');
      opt.dataset.code = code;
      opt.innerHTML = '<span class="_i18n-opt-flag">' + meta.flag + '</span><span>' + meta.name + '</span>';
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        window.I18N.setLang(code);
      });
      picker.appendChild(opt);
    });
    document.body.appendChild(picker);

    // FAB button
    var fab = document.createElement('button');
    fab.id = '_i18n-fab';
    fab.type = 'button';
    var cur = LANGS[window.I18N.lang];
    fab.innerHTML = '<span class="_i18n-flag">' + cur.flag + '</span><span class="_i18n-code">' + cur.short + '</span>';
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      picker.classList.toggle('open');
    });
    document.body.appendChild(fab);

    // Close on outside click
    document.addEventListener('click', function () {
      picker.classList.remove('open');
    });
  }

  // ── Bootstrap ─────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      _inject();
      window.I18N.apply();
    });
  } else {
    _inject();
    window.I18N.apply();
  }
})();
