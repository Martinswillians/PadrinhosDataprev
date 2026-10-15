# Natal Solidário Dataprev: café da manhã de Natal

Site estático (GitHub Pages) + Firebase (Auth e Firestore). Servidores contribuem com R$ 50,00 por PIX, enviam o comprovante, e a coordenação confirma. O valor arrecadado compra panetones individuais ou cestas de Natal (3 itens) para os colegas terceirizados e o café da manhã de 15/12/2026.

## Como funciona
1. O administrador gera um **link aberto de cadastro** (Painel > Convites) e imprime o **cartaz com QR Code** (Painel > QR Code).
2. O servidor lê o QR Code, cria o cadastro e cai em **Minha contribuição**: vê o QR Code PIX (valor R$ 50,00), a chave e o "copia e cola", e envia o comprovante (foto, print ou PDF até 650 KB).
3. O administrador confere em **Painel > Contribuições**: Confirmar, Recusar (com motivo) ou Desfazer. O total arrecadado aparece na página inicial.
4. **Painel > Comparativo de compra** mostra quantos panetones ou cestas o valor confirmado permite comprar, e se cobre todos os colegas.

## Painel do administrador
- **Resumo:** arrecadado, em análise, quem ainda não contribuiu, convites e pedidos de acesso pendentes.
- **Contribuições:** lista com busca (nome, status, área/lotação), ver comprovante, confirmar, recusar, desfazer, excluir, registrar pagamento feito fora do site (dinheiro) e baixar CSV.
- **Comparativo de compra**, **Terceirizados**, **Servidores**, **Convites**, **QR Code**, **Registro de atividades** (log de todos os usuários) e **Administradores** (permissões individuais).
- **Campanha:** ano, data do café, valor da contribuição, meta, reserva do café, chave PIX (tipo, chave, nome e cidade do recebedor) e os itens da compra (nome, descrição, preço e foto).

## Publicação
1. **Firebase > Firestore > Regras:** cole o `firestore.rules` e publique (obrigatório nesta versão: há as coleções `contribuicoes` e `comprovantes`).
2. **GitHub:** envie o `index.html` e atualize o site com Ctrl+F5. O rodapé mostra a versão (2026.10.14-j).
3. **Authentication:** ative E-mail/senha e Google e mantenha `martinswillians.github.io` em Authorized domains.
4. Primeiro acesso do administrador: **Entrar > Sou administrador: entrar com Google**.
5. Em **Painel > Campanha**, confira a chave PIX e informe os **preços** do panetone e da cesta.

## Observações
- O Cloudflare Worker (`worker/worker.js`) não é mais necessário nesta versão (era usado para enviar e-mails de Natal aos afilhados).
- A permissão **Entregas** foi substituída por **Contribuições**. Administradores adicionais precisam ter a nova permissão marcada em Painel > Administradores.
- O apadrinhamento foi retirado. Os colegas terceirizados já cadastrados continuam, agora como lista de quem será presenteado. Dados de apadrinhamento antigos permanecem no Firestore, sem uso.
- Os comprovantes ficam no próprio Firestore (imagem reduzida ou PDF pequeno), sem precisar do Storage.
- O QR Code PIX é estático, com a chave e o valor configurados. Se o banco não aceitar o QR, o servidor usa a chave ou o "copia e cola".
- A chave PIX e as regras são públicas por natureza; a proteção dos dados está nas regras do Firestore. Restrinja a apiKey ao domínio do site em Google Cloud > Credenciais.
