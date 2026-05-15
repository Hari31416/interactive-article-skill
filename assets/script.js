document.addEventListener('DOMContentLoaded', () => {
    initCodeCopyButtons();
    initFlashcards();
    initQuizzes();
    initSteppers();
    initComparisonSliders();
    initPrimitives();
});

// Also run immediately in case the script is loaded after DOMContentLoaded
initCodeCopyButtons();
initFlashcards();
initQuizzes();
initSteppers();
initComparisonSliders();
initPrimitives();

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
    });
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
                        resultPrefix.textContent = isCorrect ? 'Correct! ' : 'Incorrect. ';
                        resultPrefix.style.color = isCorrect ? '#059669' : '#dc2626';
                        feedback.prepend(resultPrefix);
                    }

                    if (!isCorrect) {
                        quiz.classList.add('shake');
                        setTimeout(() => quiz.classList.remove('shake'), 500);
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
        let currentStep = 0;

        const updateStepper = () => {
            steps.forEach((step, i) => step.classList.toggle('is-active', i === currentStep));
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentStep));
            if (prevBtn) prevBtn.disabled = currentStep === 0;
            if (nextBtn) nextBtn.disabled = currentStep === steps.length - 1;
        };

        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStepper();
            }
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepper();
            }
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

function initPrimitives() {
    document.querySelectorAll('input[type="range"]').forEach(range => {
        if (range.dataset.initialized) return;
        range.dataset.initialized = "true";

        const valueDisplay = range.closest('.primitive-control')?.querySelector('.primitive-value');
        if (valueDisplay) {
            range.addEventListener('input', () => {
                valueDisplay.textContent = range.value;
            });
        }
    });
}
