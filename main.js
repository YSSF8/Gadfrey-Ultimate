const btns = document.querySelectorAll('button');
textField.document.designMode = 'on';
let show = false;

const iframe = document.querySelector('.output');

textField.focus();
textField.document.body.style.color = '#fff';
textField.document.body.style.fontFamily = 'Segoe UI';

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
        let cmd = btns[i].getAttribute('data-cmd');
        if (btns[i].name == 'active') {
            btns[i].classList.toggle('active');
        }
        if (cmd == 'insertImage' || cmd == 'createLink') {
            let url = prompt('Enter link: ', '');
            textField.document.execCommand(cmd, false, url);

            if (cmd == 'insertImage') {
                const imgs = textField.document.querySelectorAll('img');
                imgs.forEach(item => {
                    item.style.maxWidth = '500px';
                    item.style.borderRadius = '8px';
                });
            } else {
                const links = textField.document.querySelectorAll('a');
                links.forEach(item => {
                    item.target = '_blank';

                    item.style.textDecoration = 'none';
                    item.style.color = '#1169db';

                    item.addEventListener('mouseover', () => {
                        textField.document.designMode = 'off';
                        item.style.textDecoration = 'underline';
                    });
                    item.addEventListener('mouseout', () => {
                        textField.document.designMode = 'on';
                        item.style.textDecoration = 'none';
                    });
                });
            }
        } else {
            textField.document.execCommand(cmd, false, null);
        }
        if (cmd == 'showCode') {
            const textBody = textField.document.querySelector('body');
            if (show) {
                textBody.innerHTML = textBody.textContent;
                show = false;
            } else {
                textBody.textContent = textBody.innerHTML;
                show = true;
            }
        }
        if (cmd == 'justifyLeft' || cmd == 'justifyCenter' || cmd == 'justifyRight') {
            iframe.contentWindow.document.body.focus();
        }
    });
}

const cb = document.querySelector('.checkbox');

cb.addEventListener('click', () => {
    const checkDot = document.querySelector('.check-dot');
    iframe.contentWindow.document.body.focus();
    checkDot.classList.toggle('unchecked');

    if (checkDot.classList.contains('unchecked')) {
        cb.style.background = '#1e1e1e';
        iframe.contentWindow.document.body.spellcheck = false;
    } else {
        cb.style.background = '#1169db';
        iframe.contentWindow.document.body.spellcheck = true;
    }
});

document.querySelector('.load').addEventListener('click', load);

async function load() {
    let [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile();
    let text = await fileData.text();
    iframe.contentWindow.document.body.innerHTML = text;
}

const ctx = document.querySelector('.ctx');

textField.addEventListener('contextmenu', e => {
    e.preventDefault();
    let x = e.clientX, y = e.clientY;
    ctx.style.transform = 'scale(1)';
    ctx.style.left = x + 'px';
    ctx.style.top = y + 'px';
});

textField.addEventListener('click', () => {
    ctx.style.transform = 'scale(0)';
});

ctx.addEventListener('contextmenu', e => {
    e.preventDefault();
});

document.querySelector('.clear').addEventListener('click', () => {
    textField.document.body.innerHTML = '';
    ctx.style.transform = 'scale(0)';
});

document.querySelector('.spellcheck').addEventListener('click', () => {
    cb.click();
    ctx.style.transform = 'scale(0)';
});