function gerarDetalhamento() {
  const valor = parseFloat(document.getElementById("valorNota").value);
  const periodo = document.getElementById("periodo").value.trim();

  if (!valor || isNaN(valor)) {
    alert("Por favor, insira um valor numérico válido para a nota.");
    return;
  }

  // Regex para validar o formato: dd/mm/aaaa - dd/mm/aaaa
  const regexPeriodo = /^\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}$/;

  if (!regexPeriodo.test(periodo)) {
    alert(
      "Por favor, insira o período no formato correto: dd/mm/aaaa - dd/mm/aaaa"
    );
    return;
  }

  const valorDividido = (valor / 2).toFixed(2);
  const diariaVeiculo = "R$ 720,00";
  const diariaMotorista = "R$ 480,00";

  const modelo = (empresa) => `
    <div class="block">
      <strong>Empresa: ${empresa}</strong><br>
      1. <strong>Valor da nota:</strong> R$ ${valorDividido}<br>
      2. <strong>Diária do veículo:</strong> ${diariaVeiculo}<br>
      3. <strong>Diária do motorista:</strong> ${diariaMotorista}<br>
      4. <strong>Período:</strong> ${periodo}<br>
      5. <strong>Obs:</strong> Por favor solicitar NF ${empresa}
    </div>
  `;

  document.getElementById("resultado").innerHTML =
    modelo("PLANETA") + modelo("PLANESE");
  document.getElementById("copiarBtn").style.display = "inline-block";
}

function copiarTexto() {
  const texto = document.getElementById("resultado").innerText;
  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast("Detalhamento copiado para a área de transferência!");
  });
}


const input = document.getElementById("periodo");

input.addEventListener("input", function (e) {
  const input = e.target;
  let valor = input.value;

  // Salva a posição atual do cursor
  let cursorPos = input.selectionStart;

  // Remove tudo que não for número
  let numeros = valor.replace(/\D/g, "");

  // Formata a data conforme o tamanho dos números
  let dataFormatada = "";
  if (numeros.length <= 2) {
    dataFormatada = numeros;
  } else if (numeros.length <= 4) {
    dataFormatada = `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  } else if (numeros.length <= 8) {
    dataFormatada = `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4)}`;
  } else if (numeros.length <= 10) {
    dataFormatada = `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4, 8)} - ${numeros.slice(8)}`;
  } else if (numeros.length <= 16) {
    dataFormatada = `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4, 8)} - ${numeros.slice(8, 10)}/${numeros.slice(
      10,
      12
    )}/${numeros.slice(12, 16)}`;
  } else {
    dataFormatada = `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4, 8)} - ${numeros.slice(8, 10)}/${numeros.slice(
      10,
      12
    )}/${numeros.slice(12, 16)}`;
  }

  // Atualiza o valor formatado no input
  input.value = dataFormatada;

  // Ajusta a posição do cursor para não "pular"
  // Isso evita que o cursor vá para o fim sempre que o usuário apaga algo no meio
  // Calcula quantos caracteres extras foram adicionados (slashes, espaços, hífen)
  let extrasAntesCursor = (
    dataFormatada.slice(0, cursorPos).match(/[\/ -]/g) || []
  ).length;
  let numerosAntesCursor = (valor.slice(0, cursorPos).match(/\d/g) || [])
    .length;

  // Novo cursor considerando os caracteres extras
  cursorPos = numerosAntesCursor + extrasAntesCursor;

  // Limita cursor para dentro do valor formatado
  if (cursorPos > dataFormatada.length) cursorPos = dataFormatada.length;

  input.setSelectionRange(cursorPos, cursorPos);
});

function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.style.visibility = 'visible';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.visibility = 'hidden';
    }, 500);
  }, 2000);
}
