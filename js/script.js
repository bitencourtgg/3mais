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

window.addEventListener('scroll', function() {
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

