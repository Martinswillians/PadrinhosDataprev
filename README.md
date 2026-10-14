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

## 9. Busca na página da campanha
Nas abas **Quem espera um padrinho** e **Quem já tem padrinho** há busca por nome e por lotação, combinável com o filtro de profissão. A busca ignora acentos e maiúsculas e o resultado atualiza enquanto se digita.

## 10. Menos dados expostos
Os cadastros de terceirizados e de servidores não pedem mais telefone, e o campo de nome passou a se chamar apenas **Nome** (pode ser só o primeiro nome). O telefone continua opcional apenas no pedido de acesso ao administrador.

## 11. E-mail do afilhado e entrega do presente
- Em **Meus afilhados**, o padrinho vê o e-mail de cada afilhado (somente dos que ele apadrinhou) e marca **Marcar como entregue** quando o presente for entregue. A data fica registrada.
- No painel: Resumo mostra "presentes entregues", Terceirizados marca ✔ ao lado do padrinho que já entregou, e Presentes e mensagens lista e-mail, data e permite ajuste manual.
- Republique `firestore.rules` e envie o novo `index.html`.

## 12. Registro de atividades (log)
- Cada ação é gravada com data e hora, usuário e detalhe: apadrinhar, desfazer apadrinhamento, registrar e desfazer entrega, cadastro de servidor, alteração do perfil (somente os nomes dos campos alterados, nunca os valores) e as ações do administrador sobre terceirizados e servidores.
- **Minha atividade** (menu): cada usuário vê o próprio histórico.
- **Painel > Registro de atividades**: log de todos os usuários, com busca, filtro por ação e período e CSV. Exige a permissão **Registro** (o administrador principal já tem; marque-a para os demais em Administradores).
- Os registros não podem ser editados nem apagados por ninguém. Republique `firestore.rules`.

## 13. Motivo obrigatório
Ao **desfazer um apadrinhamento** ou **desfazer uma entrega** (pelo padrinho ou pelo administrador), o sistema abre uma janela pedindo o motivo, obrigatório. O motivo aparece no detalhe do log de atividades ("... Motivo: ..."). Não há mudança nas regras do Firestore.

## 14. Mensagem padrão, cartão colorido e QR Code
- **Mensagem de Natal padrão:** ao apadrinhar (e em Meus afilhados, quando a mensagem estiver vazia) o campo já vem preenchido com uma mensagem acolhedora, que o padrinho edita à vontade; o botão "Usar mensagem padrão" restaura o texto. O administrador pode trocar o texto padrão em Painel > Campanha (use `{nome}` para o primeiro nome do apadrinhado).
- **Cartão para impressão:** formato A5 paisagem, colorido, com pisca-pisca, ramos de pinheiro com enfeites e moldura. Na janela de impressão ative "Gráficos de segundo plano" se as cores não saírem. O e-mail também usa um cartão colorido.
- **QR Code:** Painel > QR Code gera o QR do site e o do cadastro de servidor (usa um "link aberto"), com copiar link, baixar PNG e imprimir cartaz A4. A biblioteca de QR (MIT) está embutida no `index.html`; não há dependência externa. Apenas o `index.html` precisa ser enviado ao GitHub.

## Segurança
- A `apiKey` do Firebase é pública por natureza; quem protege os dados são as regras do Firestore.
- Telefone e e-mail dos terceirizados ficam em coleção separada, legível só pelo administrador.
- Em Google Cloud > Credenciais, restrinja a apiKey ao domínio `martinswillians.github.io/*`.
