const btns = document.querySelectorAll('button');
textField.document.designMode = 'on';
let show = false;

const iframe = document.querySelector('.output');

iframe.focus();
iframe.contentWindow.document.body.style.color = '#fff';
iframe.contentWindow.document.body.style.fontFamily = 'Segoe UI';

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
                    item.addEventListener('mouseover', () => {
                        textField.document.designMode = 'off';
                    });
                    item.addEventListener('mouseout', () => {
                        textField.document.designMode = 'on';
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
