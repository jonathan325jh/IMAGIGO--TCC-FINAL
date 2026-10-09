async function salvarPersonagem() {
    btnSalvar.disabled = true;

    try {
        const { data, error } = await supabaseClient
            .from('usuarios')
            .update({
                nome_personagem: inputNome.value,
                cor_1: picker1.value,
                cor_2: picker2.value,
                pronome: selPronome.value,
                estampa: selEstampa.value,
                roupa: selRoupa.value,
                chapeu: selChapeu.value,
                animacao_fundo: selAnimacao.value,
                personagem_criado: 1
            })
            .eq('email', emailSalvo)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            alert('Atenção: Nenhum registro foi atualizado. Verifique se o e-mail cadastrado no localStorage é idêntico ao do banco.');
            btnSalvar.disabled = false;
            return;
        }

        window.location.href = 'pagina-entrada.html';
    } catch (err) {
        alert('Erro ao salvar no banco de dados: ' + err.message);
        console.error(err);
        btnSalvar.disabled = false;
    }
}