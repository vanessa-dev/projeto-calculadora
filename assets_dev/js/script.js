
'use strict';

const display = document.querySelector('.display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
const buttonLimparDisplay = document.getElementById('limparDisplay')
const buttonIgual  = document.getElementById('igual');
const buttonLimparCalculo = document.getElementById('limparCalculo');
const buttonEspaco = document.getElementById('backspace');
const buttonInverterSinal = document.getElementById('inverter');
const buttonDecimal = document.getElementById('decimal');



let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.innerHTML.replace('.','').replace(',', '.'));
    novoNumero = true;
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);
  }
};

const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.innerHTML = texto.toLocaleString('BR');
    novoNumero = false;
  } else {
    display.innerHTML += texto.toLocaleString('BR');
  }
  buttonIgual.focus();
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.innerHTML);
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.innerText;
    numeroAnterior = parseFloat(display.innerText.replace('.','').replace(',', '.'));

  }
};

operadores.forEach((operador) =>
  operador.addEventListener('click', selecionarOperador)
);

const ativarIgual = () => {
  calcular();
  operador = undefined;
};

buttonIgual.addEventListener('click', ativarIgual);

const limparDisplay = () => (display.innerHTML = '');
  
buttonLimparDisplay.addEventListener('click', limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

buttonLimparCalculo.addEventListener('click', limparCalculo);

const removerUltimoNumero = () => (display.innerHTML = display.innerHTML.slice(0, -1));

buttonEspaco.addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.innerHTML * -1);
};

buttonInverterSinal.addEventListener('click', inverterSinal);

const existeDecimal = () => display.innerHTML.indexOf(',') !== -1;
const existeValor = () => display.innerHTML.length > 0;
const inserirDecimal = () => {
  if (!existeDecimal()) {
    if (novoNumero) {
      atualizarDisplay('0,');
    } else {
      atualizarDisplay(',');
    }
  }
};

buttonDecimal.addEventListener('click', inserirDecimal);

const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
  const tecla = evento.key;
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};

document.addEventListener('keydown', mapearTeclado);