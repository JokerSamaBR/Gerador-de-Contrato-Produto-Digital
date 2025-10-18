/* ...existing code... */
const contractArea = document.getElementById('contractArea');
/* ...existing code... */
function getDataExtenso() {
  const meses = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();
  return `${dia} de ${mes} de ${ano}`;
}
/* ...existing code... */
function buildContractHtml() {
  const vendedor_nome = document.getElementById('vendedor_nome').value || '_________________________';
  const vendedor_cnpj = document.getElementById('vendedor_cnpj').value || '_________________________';
  const vendedor_endereco = document.getElementById('vendedor_endereco').value || '_________________________';
  const vendedor_email = document.getElementById('vendedor_email').value || '_________________________';
  const comprador_nome = document.getElementById('comprador_nome').value || '_________________________';
  const comprador_cpf = document.getElementById('comprador_cpf').value || '_________________________';
  const comprador_endereco = document.getElementById('comprador_endereco').value || '_________________________';
  const comprador_email = document.getElementById('comprador_email').value || '_________________________';
  const produto_nome = document.getElementById('produto_nome').value || '_________________________';
  const produto_desc = document.getElementById('produto_desc').value || '_________________________';
  const produto_valor = document.getElementById('produto_valor').value || '0,00';
  const produto_prazo = document.getElementById('produto_prazo').value || '_________________________';
  const produto_entrega = document.getElementById('produto_entrega').value || '_________________________';
  const foro_local = document.getElementById('foro_local').value || 'Cidade/ES';
  const emissao_local = document.getElementById('emissao_local')?.value || 'Cidade/ES';

  return `
  <div class="pdf-page">
    <div class="pdf-title">CONTRATO DE COMPRA E VENDA DE PRODUTO DIGITAL</div>
    <div style="text-align:center; margin-bottom:10px">${emissao_local}, ${getDataExtenso()} (emissão do contrato)</div>
    <p><strong>Vendedor:</strong> ${vendedor_nome}, inscrito sob o CNPJ/CPF nº ${vendedor_cnpj}, com endereço em ${vendedor_endereco}, e-mail ${vendedor_email}.</p>
    <p><strong>Comprador:</strong> ${comprador_nome}, CPF nº ${comprador_cpf}, residente em ${comprador_endereco}, e-mail ${comprador_email}.</p>

    <div class="clause-title">1. DO OBJETO</div>
    <p>O presente contrato tem por objeto a compra e venda do produto digital denominado <strong>${produto_nome}</strong>, descrito como: ${produto_desc}, no valor de R$ ${produto_valor}.</p>

    <div class="clause-title">2. DA ENTREGA</div>
    <p>A entrega ocorrerá em até ${produto_prazo}, por meio de ${produto_entrega}.</p>

    <div class="clause-title">3. DO PAGAMENTO</div>
    <p>O pagamento será realizado conforme acordo entre as partes. Após confirmação, o comprador terá acesso ao produto.</p>

    <div class="clause-title">4. DAS RESPONSABILIDADES</div>
    <p>O vendedor garante a autenticidade e entrega do produto. O comprador compromete-se a não reproduzir, revender ou redistribuir o conteúdo sem autorização.</p>

    <div class="clause-title">5. DO DIREITO DE ARREPENDIMENTO</div>
    <p>O comprador poderá desistir da compra em até 7 dias corridos, desde que não tenha efetuado o download ou acesso ao produto.</p>

    <div class="clause-title">6. DA PROPRIEDADE INTELECTUAL</div>
    <p>Todos os direitos autorais e de propriedade intelectual do produto pertencem ao vendedor.</p>

    <div class="clause-title">7. DA RESCISÃO</div>
    <p>O contrato poderá ser rescindido por descumprimento das cláusulas por qualquer das partes.</p>

    <div class="clause-title">8. DO FORO</div>
    <p>Para dirimir quaisquer controvérsias oriundas deste contrato, as partes elegem o Foro da Comarca de ${foro_local}.</p>

    <div class="sign-area">
      <div style="text-align:left">
        <strong>Vendedor:</strong>___________________________<br>
        Data: ___ / ___ / ___
      </div>
      <div style="text-align:right">
        <strong>Comprador:</strong>___________________________<br>
        Data: ___ / ___ / ___
      </div>
    </div>
  </div>`;
}
/* ...existing code... */
function updatePreview() {
  contractArea.innerHTML = buildContractHtml();
}
/* ...existing code... */
function generatePdf() {
  const content = buildContractHtml();
  const comprador = document.getElementById('comprador_nome').value || 'sem_nome';
  const safeName = comprador.replace(/[^a-zA-Z0-9\-\_ ]/g,'').replace(/\s+/g,'_');

  const element = document.createElement('div');
  element.innerHTML = content;
  document.body.appendChild(element);

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `Contrato_Digital_${safeName}.pdf`,
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // html2pdf is loaded globally from CDN
  // eslint-disable-next-line no-undef
  html2pdf().set(opt).from(element).save().then(() => element.remove());
}
/* ...existing code... */
document.getElementById('btnPreview').addEventListener('click', updatePreview);
document.getElementById('btnPdf').addEventListener('click', generatePdf);
updatePreview();
/* ...existing code... */
