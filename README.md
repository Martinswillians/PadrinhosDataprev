# Padrinhos Dataprev: Natal e Ano Novo Solidário

Site estático (GitHub Pages) + Firebase (Auth e Firestore) + Cloudflare Worker (envio opcional de e-mails).

## 1. Firebase (projeto `padrinhosdataprev`)
1. **Authentication > Sign-in method**: ative **E-mail/senha** e **Google**.
2. **Authentication > Settings > Authorized domains**: adicione `martinswillians.github.io`.
3. **Firestore Database > Criar banco de dados** (modo produção, região `southamerica-east1`).
4. **Firestore > Regras**: cole o conteúdo de `firestore.rules` e clique em **Publicar**.
5. Não é preciso usar o Storage: as fotos são reduzidas no navegador e guardadas no Firestore.

## 2. GitHub Pages
No terminal, dentro da pasta do projeto:
```
git init
git add .
git commit -m "Padrinhos Dataprev"
git branch -M main
git remote add origin https://github.com/Martinswillians/PadrinhosDataprev.git
git push -u origin main
```
Depois: **Settings > Pages > Build and deployment > Deploy from a branch > main / (root)**.
Endereço: `https://martinswillians.github.io/PadrinhosDataprev/`

## 3. Cloudflare Worker (opcional: enviar mensagens por e-mail)
1. No Worker `pushpadrinhosdataprev` clique em **Edit code**, cole `worker/worker.js` e faça **Deploy**.
2. **Settings > Variables and Secrets**: crie `FIREBASE_API_KEY`, `ADMIN_EMAIL`, `ALLOWED_ORIGIN`, `FROM_EMAIL` (texto) e `RESEND_API_KEY` (secret). Os valores estão comentados no topo do arquivo.
3. O envio usa o Resend (resend.com). Para enviar a qualquer destinatário é preciso verificar um domínio no Resend.
Se não quiser e-mail, deixe `WORKER_URL=""` no `index.html`: os cartões continuam podendo ser impressos.

## 4. Primeiro acesso
1. Abra o site > **Entrar** > **Sou administrador: entrar com Google** (conta willbrasilia@gmail.com).
2. Painel > **Campanha**: confirme ano e data de entrega e salve.
3. **Terceirizados**: cadastre os empregados. **Convites**: gere links para os servidores.

## 5. Administradores adicionais
Painel > **Administradores** (visível só ao administrador principal): informe nome e e-mail Google da pessoa e marque as permissões (Terceirizados, Servidores, Convites, Presentes, Campanha). A pessoa entra por **Sou administrador: entrar com Google**. Republique as regras do Firestore e o código do Worker (nova variável `FIREBASE_PROJECT_ID` = `padrinhosdataprev`).

## 6. Novidades desta versão
- Imagens natalinas e de Ano Novo sutis (flocos de neve, galho de pinheiro, fogos), embutidas no código: não dependem de arquivos externos.
- Na página inicial há duas abas: **Quem espera um padrinho** e **Quem já tem padrinho**. Quem já tem padrinho também pode ser apadrinhado por outros servidores.
- Quem não tem convite, ou cujo e-mail não está na lista, usa **Peça acesso ao administrador**. O pedido aparece em Painel > Convites, com o botão **Gerar convite**.
- Dados criados na versão anterior (campo `apadrinhado`) não são compatíveis: se já cadastrou terceirizados com a versão anterior, exclua-os e cadastre de novo (no Firestore, a coleção `apadrinhados` precisa do campo numérico `padrinhos`).

## 7. Perfil e telefone
- **Meu perfil** (menu superior, para qualquer usuário logado): foto, nome, área, lotação, telefone, e-mail de contato e descrição. Ao mudar o nome, os apadrinhamentos já feitos são atualizados.
- O pedido de acesso tem telefone opcional; o administrador vê o número e pode chamar no WhatsApp. O telefone segue para o convite e pré-preenche o cadastro.
- Republique `firestore.rules` e envie o novo `index.html`.

## 8. Listas com busca
No painel, as abas **Terceirizados** e **Servidores** listam em ordem alfabética e têm filtros combináveis (nome, profissão ou área, lotação e situação), sem diferenciar acentos ou maiúsculas. Campos obrigatórios aparecem com asterisco (*).

## Segurança
- A `apiKey` do Firebase é pública por natureza; quem protege os dados são as regras do Firestore.
- Telefone e e-mail dos terceirizados ficam em coleção separada, legível só pelo administrador.
- Em Google Cloud > Credenciais, restrinja a apiKey ao domínio `martinswillians.github.io/*`.
