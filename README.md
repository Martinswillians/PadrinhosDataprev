# Natal Solidário Datacenter 1º andar

Site estático (GitHub Pages) + Firebase (Auth e Firestore). Os servidores contribuem por PIX (sugestão de R$ 50,00 ou o valor que quiserem, quantas vezes quiserem) e enviam o comprovante. A coordenação confirma. Dependendo do valor arrecadado, compramos um Chocottone Bauducco ou uma Cesta Bauducco com 3 itens para cada colega terceirizado e fazemos um café da manhã no dia 15/12/2026, às 10h.

## Fluxo do servidor
1. Lê o QR Code (ou usa o link de convite) e se cadastra: nome, área, e-mail, senha, foto e, se quiser, "fale um pouco sobre você".
2. Em **Minha contribuição**: escolhe o valor, paga o PIX (QR Code, chave ou copia e cola) e anexa o comprovante. Ao enviar, aparece a mensagem de agradecimento.
3. Acompanha as próprias contribuições (Em análise, Confirmada ou Recusada com o motivo, com opção de reenviar) e o andamento da campanha: arrecadado, quantos Chocottones ou cestas já dá para comprar e meta.
4. Quando os administradores disponibilizarem, vê a **prestação de contas**.

## Administradores
- Um administrador também pode contribuir: em **Minha contribuição** há o botão "Criar meu cadastro de servidor".
- **Painel > Contribuições:** confirmar, recusar (com motivo), desfazer, ver comprovante, registrar pagamento feito fora do site e baixar CSV. Um servidor pode ter várias contribuições.
- **Painel > Comparativo de compra:** quantas unidades de cada item o valor confirmado compra e se cobre todos os colegas.
- **Painel > Prestação de contas:** registre as compras dos Chocottones e cestas e os gastos do café, com comprovante em foto. O que foi registrado **só aparece para os servidores quando você clica em Disponibilizar para todos** (e pode ser ocultado de novo).
- **Painel > Campanha:** ano, data e horário do café, valor sugerido, meta, reserva do café, dados do PIX e os itens (nome, descrição, preço e foto).
- Também: Resumo, Terceirizados, Servidores, Convites, QR Code, Registro de atividades e Administradores (permissões individuais).

## Publicação
1. **Firebase > Firestore > Regras:** cole o `firestore.rules` e publique (obrigatório: há regras novas para contribuições, comprovantes e prestação de contas).
2. **GitHub:** envie o `index.html` e atualize o site com Ctrl+F5. O rodapé mostra a versão (2026.10.15-k).
3. **Authentication:** E-mail/senha e Google ativados, com `martinswillians.github.io` em Authorized domains.
4. Em **Painel > Campanha**, confira a chave PIX, o horário e, se quiser, a meta e a reserva do café. Os itens já vêm com as fotos e os preços do Chocottone (R$ 54,99) e da Cesta (R$ 73,49); ajuste se mudarem.

## Observações
- O nome da empresa não aparece nas telas do site. O endereço do GitHub Pages ainda contém o nome do repositório; para mudar, renomeie o repositório no GitHub (Settings) e atualize o QR Code.
- O Cloudflare Worker não é mais necessário.
- A permissão **Entregas** virou **Contribuições**. Administradores adicionais precisam da nova permissão marcada (e da **Prestação de contas**, que usa a mesma).
- Comprovantes ficam no próprio Firestore (imagem reduzida ou PDF de até 650 KB), sem precisar do Storage.
- O QR Code PIX é estático, com a chave e o valor informados. Se o banco não aceitar, use a chave ou o copia e cola.
- Restrinja a apiKey ao domínio do site em Google Cloud > Credenciais.
