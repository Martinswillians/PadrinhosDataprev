# Natal Solidário Datacenter 1º andar

Site estático (GitHub Pages) + Firebase (Auth e Firestore). Os servidores contribuem por PIX (sugestão de R$ 50,00 ou o valor que quiserem, quantas vezes quiserem) e enviam o comprovante. A coordenação confirma. Dependendo do valor arrecadado, compramos um Chocottone Bauducco ou uma Cesta Bauducco (Chocottone, Panettone e pão de mel) para cada colega terceirizado e entregamos os presentes no dia 15/12/2026.

## Fluxo do servidor
1. Lê o QR Code (ou usa o link de convite) e se cadastra: nome, área, e-mail, senha, foto e, se quiser, "fale um pouco sobre você".
2. Em **Minha contribuição**: escolhe o valor, paga o PIX (QR Code, chave ou copia e cola) e anexa o comprovante. Ao enviar, aparece a mensagem de agradecimento.
3. Acompanha as próprias contribuições (Em análise, Confirmada ou Recusada com o motivo, com opção de reenviar) e o andamento da campanha: arrecadado, quantos Chocottones ou cestas já dá para comprar e meta.
4. Quando os administradores disponibilizarem, vê a **prestação de contas**.

## Administradores
- Um administrador também pode contribuir: em **Minha contribuição** há o botão "Criar meu cadastro de servidor".
- **Painel > Contribuições:** confirmar, recusar (com motivo), desfazer, ver comprovante, registrar pagamento feito fora do site (já com o comprovante anexado, em foto, print ou PDF), anexar ou trocar o comprovante de uma contribuição já registrada e baixar CSV. Um servidor pode ter várias contribuições.
- **Quem já contribuiu:** a seção "Como está a campanha" mostra o nome e a foto (miniatura) dos servidores com contribuição confirmada, sem valores. A lista fica dentro do resumo público (`config/resumo`) e se atualiza sozinha ao confirmar, desfazer, excluir ou registrar contribuições, e também na primeira vez que um administrador abre o painel. O botão **Atualizar lista** (Contribuições) força a sincronização. Em Campanha dá para desligar essa exibição.
- **Painel > Comparativo de compra:** quantas unidades de cada item o valor confirmado compra e se cobre todos os colegas.
- **Painel > Prestação de contas:** registre as compras dos Chocottones e cestas e outras despesas, com comprovante em foto. O que foi registrado **só aparece para os servidores quando você clica em Disponibilizar para todos** (e pode ser ocultado de novo).
- **Painel > Campanha:** ano, data de entrega dos presentes, valor sugerido, meta, dados do PIX e os itens (nome, descrição, preço e foto).
- Também: Resumo, Terceirizados, Servidores, Convites, QR Code, Registro de atividades e Administradores (permissões individuais).

## App na tela inicial e compartilhamento no WhatsApp
- **Instalar o app:** o menu tem **Instalar app** (a tela `#/instalar`), com o passo a passo para **iPhone (Safari)**, **Android (Chrome)** e **computador (Chrome ou Edge)**. O cartão do aparelho de quem está acessando aparece primeiro, marcado como "seu aparelho". No celular, um aviso na parte de baixo oferece a instalação (pode ser fechado e só volta depois de 7 dias). No Android e no Chrome do computador existe também o botão **Instalar agora**. O ícone é uma árvore de Natal, e o app abre em tela cheia.
- **Compartilhar:** na mesma tela há a mensagem pronta, o botão **Compartilhar no WhatsApp**, o **Compartilhar…** do aparelho e **Copiar link**, com instruções para iPhone e Android. Em **Painel > QR Code** cada link (site e cadastro) também tem o botão **WhatsApp**.
- **Pré-visualização no WhatsApp:** ao colar o link, aparecem a foto (`og-image.jpg`), o título e a descrição. Se o WhatsApp já tinha guardado uma pré-visualização antiga, ela só muda depois de algum tempo; para forçar, envie o link com um final novo, por exemplo `.../PadrinhosDataprev/?v=2`.
- Arquivos novos que precisam ficar na **mesma pasta do `index.html`** no GitHub: `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon.png` e `og-image.jpg`.
- A descrição da pré-visualização (data e valor) e a do `manifest.webmanifest` são texto fixo; se mudar a data ou o valor, ajuste também esses textos no `index.html` (procure por `og:description`) e no manifesto.
- O app instalado sempre busca a versão mais nova pela internet e só usa a cópia guardada se o celular estiver sem conexão.

## Acesso de administradores e carregamento
- **Google:** o administrador adicionado em Painel > Administradores entra por **Sou administrador: entrar com Google**, com o mesmo e-mail Gmail cadastrado. No iPhone, faça esse login pelo **Safari**, não pelo app instalado na tela inicial (o login com Google não funciona dentro do app instalado; a tela de entrada avisa).
- **E-mail e senha:** quem tem conta por e-mail e senha (por exemplo, criada pelo QR Code) e foi adicionado como administrador precisa **confirmar o e-mail uma vez**. Ao entrar, o menu mostra **Painel**; a tela pede para tocar em **Enviar e-mail de confirmação**, abrir o link recebido e voltar para tocar em **Já confirmei**.
- **Carregamento:** os dados são guardados por 1 minuto ao navegar entre telas (a lista só é buscada de novo depois de alterações), a conexão com o Firebase usa o modo automático para redes móveis instáveis, e, se algo passar de 7 segundos, aparece um aviso. Se passar de 25 segundos, a tela mostra **Tentar novamente** e **Limpar dados do app e recarregar**.

## Contribuições em conferência e lista pública
- Ao enviar o comprovante, a contribuição **já aparece** em "Quem já contribuiu" (nome, foto em miniatura e valor), marcada como **em conferência**, e **entra na soma** de "Como está a campanha" (voto de confiança). A lista pública é a coleção `doadores`, uma entrada por contribuição.
- Em **Painel > Contribuições** os administradores veem um aviso das pendentes (e um contador no menu, ao lado de Painel), com as linhas pendentes em destaque e no topo. As ações são **Confirmar**, **Desfazer**, **Recusar** (some da lista pública), **Editar** (ajusta o valor) e **X** (exclui). Cada ação atualiza na hora a página pública.
- Se a lista pública estiver diferente das contribuições (por exemplo, nas já confirmadas antes desta versão), ela é corrigida sozinha na primeira abertura do painel; o botão **Atualizar lista** força a correção.
- Republique o `firestore.rules`: há regra nova para `doadores`.

## Mensagem de Feliz Natal e Próspero Ano Novo
**Painel > Mensagem de Natal** (permissão Campanha):
1. **Quem vai receber:** servidores (todos ou só quem contribuiu) e/ou colegas terceirizados. O painel mostra quantos têm e-mail.
2. **Mensagem:** assunto e texto editáveis (já vem um texto de Feliz Natal e Próspero Ano Novo). `{nome}` vira o primeiro nome nos envios individuais e nos cartões.
3. **Enviar:** **Abrir e-mail** abre o seu programa de e-mail com os destinatários em cópia oculta, em lotes de 20 (se o programa não abrir, use **Copiar e-mails** para Outlook ou Gmail). Há também **Copiar mensagem**, **WhatsApp (grupo)**, **Enviar e-mail** individual (com o primeiro nome) e **Imprimir cartões** (um cartão colorido A5 por pessoa, ideal para quem não tem e-mail).
4. **Publicar na página inicial:** mostra a mensagem em destaque para todos que abrirem o site ou o app; dá para ocultar depois.
O site não dispara e-mails sozinho (isso exigiria um serviço de envio pago); ele prepara tudo e usa o seu e-mail. Não há mudança nas regras do Firestore.

## Primeiro acesso de administrador
Quem foi adicionado em Painel > Administradores e prefere e-mail e senha usa **Entrar > Primeiro acesso com e-mail e senha**: cria a senha pelo próprio site (não é preciso cadastrar o e-mail no console do Firebase) e confirma o e-mail pelo link recebido. Quem tem Gmail pode usar **Sou administrador: entrar com Google**. Na lista de administradores, o botão **Enviar instruções** manda o passo a passo pelo WhatsApp.

## Publicação
1. **Firebase > Firestore > Regras:** cole o `firestore.rules` e publique (obrigatório: há regras novas para contribuições, comprovantes e prestação de contas).
2. **GitHub:** envie **todos os arquivos desta pasta** (o `index.html` e os de ícone, manifesto, imagem de compartilhamento e `sw.js`) e atualize o site com Ctrl+F5. O rodapé mostra a versão (2026.10.24-r).
3. **Authentication:** E-mail/senha e Google ativados, com `martinswillians.github.io` em Authorized domains.
4. Em **Painel > Campanha**, confira a chave PIX e a data de entrega e, se quiser, defina a meta. Os itens já vêm com as fotos e os preços do Chocottone (R$ 54,99) e da Cesta (R$ 73,49); ajuste se mudarem.

## Observações
- O nome da empresa não aparece nas telas do site. O endereço do GitHub Pages ainda contém o nome do repositório; para mudar, renomeie o repositório no GitHub (Settings) e atualize o QR Code.
- O Cloudflare Worker não é mais necessário.
- A permissão **Entregas** virou **Contribuições**. Administradores adicionais precisam da nova permissão marcada (e da **Prestação de contas**, que usa a mesma).
- Comprovantes ficam no próprio Firestore (imagem reduzida ou PDF de até 650 KB), sem precisar do Storage.
- O QR Code PIX é estático, com a chave e o valor informados. Se o banco não aceitar, use a chave ou o copia e cola.
- Restrinja a apiKey ao domínio do site em Google Cloud > Credenciais.
