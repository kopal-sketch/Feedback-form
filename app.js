/**
 * POP Feedback — Conversational flow
 * One question at a time, chat-like UI
 */

(function () {
  const state = {
    step: 'welcome',
    serviceId: null,
    formId: null,
    rating: null,
    path: null,
    answers: {},
    currentQuestionKey: null,
    pathQuestionKeys: []
  };

  const CONTAINER = document.getElementById('chat-container');
  const INPUT_AREA = document.getElementById('input-area');
  const INPUT = document.getElementById('user-input');
  const SEND_BTN = document.getElementById('send-btn');
  const RATING_ROW = document.getElementById('rating-row');
  const CHOICES_ROW = document.getElementById('choices-row');
  const FREETEXT_ROW = document.getElementById('freetext-row');
  const SUBMIT_ROW = document.getElementById('submit-row');

  function scrollToBottom() {
    CONTAINER.scrollTop = CONTAINER.scrollHeight;
  }

  function addBubble(text, isUser = false, meta = null) {
    const div = document.createElement('div');
    div.className = `bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`;
    const inner = document.createElement('div');
    inner.className = 'bubble-inner';
    inner.textContent = text;
    if (meta) {
      const metaEl = document.createElement('div');
      metaEl.className = 'bubble-meta';
      metaEl.textContent = meta;
      inner.appendChild(metaEl);
    }
    div.appendChild(inner);
    CONTAINER.appendChild(div);
    scrollToBottom();
  }

  function showRating() {
    RATING_ROW.classList.remove('hidden');
    CHOICES_ROW.classList.add('hidden');
    FREETEXT_ROW.classList.add('hidden');
    SUBMIT_ROW.classList.add('hidden');
    INPUT_AREA.classList.add('hidden');
  }

  function showChoices(options, multiselect = false, allowOther = false) {
    RATING_ROW.classList.add('hidden');
    FREETEXT_ROW.classList.add('hidden');
    SUBMIT_ROW.classList.add('hidden');
    INPUT_AREA.classList.add('hidden');
    CHOICES_ROW.classList.remove('hidden');
    CHOICES_ROW.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'choices-wrap';
    options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'choice-chip';
      const input = document.createElement('input');
      input.type = multiselect ? 'checkbox' : 'radio';
      input.name = multiselect ? 'choices' : 'choice';
      input.value = opt;
      input.id = `opt-${i}`;
      label.appendChild(input);
      const span = document.createElement('span');
      span.textContent = opt;
      label.appendChild(span);
      container.appendChild(label);
    });
    if (allowOther) {
      const otherWrap = document.createElement('div');
      otherWrap.className = 'choice-other';
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Something else? (optional)';
      input.id = 'choice-other-text';
      otherWrap.appendChild(input);
      container.appendChild(otherWrap);
    }
    const doneBtn = document.createElement('button');
    doneBtn.type = 'button';
    doneBtn.className = 'btn btn-primary choice-done';
    doneBtn.textContent = 'Continue';
    doneBtn.onclick = () => submitChoice(multiselect, allowOther);
    container.appendChild(doneBtn);
    CHOICES_ROW.appendChild(container);
    scrollToBottom();
  }

  function showFreetext(placeholder = 'Share your thoughts...') {
    RATING_ROW.classList.add('hidden');
    CHOICES_ROW.classList.add('hidden');
    SUBMIT_ROW.classList.add('hidden');
    RATING_ROW.classList.add('hidden');
    FREETEXT_ROW.classList.remove('hidden');
    INPUT_AREA.classList.add('hidden');
    const textarea = document.getElementById('freetext-input');
    textarea.placeholder = placeholder;
    textarea.value = '';
    const btn = document.getElementById('freetext-submit');
    btn.onclick = () => submitFreetext();
    scrollToBottom();
  }

  function showSubmit() {
    RATING_ROW.classList.add('hidden');
    CHOICES_ROW.classList.add('hidden');
    FREETEXT_ROW.classList.add('hidden');
    INPUT_AREA.classList.add('hidden');
    SUBMIT_ROW.classList.remove('hidden');
    scrollToBottom();
  }

  function hideAllInputs() {
    RATING_ROW.classList.add('hidden');
    CHOICES_ROW.classList.add('hidden');
    FREETEXT_ROW.classList.add('hidden');
    SUBMIT_ROW.classList.add('hidden');
    INPUT_AREA.classList.add('hidden');
  }

  function getSelectedRating() {
    const selected = document.querySelector('input[name="rating"]:checked');
    return selected ? parseInt(selected.value, 10) : null;
  }

  function getSelectedChoices(multiselect, allowOther) {
    if (multiselect) {
      const checked = Array.from(document.querySelectorAll('input[name="choices"]:checked')).map(c => c.value);
      if (allowOther) {
        const other = document.getElementById('choice-other-text');
        if (other && other.value.trim()) checked.push('Other: ' + other.value.trim());
      }
      return checked;
    }
    const selected = document.querySelector('input[name="choice"]:checked');
    const val = selected ? selected.value : null;
    if (allowOther && !val) {
      const other = document.getElementById('choice-other-text');
      if (other && other.value.trim()) return 'Other: ' + other.value.trim();
    }
    return val;
  }

  function submitRating() {
    const r = getSelectedRating();
    if (r == null) return;
    state.rating = r;
    state.path = r >= 4 ? 'pathA' : 'pathB';
    state.answers.rating = r;
    addBubble(r >= 4 ? '✨ Glad it went well! A few quick questions so we can keep making it better.' : 'We’re sorry it wasn’t great. Your feedback will help us fix it.', false);
    state.step = 'path_questions';
    const form = FORMS[state.formId];
    const pathQs = form[state.path];
    state.pathQuestionKeys = Object.keys(pathQs).sort((a, b) => {
      const an = a.replace('q', '');
      const bn = b.replace('q', '');
      return parseInt(an, 10) - parseInt(bn, 10);
    });
    state.currentQuestionKey = state.pathQuestionKeys[0];
    RATING_ROW.classList.add('hidden');
    setTimeout(() => askPathQuestion(), 600);
  }

  function askPathQuestion() {
    if (!state.currentQuestionKey) {
      showSubmit();
      addBubble("That's everything from our side. Thanks so much for taking the time — it really helps us improve.", false);
      addBubble('Click below to submit your feedback. We read every response.', false);
      return;
    }
    const form = FORMS[state.formId];
    const pathQs = form[state.path];
    const q = pathQs[state.currentQuestionKey];
    addBubble(q.question, false);
    if (q.type === 'multiselect') {
      showChoices(q.options, true, q.allowOther || false);
    } else if (q.type === 'single') {
      showChoices(q.options, false, q.allowOther || false);
    } else if (q.type === 'freetext') {
      showFreetext(q.placeholder || 'Share your thoughts...');
    }
  }

  function submitChoice(multiselect, allowOther) {
    const val = getSelectedChoices(multiselect, allowOther);
    const key = state.currentQuestionKey;
    if (multiselect && Array.isArray(val)) {
      if (val.length === 0 && !allowOther) return;
    } else if (!val) return;
    state.answers[key] = val;
    state.pathQuestionKeys = state.pathQuestionKeys.filter(k => k !== key);
    state.currentQuestionKey = state.pathQuestionKeys[0] || null;
    CHOICES_ROW.classList.add('hidden');
    setTimeout(() => askPathQuestion(), 400);
  }

  function submitFreetext() {
    const textarea = document.getElementById('freetext-input');
    const val = textarea.value.trim();
    state.answers[state.currentQuestionKey] = val || null;
    state.pathQuestionKeys = state.pathQuestionKeys.filter(k => k !== state.currentQuestionKey);
    state.currentQuestionKey = state.pathQuestionKeys[0] || null;
    FREETEXT_ROW.classList.add('hidden');
    setTimeout(() => askPathQuestion(), 400);
  }

  function submitFeedback() {
    const payload = {
      serviceId: state.serviceId,
      formId: state.formId,
      rating: state.rating,
      path: state.path,
      answers: state.answers,
      submittedAt: new Date().toISOString()
    };

    // Try to send to backend; fallback to console + localStorage
    const apiUrl = window.POP_FEEDBACK_API || '/api/feedback';
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) {
        addBubble("Thanks! We've saved your feedback. Have a great day! 🎉", false);
      } else {
        throw new Error('Save failed');
      }
    }).catch(() => {
      // Store locally for later sync / demo
      try {
        const stored = JSON.parse(localStorage.getItem('pop_feedback_queue') || '[]');
        stored.push(payload);
        localStorage.setItem('pop_feedback_queue', JSON.stringify(stored));
      } catch (e) {}
      addBubble("Thanks! We've recorded your feedback. Have a great day! 🎉", false);
    });

    hideAllInputs();
    SUBMIT_ROW.classList.add('hidden');
    document.getElementById('submit-btn').disabled = true;
    scrollToBottom();
  }

  function startServiceFlow() {
    if (state.serviceId === 'card') {
      addBubble('Which part of your card experience do you want to talk about?', false);
      showChoices(CARD_SUB_SERVICES.map(s => s.label), false);
      state.step = 'sub_service_card';
      return;
    }
    if (state.serviceId === 'bills') {
      addBubble('Was it about paying a bill or doing a recharge?', false);
      showChoices(BILLS_SUB_SERVICES.map(s => s.label), false);
      state.step = 'sub_service_bills';
      return;
    }
    setFormAndAskRating();
  }

  function setFormAndAskRating() {
    CHOICES_ROW.classList.add('hidden');
    if (state.serviceId === 'shop') state.formId = 'shop';
    else if (state.serviceId === 'upi') state.formId = 'upi';
    else if (state.serviceId === 'card') {
      const idx = ['Card application', 'In-app card experience (viewing, managing card)', 'Reward claim'].indexOf(state.subServiceLabel);
      state.formId = ['card_application', 'card_sdk', 'card_reward'][idx];
    } else if (state.serviceId === 'bills') {
      const idx = ['Bill payment', 'Recharge'].indexOf(state.subServiceLabel);
      state.formId = ['rcbp_bill', 'rcbp_recharge'][idx];
    }
    const form = FORMS[state.formId];
    addBubble(form.ratingQuestion, false);
    showRating();
    state.step = 'rating';
  }

  function onChoiceSelect(label, step) {
    CHOICES_ROW.classList.add('hidden');
    if (step === 'service') {
      const opt = SERVICE_OPTIONS.find(o => o.label === label);
      if (!opt) return;
      state.serviceId = opt.id;
      addBubble(`Got it — ${label}.`, true);
      startServiceFlow();
      return;
    }
    if (step === 'sub_service_card') {
      state.subServiceLabel = label;
      const sub = CARD_SUB_SERVICES.find(s => s.label === label);
      state.formId = sub ? sub.formId : null;
      addBubble(label, true);
      setFormAndAskRating();
      return;
    }
    if (step === 'sub_service_bills') {
      state.subServiceLabel = label;
      const sub = BILLS_SUB_SERVICES.find(s => s.label === label);
      state.formId = sub ? sub.formId : null;
      addBubble(label, true);
      setFormAndAskRating();
      return;
    }
  }

  function initRatingButtons() {
    const wrap = document.getElementById('rating-buttons');
    wrap.innerHTML = '';
    [1, 2, 3, 4, 5].forEach(n => {
      const label = document.createElement('label');
      label.className = 'rating-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'rating';
      input.value = n;
      input.id = `rating-${n}`;
      label.appendChild(input);
      const span = document.createElement('span');
      span.className = 'rating-num';
      span.textContent = n;
      label.appendChild(span);
      wrap.appendChild(label);
    });
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.textContent = 'Continue';
    btn.onclick = submitRating;
    wrap.appendChild(btn);
  }

  function init() {
    initRatingButtons();
    document.getElementById('submit-btn').onclick = submitFeedback;

    // Welcome
    addBubble("Hey! 👋 We'd love to hear how things went. This will feel like a quick chat — no long forms.", false);
    addBubble('Which product do you want to give feedback on?', false);
    showChoices(SERVICE_OPTIONS.map(o => o.label), false);
    state.step = 'service';

    // When user clicks a choice chip (for service / sub-service)
    document.body.addEventListener('change', (e) => {
      if (state.step !== 'service' && state.step !== 'sub_service_card' && state.step !== 'sub_service_bills') return;
      if (e.target.name === 'choice' && e.target.checked) {
        const label = e.target.nextElementSibling ? e.target.nextElementSibling.textContent : e.target.value;
        if (state.step === 'service') onChoiceSelect(label, 'service');
        else if (state.step === 'sub_service_card') onChoiceSelect(label, 'sub_service_card');
        else if (state.step === 'sub_service_bills') onChoiceSelect(label, 'sub_service_bills');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
