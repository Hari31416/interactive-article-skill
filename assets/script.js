// Clean Minimalist Standalone Article Base JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initCodeCopyButtons();
});

// Also run immediately in case the script is loaded after DOMContentLoaded
initCodeCopyButtons();

function initCodeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        // Prevent binding multiple times if called twice
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
