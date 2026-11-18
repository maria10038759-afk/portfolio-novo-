
// ===================================
// CONEXÃO COM SUPABASE
// ===================================

const SUPABASE_URL = "https://exnddgapeszzsnorbkuc.supabase.co";

const SUPABASE_KEY = "sb_publishable_ZEjo3XUj0SSL1JT7haQ2EQ_Az7cwgOY";

const banco = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ===================================
// LOGIN
// ===================================

const formulario = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

if (formulario) {
    formulario.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        const email = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        mensagem.textContent = "Verificando acesso...";

        const { data, error } = await banco.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            mensagem.textContent = error.message;
            return;
        }

        mensagem.textContent = "Login realizado!";

        window.location.href = "painel.html";
    });
}

// ===================================
// CADASTRO
// ===================================

const botaoCadastro = document.getElementById("botaoCadastro");

if (botaoCadastro) {
    botaoCadastro.addEventListener("click", async function() {

        const email = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            mensagem.textContent = "Digite seu e-mail e sua senha.";
            return;
        }

        if (senha.length < 6) {
            mensagem.textContent = "Use pelo menos 6 caracteres.";
            return;
        }

        mensagem.textContent = "Criando conta...";

        const { data, error } = await banco.auth.signUp({
            email: email,
            password: senha
        });

        if (error) {
            mensagem.textContent = error.message;
            return;
        }

        mensagem.textContent =
            "Conta criada! Confira seu e-mail para confirmar o cadastro.";
    });
}
