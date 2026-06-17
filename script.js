let clientes = [];
let animais = [];
let veterinarios = [];
let consultas = [];
let vacinas = [];

let nextIdCliente = 1, nextIdAnimal = 1, nextIdVeterinario = 1, nextIdConsulta = 1, nextIdVacina = 1;

function seedData() {
    clientes = [
        { id: nextIdCliente++, name: "Ana Souza", cpf: "123.456.789-00", telephone: "(11) 91234-5678", endereco: "Rua das Flores, 123", email: "ana@email.com" },
        { id: nextIdCliente++, name: "Carlos Mendes", cpf: "987.654.321-00", telephone: "(21) 99876-5432", endereco: "Av. Principal, 456", email: "carlos@vet.com" }
    ];
    animais = [
        { id: nextIdAnimal++, name: "Rex", especie: "Cachorro", idade: "3 anos", clienteId: 1 },
        { id: nextIdAnimal++, name: "Mia", especie: "Gato", idade: "2 anos", clienteId: 2 },
        { id: nextIdAnimal++, name: "Luna", especie: "Cachorro", idade: "5 anos", clienteId: 1 }
    ];
    veterinarios = [
        { id: nextIdVeterinario++, name: "Dra. Juliana Alves", crmv: "CRMV-12345", especialidade: "Clínica Geral" },
        { id: nextIdVeterinario++, name: "Dr. Ricardo Lima", crmv: "CRMV-67890", especialidade: "Cirurgia" }
    ];
    consultas = [
        { id: nextIdConsulta++, data: "2025-02-10", motivo: "Check-up anual", animalId: 1, veterinarioId: 1 },
        { id: nextIdConsulta++, data: "2025-02-15", motivo: "Vacinação", animalId: 2, veterinarioId: 2 }
    ];
    vacinas = [
        { id: nextIdVacina++, nomeVacina: "V8", dataAplicacao: "2025-01-20", animalId: 1 },
        { id: nextIdVacina++, nomeVacina: "Antirrábica", dataAplicacao: "2025-02-01", animalId: 2 }
    ];
}

function getClienteNome(id) { let c = clientes.find(c => c.id === id); return c ? c.name : "Cliente removido"; }
function getAnimalNome(id) { let a = animais.find(a => a.id === id); return a ? a.name : "Animal removido"; }
function getVeterinarioNome(id) { let v = veterinarios.find(v => v.id === id); return v ? v.name : "Vet removido"; }

function renderAll() {
    renderClientes();
    renderAnimais();
    renderVeterinarios();
    renderConsultas();
    renderVacinas();
    updateStats();
}

function renderClientes() {
    const container = document.getElementById('listaClientes');
    if (!container) return;
    if (clientes.length === 0) {
        container.innerHTML = '<div class="empty-msg">Nenhum cliente cadastrado</div>';
        return;
    }
    container.innerHTML = clientes.map(cli => `
        <div class="list-item">
            <div class="item-info">
                <strong>${escapeHtml(cli.name)}</strong><br>
                Telefone: ${escapeHtml(cli.telephone)} | CPF: ${escapeHtml(cli.cpf)}
                <div style="font-size:0.7rem; color:#5e7e97;">${escapeHtml(cli.email)}</div>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editCliente(${cli.id})">Editar</button>
                <button class="delete-btn" onclick="deleteCliente(${cli.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function renderAnimais() {
    const container = document.getElementById('listaAnimais');
    if (!container) return;
    if (animais.length === 0) { container.innerHTML = '<div class="empty-msg">Nenhum animal cadastrado</div>'; return; }
    container.innerHTML = animais.map(anim => {
        const dono = getClienteNome(anim.clienteId);
        return `<div class="list-item">
            <div class="item-info">
                <strong>${escapeHtml(anim.name)}</strong> (${escapeHtml(anim.especie)}) - ${escapeHtml(anim.idade)}<br>
                Dono: ${escapeHtml(dono)}
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editAnimal(${anim.id})">Editar</button>
                <button class="delete-btn" onclick="deleteAnimal(${anim.id})">Excluir</button>
            </div>
        </div>`;
    }).join('');
}

function renderVeterinarios() {
    const container = document.getElementById('listaVeterinarios');
    if (!container) return;
    if (veterinarios.length === 0) { container.innerHTML = '<div class="empty-msg">Nenhum veterinário cadastrado</div>'; return; }
    container.innerHTML = veterinarios.map(vet => `
        <div class="list-item">
            <div class="item-info">
                <strong>${escapeHtml(vet.name)}</strong> - ${escapeHtml(vet.especialidade)}<br>
                CRMV: ${escapeHtml(vet.crmv)}
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editVeterinario(${vet.id})">Editar</button>
                <button class="delete-btn" onclick="deleteVeterinario(${vet.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function renderConsultas() {
    const container = document.getElementById('listaConsultas');
    if (!container) return;
    if (consultas.length === 0) { container.innerHTML = '<div class="empty-msg">Nenhuma consulta agendada</div>'; return; }
    container.innerHTML = consultas.map(cons => {
        const animalNome = getAnimalNome(cons.animalId);
        const vetNome = getVeterinarioNome(cons.veterinarioId);
        return `<div class="list-item">
            <div class="item-info">
                <strong>${escapeHtml(cons.data)}</strong> - ${escapeHtml(cons.motivo)}<br>
                Animal: ${escapeHtml(animalNome)} | Vet: ${escapeHtml(vetNome)}
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editConsulta(${cons.id})">Editar</button>
                <button class="delete-btn" onclick="deleteConsulta(${cons.id})">Excluir</button>
            </div>
        </div>`;
    }).join('');
}

function renderVacinas() {
    const container = document.getElementById('listaVacinas');
    if (!container) return;
    if (vacinas.length === 0) { container.innerHTML = '<div class="empty-msg">Nenhuma vacina registrada</div>'; return; }
    container.innerHTML = vacinas.map(vac => {
        const animalNome = getAnimalNome(vac.animalId);
        return `<div class="list-item">
            <div class="item-info">
                <strong>${escapeHtml(vac.nomeVacina)}</strong> - Aplicada em: ${escapeHtml(vac.dataAplicacao)}<br>
                ${escapeHtml(animalNome)}
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editVacina(${vac.id})">Editar</button>
                <button class="delete-btn" onclick="deleteVacina(${vac.id})">Excluir</button>
            </div>
        </div>`;
    }).join('');
}

function updateStats() {
    const statsDiv = document.getElementById('globalStats');
    if(statsDiv) statsDiv.innerHTML = `${animais.length} animais | ${clientes.length} clientes | ${consultas.length} consultas | ${vacinas.length} vacinas`;
}

function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

let currentModalType = null;
let editId = null;

function openModal(type, id = null) {
    currentModalType = type;
    editId = id;
    const modalTitle = document.getElementById('modalTitle');
    const modalFields = document.getElementById('modalFields');
    modalFields.innerHTML = '';
    if (type === 'cliente') {
        modalTitle.innerText = editId ? 'Editar Cliente' : 'Novo Cliente';
        modalFields.innerHTML = `
            <label>Nome completo</label><input type="text" id="cliName" placeholder="Nome" value="${editId ? getClienteById(editId).name : ''}">
            <label>CPF</label><input type="text" id="cliCpf" placeholder="000.000.000-00" value="${editId ? getClienteById(editId).cpf : ''}">
            <label>Telefone</label><input type="text" id="cliTel" placeholder="(11) 99999-9999" value="${editId ? getClienteById(editId).telephone : ''}">
            <label>Endereço</label><input type="text" id="cliEnd" placeholder="Rua, número" value="${editId ? getClienteById(editId).endereco : ''}">
            <label>Email</label><input type="email" id="cliEmail" placeholder="email@exemplo.com" value="${editId ? getClienteById(editId).email : ''}">
        `;
    } else if (type === 'animal') {
        modalTitle.innerText = editId ? 'Editar Animal' : 'Novo Animal';
        const optionsCli = clientes.map(c => `<option value="${c.id}" ${(editId && getAnimalById(editId).clienteId === c.id) ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('');
        const animalData = editId ? getAnimalById(editId) : null;
        modalFields.innerHTML = `
            <label>Nome do Animal</label><input type="text" id="aniName" value="${editId ? animalData.name : ''}">
            <label>Espécie</label><input type="text" id="aniEspecie" placeholder="Cachorro, Gato..." value="${editId ? animalData.especie : ''}">
            <label>Idade</label><input type="text" id="aniIdade" placeholder="3 anos, 6 meses" value="${editId ? animalData.idade : ''}">
            <label>Dono (Cliente)</label><select id="aniClienteId">${optionsCli || '<option>--cadastre clientes--</option>'}</select>
        `;
    } else if (type === 'veterinario') {
        modalTitle.innerText = editId ? 'Editar Veterinário' : 'Novo Veterinário';
        const vetData = editId ? getVeterinarioById(editId) : null;
        modalFields.innerHTML = `
            <label>Nome</label><input type="text" id="vetName" value="${editId ? vetData.name : ''}">
            <label>CRMV</label><input type="text" id="vetCrmv" value="${editId ? vetData.crmv : ''}">
            <label>Especialidade</label><input type="text" id="vetEspecialidade" value="${editId ? vetData.especialidade : ''}">
        `;
    } else if (type === 'consulta') {
        modalTitle.innerText = editId ? 'Editar Consulta' : 'Nova Consulta';
        const consultaData = editId ? getConsultaById(editId) : null;
        const animalOptions = animais.map(a => `<option value="${a.id}" ${(editId && consultaData.animalId === a.id) ? 'selected' : ''}>${escapeHtml(a.name)}</option>`).join('');
        const vetOptions = veterinarios.map(v => `<option value="${v.id}" ${(editId && consultaData.veterinarioId === v.id) ? 'selected' : ''}>${escapeHtml(v.name)}</option>`).join('');
        modalFields.innerHTML = `
            <label>Data</label><input type="date" id="consData" value="${editId ? consultaData.data : ''}">
            <label>Motivo</label><input type="text" id="consMotivo" value="${editId ? consultaData.motivo : ''}">
            <label>Animal</label><select id="consAnimalId">${animalOptions || '<option>--cadastre animais--</option>'}</select>
            <label>Veterinário</label><select id="consVetId">${vetOptions || '<option>--cadastre veterinários--</option>'}</select>
        `;
    } else if (type === 'vacina') {
        modalTitle.innerText = editId ? 'Editar Vacina' : 'Registrar Vacina';
        const vacinaData = editId ? getVacinaById(editId) : null;
        const animalOptions = animais.map(a => `<option value="${a.id}" ${(editId && vacinaData.animalId === a.id) ? 'selected' : ''}>${escapeHtml(a.name)}</option>`).join('');
        modalFields.innerHTML = `
            <label>Nome da Vacina</label><input type="text" id="vacNome" value="${editId ? vacinaData.nomeVacina : ''}">
            <label>Data de aplicação</label><input type="date" id="vacData" value="${editId ? vacinaData.dataAplicacao : ''}">
            <label>Animal</label><select id="vacAnimalId">${animalOptions || '<option>--cadastre animais--</option>'}</select>
        `;
    }
    document.getElementById('modalOverlay').classList.add('active');
    const saveBtn = document.getElementById('saveModalBtn');
    saveBtn.onclick = () => saveEntity();
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); editId = null; currentModalType = null; }

function saveEntity() {
    if (currentModalType === 'cliente') {
        const name = document.getElementById('cliName').value.trim();
        if(!name) return alert("Nome obrigatório");
        const cli = { name, cpf: document.getElementById('cliCpf').value, telephone: document.getElementById('cliTel').value, endereco: document.getElementById('cliEnd').value, email: document.getElementById('cliEmail').value };
        if(editId) {
            const index = clientes.findIndex(c=>c.id===editId);
            if(index!==-1) clientes[index] = {...clientes[index], ...cli};
        } else {
            cli.id = nextIdCliente++; clientes.push(cli);
        }
    } else if (currentModalType === 'animal') {
        const name = document.getElementById('aniName').value.trim();
        if(!name) return alert("Nome do animal obrigatório");
        const especie = document.getElementById('aniEspecie').value;
        const idade = document.getElementById('aniIdade').value;
        const clienteId = parseInt(document.getElementById('aniClienteId').value);
        if(!clienteId && clientes.length>0) return alert("Selecione um dono válido");
        const animalData = { name, especie, idade, clienteId };
        if(editId){
            const idx = animais.findIndex(a=>a.id===editId);
            if(idx!==-1) animais[idx] = {...animais[idx], ...animalData};
        } else {
            animalData.id = nextIdAnimal++; animais.push(animalData);
        }
    } else if (currentModalType === 'veterinario') {
        const name = document.getElementById('vetName').value.trim();
        if(!name) return alert("Nome do veterinário obrigatório");
        const vet = { name, crmv: document.getElementById('vetCrmv').value, especialidade: document.getElementById('vetEspecialidade').value };
        if(editId){
            const idx = veterinarios.findIndex(v=>v.id===editId);
            if(idx!==-1) veterinarios[idx] = {...veterinarios[idx], ...vet};
        } else { vet.id = nextIdVeterinario++; veterinarios.push(vet); }
    } else if (currentModalType === 'consulta') {
        const data = document.getElementById('consData').value;
        const motivo = document.getElementById('consMotivo').value;
        const animalId = parseInt(document.getElementById('consAnimalId').value);
        const veterinarioId = parseInt(document.getElementById('consVetId').value);
        if(!animalId || !veterinarioId) return alert("Selecione animal e veterinário");
        const consulta = { data, motivo, animalId, veterinarioId };
        if(editId){
            const idx = consultas.findIndex(c=>c.id===editId);
            if(idx!==-1) consultas[idx] = {...consultas[idx], ...consulta};
        } else { consulta.id = nextIdConsulta++; consultas.push(consulta); }
    } else if (currentModalType === 'vacina') {
        const nomeVacina = document.getElementById('vacNome').value.trim();
        const dataAplicacao = document.getElementById('vacData').value;
        const animalId = parseInt(document.getElementById('vacAnimalId').value);
        if(!nomeVacina) return alert("Nome da vacina obrigatório");
        if(!animalId) return alert("Animal necessário");
        const vac = { nomeVacina, dataAplicacao, animalId };
        if(editId){
            const idx = vacinas.findIndex(v=>v.id===editId);
            if(idx!==-1) vacinas[idx] = {...vacinas[idx], ...vac};
        } else { vac.id = nextIdVacina++; vacinas.push(vac); }
    }
    closeModal();
    renderAll();
}

function getClienteById(id){ return clientes.find(c=>c.id===id); }
function getAnimalById(id){ return animais.find(a=>a.id===id); }
function getVeterinarioById(id){ return veterinarios.find(v=>v.id===id); }
function getConsultaById(id){ return consultas.find(c=>c.id===id); }
function getVacinaById(id){ return vacinas.find(v=>v.id===id); }

function deleteCliente(id){
    if(animais.some(a=>a.clienteId===id)) return alert("Não é possível excluir cliente que possui animais. Remova os animais primeiro.");
    clientes = clientes.filter(c=>c.id!==id); renderAll();
}
function deleteAnimal(id){
    if(consultas.some(c=>c.animalId===id) || vacinas.some(v=>v.animalId===id)) return alert("Animal possui consultas ou vacinas, remova esses registros primeiro.");
    animais = animais.filter(a=>a.id!==id); renderAll();
}
function deleteVeterinario(id){
    if(consultas.some(c=>c.veterinarioId===id)) return alert("Veterinário possui consultas registradas.");
    veterinarios = veterinarios.filter(v=>v.id!==id); renderAll();
}
function deleteConsulta(id){ consultas = consultas.filter(c=>c.id!==id); renderAll(); }
function deleteVacina(id){ vacinas = vacinas.filter(v=>v.id!==id); renderAll(); }

function editCliente(id){ openModal('cliente', id); }
function editAnimal(id){ openModal('animal', id); }
function editVeterinario(id){ openModal('veterinario', id); }
function editConsulta(id){ openModal('consulta', id); }
function editVacina(id){ openModal('vacina', id); }

seedData();
renderAll();
