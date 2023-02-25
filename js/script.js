document.cookie = "my_cookie=value; SameSite=Lax";

function formatarCelular(celular) {
  celular.value = celular.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .substring(0, 15);
}

const icon = document.querySelector('.icon-container');

window.addEventListener('scroll', function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop || 0;
  const screenHeight = window.innerHeight;


  if (scrollHeight - clientHeight - scrollPosition <= 1427) {
    document.querySelector('.icon-container').classList.add('hide');
  } else {
    document.querySelector('.icon-container').classList.remove('hide');
  }

  if (scrollHeight - clientHeight - scrollPosition >= 1427) {
    document.querySelector('.icon-container').classList.remove('hide');
  }
});

const item2 = document.querySelector('.fullscreen-menu li:nth-child(2)');
const subMenu = item2 && item2.querySelector('.sub-menu');

if (subMenu) {
  item2.addEventListener('mouseenter', () => {
    subMenu.style.display = 'block';
  });

  item2.addEventListener('mouseleave', () => {
    subMenu.style.display = 'none';
  });

  item2.addEventListener('click', () => {
    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
  });
}


function openFullscreenMenu() {
  var menu = document.querySelector(".fullscreen-menu");
  menu.style.display = "block";
}

function closeFullscreenMenu() {
  var menu = document.querySelector(".fullscreen-menu");
  menu.style.display = "none";
}

const subMenuItems = document.querySelectorAll('.fullscreen-menu li.has-submenu');


console.log('subMenuItems:', subMenuItems);

subMenuItems.forEach(item => {

  console.log('item:', item);
  const subMenu = item.querySelector('.sub-menu');
  console.log('subMenu:', subMenu);

  if (subMenu) {
    const icon = document.createElement('span');
    icon.classList.add('submenu-icon');
    icon.textContent = '+';
    item.appendChild(icon);

    icon.addEventListener('click', () => {
      const shouldShowSubMenu = subMenu.style.display !== 'block';
      subMenu.style.display = shouldShowSubMenu ? 'block' : 'none';
      icon.textContent = shouldShowSubMenu ? '-' : '+';
    });
  }
});

// GA
document.querySelector('form').addEventListener('submit', function () {
  gtag('event', 'enviar', {
    'event_category': 'formulario',
    'event_label': 'enviado'
  });
});

// Acompanhamento de formulário
function trackForm() {
  const form = document.querySelector('form');
  const formFields = form.elements;
  const formLength = formFields.length;

  // Armazena os dados dos campos preenchidos pelo usuário
  const formData = {};
  for (let i = 0; i < formLength; i++) {
    const field = formFields[i];
    formData[field.name] = false;
  }

  // Define o tempo limite para o abandono do campo
  const timeout = 10; // segundos

  // Inicia o acompanhamento dos eventos de formulário
  form.addEventListener('focusin', (event) => {
    const field = event.target;
    if (field.name in formData) {
      // Define um temporizador para detectar o abandono de campo
      formData[field.name] = setTimeout(() => {
        gtag('event', 'campo_abandonado', {
          'event_category': 'Formulário',
          'event_label': field.name
        });
      }, timeout * 1000);
    }
  });

  form.addEventListener('focusout', (event) => {
    const field = event.target;
    if (field.name in formData) {
      // Limpa o temporizador quando o campo é preenchido
      clearTimeout(formData[field.name]);
      formData[field.name] = false;
    }
  });

  form.addEventListener('submit', (event) => {
    // Acompanha o envio do formulário
    gtag('event', 'envio_formulário', {
      'event_category': 'Formulário'
    });

    // Acompanha o preenchimento de cada campo
    for (let i = 0; i < formLength; i++) {
      const field = formFields[i];
      gtag('event', 'preenchimento_campo', {
        'event_category': 'Formulário',
        'event_label': field.name,
        'value': field.value
      });
    }
  });
}

// Chama a função de acompanhamento de formulário
trackForm();
