<template>
  <b-container class="home" fluid="md">
    <!-- Mensagens de erro -->
    <Alert :display="error.status" :message="error.message" />
    <!-- Começo do corpo da página principal -->
    <b-row align-v="center" align-h="center">
      <!-- Área do Banner -->
      <b-col class="banner">
        <figure class="main-banner">
          <img src="../assets/images/3929712.jpg" width="500" />
          <!-- Legenda do Banner -->
          <figcaption>
            <a href="https://www.freepik.com/vectors/travel" target="_blank"
              >Illustration created by stories - www.freepik.com</a
            >
          </figcaption>
        </figure>
      </b-col>
      <!-- Fim da área do banner -->
      <!-- Área do formulário -->
      <b-col md="6">
        <!-- Começo do formulário de cadastro -->
        <b-form id="addAddress" @submit="saveAddredss">
          <!-- Início da 1ª Linha do formulário -->
          <b-row align-v="center">
            <!-- InputGroup do CEP -->
            <b-col md="4">
              <b-form-group label="CEP" label-for="cep" class="input-label">
                <!-- Input do CEP -->
                <b-form-input
                  id="cep"
                  v-model="address.cep"
                  placeholder="00.000-000"
                  v-mask="'XX.XXX-XXX'"
                  class="rounded-0"
                  :state="address.cep.length === 10 && !cepReturnErro()"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- InputGroup do Logradouro -->
            <b-col>
              <b-form-group
                label="Logradouro"
                label-for="cep"
                class="input-label"
              >
                <!-- Input do Logradouro -->
                <b-form-input
                  id="logradouro"
                  :disabled="disabledLogradouro()"
                  v-model="address.logradouro"
                  placeholder="Passagem Dias"
                  class="rounded-0"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- InputGroup do Número -->
            <b-col md="2">
              <b-form-group label="Nº" label-for="numero" class="input-label">
                <!-- Input do Número -->
                <b-form-input
                  id="numero"
                  v-model="address.numero"
                  placeholder="22"
                  class="rounded-0"
                  :state="
                    address.cep.length === 10 && address.numero.length > 0
                  "
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Final da 1ª Linha do formulário -->
          <!-- Início da 2ª Linha do formulário -->
          <b-row>
            <!-- InputGroup do Complemento -->
            <b-col md="6">
              <b-form-group
                label="Complemento"
                label-for="complemento"
                class="input-label"
              >
                <!-- Input do Complemento -->
                <b-form-input
                  id="complemento"
                  v-model="address.complemento"
                  placeholder="Ao lado da padaria"
                  class="rounded-0"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- InputGroup da Cidade -->
            <b-col md="4">
              <b-form-group
                label="Cidade"
                label-for="cidade"
                class="input-label"
              >
                <!-- Input da Cidade -->
                <b-form-input
                  id="cidade"
                  disabled
                  v-model="address.cidade"
                  placeholder="Belém"
                  class="rounded-0"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- InputGroup do Estado -->
            <b-col md="2">
              <b-form-group
                label="Estado"
                label-for="estado"
                class="input-label"
              >
                <!-- Input do Estado -->
                <b-form-input
                  id="estado"
                  disabled
                  v-model="address.estado"
                  placeholder="PA"
                  class="rounded-0"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Final da 2ª linha do formulário -->
          <!-- Área do botão de cadastro -->
          <b-row>
            <b-button
              block
              class="rounded-0"
              variant="light"
              type="submit"
              :disabled="cepReturnErro()"
              :title="cepReturnErro() ? 'Digite um CEP e número' : ''"
              >Cadastrar endereço</b-button
            >
          </b-row>
        </b-form>
        <!-- Fim do formulário -->
      </b-col>
      <!-- Fim da área do formulário -->
    </b-row>
  </b-container>
</template>

<script>
import Alert from "@/components/Alert.vue";
export default {
  name: "Home",
  components: { Alert },
  data() {
    return {
      address: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: ""
      },
      addresses: [],
      address_by_cep: {},
      error: {
        message: "CEP inválido, por favor, insira um CEP válido. ",
        status: false
      }
    };
  },
  methods: {
    disableSubmit() {
      if (this.cepReturnErro()) {
        return true;
      } else {
        return true;
      }
    },
    cepReturnErro() {
      if ("erro" in this.address_by_cep) {
        if (this.address_by_cep.erro) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    saveAddredss(event) {
      event.preventDefault();
      try {
        this.addresses = JSON.parse(localStorage.getItem("addresses"));
        let existe = this.addresses.some(endereco => {
          return (
            endereco.cep === this.address.cep &&
            endereco.numero === this.address.numero
          );
        });
        if (!existe) {
          this.addresses.push(this.address);
          localStorage.setItem("addresses", JSON.stringify(this.addresses));
          this.$router.push("/enderecos");
        } else {
          this.error.status = true;
          this.error.message = "Este endereço já está cadastrado no sistema.";
        }
      } catch (e) {
        this.error.status = true;
        this.error.message =
          "Ops, parece que ocorreu um erro ao processar esta operação. Por favor, tente novamente.";
      }
    },
    disabledLogradouro() {
      let sizeCep = this.address.cep.length;
      let lastNumbers = this.address.cep.substring(sizeCep - 3);
      if (lastNumbers !== "000") {
        return true;
      } else {
        return false;
      }
    },
    clearAll() {
      this.address.cep = "";
      this.address.logradouro = "";
      this.address.numero = "";
      this.address.complemento = "";
      this.address.cidade = "";
      this.address.estado = "";
    }
  },
  watch: {
    "address.cep": async function() {
      this.error.status = false;
      if (this.address.cep.length === 0) {
        this.clearAll();
      }
      if (this.address.cep.length === 10) {
        let cep = this.address.cep.replace("-", "");
        cep = cep.replace(".", "");
        await this.$axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => {
            this.address_by_cep = response.data;
            console.log(this.address_by_cep);
            if ("cep" in this.address_by_cep) {
              this.error.status = false;
              this.address.estado = this.address_by_cep.uf;
              this.address.logradouro = this.address_by_cep.logradouro;
              this.address.cidade = this.address_by_cep.localidade;
              this.address.complemento = this.address_by_cep.complemento;
            } else {
              this.error.status = true;
            }
          })
          .catch(() => {
            this.error.status = true;
            this.error.message =
              "Ops, parece que ocorreu um erro ao processar esta operação. Por favor, tente novamente.";
          });
      }
    }
  }
};
</script>
<style scoped>
.main-banner {
  text-align: center;
}
.main-banner figcaption {
  text-align: center;
}
.main-banner figcaption a {
  font-size: 0.65rem;
  color: #b5b5b5;
}
.home {
  text-align: left;
}
#addAddress button {
  margin-top: 10px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 10px 0 !important;
  letter-spacing: 1px;
}
#addAddress input {
  border: 0px;
  border-bottom: 2px solid #ccc;
  padding: 7px 3px;
}
#addAddress .input-label {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.85rem;
}
*:focus {
  outline: none;
}
#addAddress input:-webkit-autofill,
#addAddress input:-webkit-autofill:hover,
#addAddress input:-webkit-autofill:focus,
#addAddress input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
