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
            <b-button variant="link" @click="confirmacaoDeletarEndereco(item)">
              <b-icon icon="trash" />
            </b-button>
          </b-button-group>
        </b-button-toolbar>
        <!-- Começo do Modal de Edição -->
        <Modal
          :id="'editar-' + formatarCEP(item.cep) + '-' + item.numero"
          :title="item.cep + ' - Editar'"
        >
          <template v-slot:body>
            <form>
              <b-row align-v="center">
                <b-col md="4">
                  <b-form-group
                    label="CEP"
                    label-for="editar-cep"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-cep"
                      v-model="item.cep"
                      placeholder="00.000-000"
                      v-mask="'##.###-###'"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Logradouro"
                    label-for="editar-logradouro"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-logradouro"
                      v-model="item.logradouro"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    label="Nº"
                    label-for="editar-numero"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-numero"
                      v-model="item.numero"
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
                    label-for="editar-complemento"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-complemento"
                      v-model="item.complemento"
                      placeholder="Ao lado da padaria"
                      class="rounded-0"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    label="Cidade"
                    label-for="editar-cidade"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-cidade"
                      v-model="item.cidade"
                      class="rounded-0"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    label="Estado"
                    label-for="editar-estado"
                    class="input-label"
                  >
                    <b-form-input
                      id="editar-estado"
                      v-model="item.estado"
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
        <!-- Começo do Modal de Exclusão de item -->
        <Modal
          :id="'deletar-' + formatarCEP(item.cep) + '-' + item.numero"
          title="Excluir endereço"
          size="sm"
        >
          <template v-slot:body>
            <p>Tem certeza que deseja excluir este endereço?</p>
            <b-button
              block
              class="rounded-0"
              variant="danger"
              @click="deletarEndereco(item)"
              >Deletar</b-button
            >
          </template>
        </Modal>
        <!-- Final do Modal de Exclusão de item -->
      </template>
      <!-- Fim da personalização do campo Opções -->
    </b-table>
    <!-- Começo do Modal de Exclusão de todos os endereços -->
    <Modal id="deletar-todos" title="Excluir todos os endereços" size="md">
      <template v-slot:body>
        <p>Tem certeza que deseja excluir todos os endereços cadastrados?</p>
        <b-button
          block
          class="rounded-0"
          variant="danger"
          @click="apagarTodos()"
          >Deletar</b-button
        >
      </template>
    </Modal>
    <!-- Final do Modal de Exclusão de todos os endereços -->
    <!-- Fim da tabela de enderecos -->
    <b-button
      class="rounded-0"
      variant="danger"
      @click="confirmacaoApagarTodos()"
      >Apagar todos</b-button
    >
  </b-container>
</template>
<script>
import Modal from "../components/Modal.vue";
import Alert from "../components/Alert.vue";
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
      } catch (e) {
        this.error.status = true;
        this.error.message = e.message;
      }
      this.$bvModal.hide(
        "editar-" + this.formatarCEP(paraEditar.cep) + "-" + paraEditar.numero
      );
    },
    abrirEdicaoEndereco(paraAbrir) {
      this.$bvModal.show(
        "editar-" + this.formatarCEP(paraAbrir.cep) + "-" + paraAbrir.numero
      );
    },
    confirmacaoDeletarEndereco(paraDeletar) {
      this.$bvModal.show(
        "deletar-" +
          this.formatarCEP(paraDeletar.cep) +
          "-" +
          paraDeletar.numero
      );
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
      this.$bvModal.hide(
        "deletar-" +
          this.formatarCEP(paraDeletar.cep) +
          "-" +
          paraDeletar.numero
      );
    },
    confirmacaoApagarTodos() {
      this.$bvModal.show("deletar-todos");
    },
    apagarTodos() {
      localStorage.setItem("addresses", JSON.stringify([]));
      this.enderecos = JSON.parse(localStorage.getItem("addresses"));
      this.$bvModal.hide("deletar-todos");
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
