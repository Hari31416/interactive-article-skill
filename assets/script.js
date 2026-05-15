// Safe single initialization — works whether script runs before or after DOM parse.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    initCodeCopyButtons();
    initFlashcards();
    initQuizzes();
    initSteppers();
    initComparisonSliders();
    initComparisonTabs();
    initPrimitives();
}

function initCodeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        if (btn.dataset.copyInitialized) return;
        btn.dataset.copyInitialized = "true";

        btn.addEventListener('click', () => {
            const codeContainer = btn.closest('.code-container');
            if (!codeContainer) return;

            const codeBlock = codeContainer.querySelector('pre code') || codeContainer.querySelector('pre');
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied!';
                    btn.style.color = '#34d399';
                    btn.style.borderColor = '#34d399';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 2000);
                }).catch(err => console.error('Copy failed', err));
            }
        });
    })
}

function initFlashcards() {
    document.querySelectorAll('.flashcard').forEach(card => {
        if (card.dataset.initialized) return;
        card.dataset.initialized = "true";
        card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    });
}

function initQuizzes() {
    document.querySelectorAll('.quiz-container').forEach(quiz => {
        if (quiz.dataset.initialized) return;
        quiz.dataset.initialized = "true";

        const options = quiz.querySelectorAll('.quiz-option');
        const feedback = quiz.querySelector('.quiz-feedback');
        const allowRetry = quiz.dataset.allowRetry === 'true';

        const resetQuiz = () => {
            delete quiz.dataset.completed;
            options.forEach(opt => {
                opt.classList.remove('is-disabled', 'is-correct', 'is-incorrect', 'is-selected');
            });
            const existingRetryBtn = quiz.querySelector('.quiz-retry-btn');
            if (existingRetryBtn) existingRetryBtn.remove();
            if (feedback) {
                feedback.classList.remove('is-visible', 'is-correct', 'is-incorrect');
                feedback.querySelectorAll('[data-feedback]').forEach(el => el.classList.remove('is-active'));
                const dynamicPrefix = feedback.querySelector('strong[data-dynamic]');
                if (dynamicPrefix) dynamicPrefix.remove();
            }
        };

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (quiz.dataset.completed) return;

                const isCorrect = option.dataset.correct === "true";

                quiz.dataset.completed = "true";
                options.forEach(opt => {
                    opt.classList.add('is-disabled');
                    if (opt.dataset.correct === "true") opt.classList.add('is-correct');
                    else if (opt === option) opt.classList.add('is-incorrect');
                });

                if (feedback) {
                    const correctMsg = feedback.querySelector('[data-feedback="correct"]');
                    const incorrectMsg = feedback.querySelector('[data-feedback="incorrect"]');
                    const generalMsg = feedback.querySelector('[data-feedback="general"]');

                    if (correctMsg || incorrectMsg) {
                        if (isCorrect && correctMsg) correctMsg.classList.add('is-active');
                        else if (!isCorrect && incorrectMsg) incorrectMsg.classList.add('is-active');
                        if (generalMsg) generalMsg.classList.add('is-active');
                    } else {
                        const resultPrefix = document.createElement('strong');
                        resultPrefix.dataset.dynamic = "true";
                        resultPrefix.textContent = isCorrect ? 'Correct! ' : 'Incorrect. ';
                        resultPrefix.style.color = isCorrect ? '#059669' : '#dc2626';
                        feedback.prepend(resultPrefix);
                    }

                    if (!isCorrect) {
                        quiz.classList.add('shake');
                        setTimeout(() => quiz.classList.remove('shake'), 500);

                        if (allowRetry) {
                            const retryBtn = document.createElement('button');
                            retryBtn.className = 'quiz-retry-btn';
                            retryBtn.textContent = 'Try Again';
                            retryBtn.addEventListener('click', e => {
                                e.stopPropagation();
                                resetQuiz();
                            });
                            feedback.appendChild(retryBtn);
                        }
                    }

                    feedback.classList.add('is-visible');
                    feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
                }
            });
        });
    });
}

function initSteppers() {
    document.querySelectorAll('.stepper').forEach(stepper => {
        if (stepper.dataset.initialized) return;
        stepper.dataset.initialized = "true";

        const steps = stepper.querySelectorAll('.stepper-step');
        const dots = stepper.querySelectorAll('.stepper-dot');
        const prevBtn = stepper.querySelector('.stepper-btn.is-prev');
        const nextBtn = stepper.querySelector('.stepper-btn.is-next');

        // Auto-inject step counter into the header
        const header = stepper.querySelector('.stepper-header');
        let counter = null;
        if (header && steps.length > 0) {
            counter = document.createElement('span');
            counter.className = 'stepper-counter';
            header.appendChild(counter);
        }

        let currentStep = 0;

        const updateStepper = () => {
            steps.forEach((step, i) => step.classList.toggle('is-active', i === currentStep));
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentStep));
            if (prevBtn) prevBtn.disabled = currentStep === 0;
            if (nextBtn) nextBtn.disabled = currentStep === steps.length - 1;
            if (counter) counter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
        };

        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (currentStep > 0) { currentStep--; updateStepper(); }
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) { currentStep++; updateStepper(); }
        });

        updateStepper();
    });
}

function initComparisonSliders() {
    document.querySelectorAll('.comparison-container').forEach(container => {
        if (container.dataset.initialized) return;
        container.dataset.initialized = "true";

        const after = container.querySelector('.comparison-after');
        const handle = container.querySelector('.comparison-handle');
        let isResizing = false;

        const setPosition = (x) => {
            const rect = container.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            after.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        };

        const onMove = (e) => {
            if (!isResizing) return;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            setPosition(x);
        };

        const startResizing = () => isResizing = true;
        const stopResizing = () => isResizing = false;

        handle.addEventListener('mousedown', startResizing);
        handle.addEventListener('touchstart', startResizing);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove);
        window.addEventListener('mouseup', stopResizing);
        window.addEventListener('touchend', stopResizing);
    });
}

// Tab-based comparison for text/code content (no slider mechanic needed)
function initComparisonTabs() {
    document.querySelectorAll('.comparison-tabs').forEach(container => {
        if (container.dataset.initialized) return;
        container.dataset.initialized = "true";

        const btns = container.querySelectorAll('.comparison-tab-btn');
        const panels = container.querySelectorAll('.comparison-tab-panel');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                btns.forEach(b => b.classList.remove('is-active'));
                panels.forEach(p => p.classList.remove('is-active'));
                btn.classList.add('is-active');
                const targetPanel = container.querySelector(`[data-panel="${target}"]`);
                if (targetPanel) targetPanel.classList.add('is-active');
            });
        });
    });
}

function initPrimitives() {
    document.querySelectorAll('input[type="range"]').forEach(range => {
        if (range.dataset.initialized) return;
        range.dataset.initialized = "true";

        const valueDisplay = range.closest('.primitive-control')?.querySelector('.primitive-value');
        if (valueDisplay) {
            range.addEventListener('input', () => {
                valueDisplay.textContent = range.value;
            });
        } else {
            console.warn(
                '[interactive-article] Range input missing a .primitive-value display. ' +
                'Wrap it in .primitive-control containing a <span class="primitive-value">.',
                range
            );
        }
    });
}
