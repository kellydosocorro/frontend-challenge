<template>
  <b-container fluid="md" class="about">
    <!-- <h1>This is an about page</h1> -->
    <b-table striped hover :items="enderecos" :fields="fields" show-empty>
      <template #empty>
        <h6>Não há endereços cadastrados para exibição</h6>
      </template>
      <template v-slot:cell(opcoes)="{ item }">
        <b-button-toolbar :aria-label="'Opções para o cep ' + item.cep">
          <b-button-group size="sm" class="options-toolbar">
            <b-button variant="link" @click="editarEndereco(item)">
              <b-icon icon="pencil-fill" />
            </b-button>
            <b-button variant="link" @click="deletarEndereco(item)">
              <b-icon icon="trash" />
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </template>
    </b-table>
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
