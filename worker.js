// Cloudflare Worker: envia e-mails de Natal aos afilhados (somente o administrador).
// Variáveis (Settings > Variables and Secrets) do Worker:
//   FIREBASE_API_KEY  (texto)   a apiKey do app web Firebase
//   ADMIN_EMAIL       (texto)   willbrasilia@gmail.com (administrador principal)
//   FIREBASE_PROJECT_ID (texto) padrinhosdataprev
//   ALLOWED_ORIGIN    (texto)   https://martinswillians.github.io
//   FROM_EMAIL        (texto)   ex.: "Padrinhos Dataprev <natal@seudominio.com.br>"
//   RESEND_API_KEY    (secret)  chave da conta em resend.com
export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return json({ ok: true, service: "padrinhos-dataprev" });

    let body;
    try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }
    const { idToken, to, subject, html } = body;
    if (!idToken || !to || !subject || !html) return json({ error: "Campos obrigatórios ausentes" }, 400);

    // Confirma no Firebase que o token pertence ao administrador
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const u = (await r.json()).users?.[0];
    if (!u || !u.emailVerified) return json({ error: "Não autorizado" }, 403);
    if (u.email !== env.ADMIN_EMAIL) {
      // Outros administradores: precisam da permissão "entregas" (regras do Firestore valem para o token do usuário)
      const d = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/admins/${encodeURIComponent(u.email.toLowerCase())}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const perms = d.ok ? (await d.json()).fields?.perms?.mapValue?.fields : null;
      if (!perms?.entregas?.booleanValue) return json({ error: "Sem permissão" }, 403);
    }

    const s = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.FROM_EMAIL, to: [to], subject, html }),
    });
    return json(await s.json(), s.status);
  },
};
