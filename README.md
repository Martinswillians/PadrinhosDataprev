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

## Segurança
- A `apiKey` do Firebase é pública por natureza; quem protege os dados são as regras do Firestore.
- Telefone e e-mail dos terceirizados ficam em coleção separada, legível só pelo administrador.
- Em Google Cloud > Credenciais, restrinja a apiKey ao domínio `martinswillians.github.io/*`.
