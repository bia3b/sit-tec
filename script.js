
    // Troque pelo WhatsApp da assistência, somente números com código do país.
    const WHATSAPP_NUMBER = '5511999999999';
    const modal = document.getElementById('modal');
    const form = document.getElementById('contact-form');
    const success = document.getElementById('success');
    const openModal = event => { modal.classList.add('open'); if (event && event.currentTarget.dataset.problem) document.getElementById('problem').value = `Preciso de ajuda com ${event.currentTarget.dataset.problem}.`; document.getElementById('name').focus(); };
    const closeModal = () => modal.classList.remove('open');
    document.querySelectorAll('.open-modal').forEach(button => button.addEventListener('click', openModal));
    document.querySelector('.close').addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
    const repairData = {
      screen: { eyebrow: 'REPARO MAIS PROCURADO', title: 'Troca de tela', description: 'Recuperamos a imagem e o toque do aparelho com uma tela compatível, instalada e testada pela nossa equipe.', points: ['Teste de brilho, toque e sensores', 'Acabamento alinhado ao aparelho', 'Garantia no serviço realizado'], status: 'Diagnóstico cuidadoso antes de abrir o aparelho', visual: '' },
      battery: { eyebrow: 'MAIS AUTONOMIA', title: 'Bateria e carga', description: 'Identificamos se a falha está na bateria, no conector ou no circuito de carga antes de fazer a substituição.', points: ['Teste de saúde e consumo', 'Bateria de procedência confiável', 'Carga rápida testada na entrega'], status: 'Verificando saúde da bateria e entrada de carga', visual: 'battery' },
      board: { eyebrow: 'REPARO DE PRECISÃO', title: 'Placa e sistema', description: 'Usamos diagnóstico técnico para localizar falhas de energia, oxidação e componentes que impedem o aparelho de funcionar.', points: ['Análise com microscópio', 'Limpeza técnica e reparo de componentes', 'Teste completo de funcionamento'], status: 'Análise técnica dos componentes da placa', visual: 'board' },
      general: { eyebrow: 'REVISÃO COMPLETA', title: 'Manutenção geral', description: 'Fazemos uma revisão completa para encontrar e corrigir problemas de câmera, áudio, microfone, botões, limpeza e funcionamento.', points: ['Limpeza interna e externa', 'Teste de câmera, áudio, microfone e sensores', 'Checklist geral antes da entrega'], status: 'Inspecionando o aparelho por completo', visual: 'general' }
    };
    document.querySelectorAll('.repair-tab').forEach(tab => tab.addEventListener('click', () => {
      const repair = repairData[tab.dataset.repair];
      document.querySelectorAll('.repair-tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      document.getElementById('repair-eyebrow').textContent = repair.eyebrow;
      document.getElementById('repair-title').textContent = repair.title;
      document.getElementById('repair-description').textContent = repair.description;
      document.getElementById('repair-points').innerHTML = repair.points.map(point => `<li>${point}</li>`).join('');
      document.getElementById('repair-status').textContent = repair.status;
      document.getElementById('part-visual').className = `part-visual ${repair.visual}`;
      document.getElementById('repair-cta').dataset.problem = repair.title;
    }));
    const diagnosticForm = document.getElementById('diagnostic-form');
    const diagnosticSteps = diagnosticForm.querySelectorAll('.diagnostic-step');
    const diagnosticProgress = document.querySelectorAll('.diagnostic-progress span');
    const diagnosticProblem = document.getElementById('diagnostic-problem');
    const diagnosticModel = document.getElementById('diagnostic-model');
    const devicePhoto = document.getElementById('device-photo');
    let diagnosticResult;
    const problemData = {
      battery: { name: 'Bateria ruim', repair: 'Troca da bateria', hours: 12, questionOne: 'Quantas vezes você precisa procurar uma tomada?', questionTwo: 'Quanto tempo fica esperando o celular carregar?', questionThree: 'O celular desliga sozinho?' },
      screen: { name: 'Tela quebrada ou com falha', repair: 'Troca de tela', hours: 8, questionOne: 'Com que frequência a tela falha ou não responde?', questionTwo: 'Quanto tempo você perde tentando usar o aparelho?', questionThree: 'O toque, brilho ou imagem falha?' },
      charging: { name: 'Falha no carregamento', repair: 'Reparo do conector e circuito de carga', hours: 10, questionOne: 'Quantas vezes precisa mexer no cabo até carregar?', questionTwo: 'Quanto tempo fica procurando uma posição para o cabo?', questionThree: 'O aparelho aquece ou para de carregar sozinho?' },
      board: { name: 'Celular não liga ou molhou', repair: 'Diagnóstico de placa', hours: 18, questionOne: 'Há quanto tempo o aparelho apresenta esse problema?', questionTwo: 'Quanto tempo você perde tentando fazê-lo funcionar?', questionThree: 'Houve queda, contato com água ou aquecimento?' },
      general: { name: 'Manutenção geral', repair: 'Revisão completa do aparelho', hours: 6, questionOne: 'Quantos problemas diferentes o aparelho apresenta?', questionTwo: 'Quanto tempo isso atrapalha sua rotina?', questionThree: 'Câmera, áudio, botões ou sensores também falham?' }
    };
    const showDiagnosticStep = stepName => {
      diagnosticSteps.forEach(step => step.classList.toggle('active', step.dataset.step === stepName));
      diagnosticProgress.forEach((item, index) => item.classList.toggle('active', ['problem', 'questions', 'result'][index] === stepName));
    };
    diagnosticProblem.addEventListener('change', () => {
      const selected = problemData[diagnosticProblem.value];
      if (!selected) return;
      document.getElementById('question-one-label').textContent = selected.questionOne;
      document.getElementById('question-two-label').textContent = selected.questionTwo;
      document.getElementById('question-three-label').textContent = selected.questionThree;
    });
    document.querySelector('.diagnostic-next').addEventListener('click', () => {
      if (!diagnosticProblem.value || !diagnosticModel.value.trim()) { diagnosticForm.reportValidity(); return; }
      showDiagnosticStep('questions');
    });
    document.querySelector('.diagnostic-back').addEventListener('click', () => showDiagnosticStep('problem'));
    document.querySelector('.diagnostic-result').addEventListener('click', () => {
      const questionFields = diagnosticForm.querySelectorAll('[data-step="questions"] select');
      if ([...questionFields].some(field => !field.value)) { diagnosticForm.reportValidity(); return; }
      const selected = problemData[diagnosticProblem.value];
      const intensity = [...questionFields].filter(field => field.selectedIndex > 1).length;
      const hours = selected.hours + intensity * 4;
      diagnosticResult = { ...selected, model: diagnosticModel.value.trim(), hours };
      document.getElementById('result-title').textContent = `Seu ${selected.name.toLowerCase()} pode custar tempo todo mês.`;
      document.getElementById('result-impact').textContent = `Pelas suas respostas, você pode estar perdendo aproximadamente ${hours} horas por mês convivendo com esse problema. Em vez de improvisar, dá para avaliar e resolver com segurança.`;
      document.getElementById('result-repair').textContent = selected.repair;
      showDiagnosticStep('result');
    });
    document.querySelector('.diagnostic-restart').addEventListener('click', () => { diagnosticForm.reset(); document.getElementById('photo-name').textContent = 'Nenhuma foto escolhida'; showDiagnosticStep('problem'); });
    devicePhoto.addEventListener('change', () => { document.getElementById('photo-name').textContent = devicePhoto.files[0] ? devicePhoto.files[0].name : 'Nenhuma foto escolhida'; });
    document.querySelector('.diagnostic-whatsapp').addEventListener('click', async () => {
      if (!diagnosticResult) return;
      const photo = devicePhoto.files[0];
      const message = `Olá! Sou um novo cliente pelo site.\nModelo: ${diagnosticResult.model}\nProblema: ${diagnosticResult.name}\nReparo recomendado: ${diagnosticResult.repair}\nEstimativa de impacto: ${diagnosticResult.hours} horas por mês.\nFoto selecionada: ${photo ? photo.name : 'não enviada'}\nQuero resolver agora e saber a disponibilidade do diagnóstico.`;
      if (photo && navigator.share && navigator.canShare && navigator.canShare({ files: [photo] })) {
        await navigator.share({ title: 'Orçamento TechFix', text: message, files: [photo] });
        return;
      }
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message + '\nVou anexar a foto do aparelho nesta conversa.')}`, '_blank', 'noopener');
    });
    const createClickGlow = (x, y) => {
      const glow = document.createElement('span');
      glow.className = 'click-glow';
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      document.body.appendChild(glow);
      window.setTimeout(() => glow.remove(), 850);
    };
    document.querySelector('.screen').addEventListener('click', event => {
      createClickGlow(event.clientX, event.clientY);
      event.stopPropagation();
      const screen = event.currentTarget;
      screen.classList.remove('screen-active');
      void screen.offsetWidth;
      screen.classList.add('screen-active');
      window.setTimeout(() => screen.classList.remove('screen-active'), 850);
    });
    document.addEventListener('click', event => {
      if (event.target.closest('button, a, input, select, textarea, label, .screen')) return;
      createClickGlow(event.clientX, event.clientY);
    });
    document.querySelectorAll('.before-after-card').forEach(card => {
      const cardKey = `b17g-${card.dataset.card}`;
      const savePhoto = (side, dataUrl) => {
        const saved = JSON.parse(localStorage.getItem(cardKey) || '{}');
        saved[side] = dataUrl;
        localStorage.setItem(cardKey, JSON.stringify(saved));
        renderPhoto(side, dataUrl);
      };
      const renderPhoto = (side, dataUrl) => {
        const placeholder = card.querySelector(`[data-side="${side}"]`);
        if (!dataUrl) { placeholder.classList.remove('has-photo'); placeholder.style.backgroundImage = ''; return; }
        placeholder.classList.add('has-photo');
        placeholder.style.backgroundImage = `linear-gradient(#07111f22,#07111f22), url("${dataUrl}")`;
      };
      const saved = JSON.parse(localStorage.getItem(cardKey) || '{}');
      ['before', 'after'].forEach(side => {
        if (saved[side]) renderPhoto(side, saved[side]);
        card.querySelector(`[data-photo="${side}"]`).addEventListener('change', event => {
          const file = event.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.addEventListener('load', () => savePhoto(side, reader.result));
          reader.readAsDataURL(file);
        });
      });
      card.querySelector('.delete-photos').addEventListener('click', () => {
        localStorage.removeItem(cardKey);
        ['before', 'after'].forEach(side => { renderPhoto(side, ''); card.querySelector(`[data-photo="${side}"]`).value = ''; });
      });
    });
    const reviewLike = document.querySelector('.review-like');
    const reviewVoteCount = document.getElementById('review-vote-count');
    const reviewVoteKey = 'b17g-review-vote';
    let reviewVotes = Number(localStorage.getItem('b17g-review-count') || 0);
    let selectedReview = Number(localStorage.getItem(reviewVoteKey) || 0);
    const updateReviewRating = () => {
      reviewVoteCount.textContent = reviewVotes;
      reviewLike.classList.toggle('active', Boolean(selectedReview));
      reviewLike.setAttribute('aria-pressed', String(Boolean(selectedReview)));
      reviewLike.lastChild.textContent = selectedReview ? ' Recomendado' : ' Recomendar';
    };
    reviewLike.addEventListener('click', () => {
      if (selectedReview) {
        reviewVotes = Math.max(0, reviewVotes - 1);
        selectedReview = 0;
        localStorage.removeItem(reviewVoteKey);
      } else {
        reviewVotes += 1;
        selectedReview = 1;
        localStorage.setItem(reviewVoteKey, selectedReview);
        localStorage.setItem('b17g-review-count', reviewVotes);
      }
      localStorage.setItem('b17g-review-count', reviewVotes);
      updateReviewRating();
    });
    updateReviewRating();
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const message = `Olá! Meu nome é ${data.get('name')}. Meu telefone é ${data.get('phone')}. Preciso de ajuda com: ${data.get('problem')}`;
      success.classList.add('show');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  