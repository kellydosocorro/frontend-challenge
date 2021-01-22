<template>
  <b-container fluid="md" class="about">
    <!-- Começo da tabela de endereços -->
    <b-table striped hover :items="enderecos" :fields="fields" show-empty>
      <!-- Mensagem para exibição quando a tabela está vazia -->
      <template #empty>
        <h6>Não há endereços cadastrados para exibição</h6>
      </template>
      <!-- Personalização do campo Opções -->
      <template v-slot:cell(opcoes)="{ item }">
        <b-button-toolbar :aria-label="'Opções para o cep ' + item.cep">
          <b-button-group size="sm" class="options-toolbar">
            <!-- Botão para editar o endereço -->
            <b-button variant="link" @click="editarEndereco(item)">
              <b-icon icon="pencil-fill" />
            </b-button>
            <!-- Botão para excluir o endereço -->
            <b-button variant="link" @click="deletarEndereco(item)">
              <b-icon icon="trash" />
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </template>
      <!-- Fim da personalização do campo Opções -->
    </b-table>
    <!-- Fim da tabela de enderecos -->
  </b-container>
</template>
<script>
export default {
  name: "Enderecos",
  data() {
    return {
      enderecos: [],
      fields: [
        {
          key: "cep",
          label: "cep".toLocaleUpperCase(),
          sortable: true
        },
        {
          key: "logradouro"
        },
        {
          key: "numero"
        },
        {
          key: "complemento"
        },
        {
          key: "cidade"
        },
        {
          key: "estado"
        },
        {
          key: "opcoes",
          label: "Opções"
        }
      ]
    };
  },
  methods: {
    deletarEndereco(paraDeletar) {
      for (let i = 0; i < this.enderecos.length; i++) {
        const address = this.enderecos[i];
        if (address === paraDeletar) {
          this.enderecos.splice(i, 1);
        }
      }
      localStorage.setItem("addresses", JSON.stringify(this.enderecos));
    }
  },
  created() {
    this.enderecos = JSON.parse(localStorage.getItem("addresses"));
  }
};
</script>
<style scoped>
.options-toolbar button {
  color: #444;
}
.options-toolbar button:hover {
  color: #777;
}
</style>
