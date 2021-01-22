<template>
  <b-container fluid="md" class="about">
    <!-- Mensagens de erro -->
    <Alert :display="error.status" :message="error.message" />
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
            <b-button variant="link" @click="abrirEdicaoEndereco(item)">
              <b-icon icon="pencil-fill" />
            </b-button>
            <!-- Botão para excluir o endereço -->
            <b-button variant="link" @click="deletarEndereco(item)">
              <b-icon icon="trash" />
            </b-button>
          </b-button-group>
        </b-button-toolbar>
        <!-- Começo do Modal de Edição -->
        <Modal
          :id="'editar-' + formatarCEP(item.cep)"
          :title="item.cep + ' - Editar'"
          :isShow.sync="isShow"
        >
          <template v-slot:body>
            <form>
              <b-row align-v="center">
                <b-col md="4">
                  <b-form-group label="CEP" label-for="cep" class="input-label">
                    <b-form-input
                      id="cep"
                      v-model="item.cep"
                      placeholder="00.000-000"
                      v-mask="'XX.XXX-XXX'"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Logradouro"
                    label-for="cep"
                    class="input-label"
                  >
                    <b-form-input
                      id="logradouro"
                      v-model="item.logradouro"
                      placeholder="Passagem Dias"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    label="Nº"
                    label-for="numero"
                    class="input-label"
                  >
                    <b-form-input
                      id="numero"
                      v-model="item.numero"
                      placeholder="22"
                      class="rounded-0"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group
                    label="Complemento"
                    label-for="complemento"
                    class="input-label"
                  >
                    <b-form-input
                      id="complemento"
                      v-model="item.complemento"
                      placeholder="Ao lado da padaria"
                      class="rounded-0"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    label="Cidade"
                    label-for="cidade"
                    class="input-label"
                  >
                    <b-form-input
                      id="cidade"
                      v-model="item.cidade"
                      placeholder="Belém"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    label="Estado"
                    label-for="estado"
                    class="input-label"
                  >
                    <b-form-input
                      id="estado"
                      v-model="item.estado"
                      placeholder="PA"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    block
                    class="rounded-0"
                    variant="light"
                    @click="editarEndereco(item)"
                    >Atualizar endereço</b-button
                  >
                </b-col>
              </b-row>
            </form>
          </template>
        </Modal>
        <!-- Final do Modal de Edição -->
      </template>
      <!-- Fim da personalização do campo Opções -->
    </b-table>
    <!-- Fim da tabela de enderecos -->
  </b-container>
</template>
<script>
import Modal from "../components/Modal.vue";
import Alert from "../components/Alert.vue"
export default {
  name: "Enderecos",
  components: { Modal, Alert },
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
      ],
      isShow: false,
      error: {
        status: false,
        message: ""
      }
    };
  },
  methods: {
    formatarCEP(cep) {
      return cep.replace(".", "").replace("-", "");
    },
    editarEndereco(paraEditar) {
      try {
        for (let i = 0; i < this.enderecos.length; i++) {
          const address = this.enderecos[i];
          if (address.cep === paraEditar.cep) {
            this.enderecos[i] = paraEditar;
          }
        }
        localStorage.setItem("addresses", JSON.stringify(this.enderecos));
        this.$bvModal.hide("editar-" + this.formatarCEP(paraEditar.cep));
      } catch (e) {
        this.error.status = true;
        this.error.message = e.message;
      }
    },
    abrirEdicaoEndereco(paraAbrir) {
      this.$bvModal.show("editar-" + this.formatarCEP(paraAbrir.cep));
    },
    deletarEndereco(paraDeletar) {
      try {
        for (let i = 0; i < this.enderecos.length; i++) {
          const address = this.enderecos[i];
          if (address === paraDeletar) {
            this.enderecos.splice(i, 1);
          }
        }
        localStorage.setItem("addresses", JSON.stringify(this.enderecos));
      } catch (e) {
        this.error.status = true;
        this.error.message = e.message;
      }
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
