function gerarDetalhamento() {
  const valor = parseFloat(document.getElementById('valorNota').value);
  const periodo = document.getElementById('periodo').value.trim();

  if (!valor || isNaN(valor)) {
    alert('Por favor, insira um valor numérico válido para a nota.');
    return;
  }

  // Regex para validar o formato: dd/mm/aaaa - dd/mm/aaaa
  const regexPeriodo = /^\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}$/;

  if (!regexPeriodo.test(periodo)) {
    alert('Por favor, insira o período no formato correto: dd/mm/aaaa - dd/mm/aaaa');
    return;
  }

  const valorDividido = (valor / 2).toFixed(2);
  const diariaVeiculo = 'R$ 720,00';
  const diariaMotorista = 'R$ 480,00';

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

  document.getElementById('resultado').innerHTML =
    modelo('PLANETA') + modelo('PLANESE');
  document.getElementById("copiarBtn").style.display = "inline-block";

}

function copiarTexto() {
  const texto = document.getElementById("resultado").innerText;
  navigator.clipboard.writeText(texto).then(() => {
    alert("Detalhamento copiado para a área de transferência!");
  });
}

document.getElementById('periodo').addEventListener('input', function (e) {
  const valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

  let dataFormatada = '';
  if (valor.length <= 2) {
    dataFormatada = valor;
  } else if (valor.length <= 4) {
    dataFormatada = `${valor.slice(0, 2)}/${valor.slice(2)}`;
  } else if (valor.length <= 8) {
    dataFormatada = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;
  } else if (valor.length <= 10) {
    dataFormatada = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4, 8)} - ${valor.slice(8)}`;
  } else if (valor.length <= 16) {
    dataFormatada = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4, 8)} - ${valor.slice(8, 10)}/${valor.slice(10, 12)}/${valor.slice(12, 16)}`;
  } else {
    dataFormatada = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4, 8)} - ${valor.slice(8, 10)}/${valor.slice(10, 12)}/${valor.slice(12, 16)}`;
  }

  e.target.value = dataFormatada;
});
