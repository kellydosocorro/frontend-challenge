<template>
  <b-container class="home" fluid="md">
    <Alert :display="error.status" :message="error.message" />
    <b-form id="addAddress">
      <b-row align-v="center" fluid="md">
        <b-col class="banner">
          <!-- <img src="../assets/images/3929712.jpg" width="500" /> -->
        </b-col>
        <b-col>
          <b-row align-v="center">
            <b-col md="4">
              <b-form-group label="CEP" label-for="cep" class="input-label">
                <b-form-input
                  id="cep"
                  v-model="address.cep"
                  placeholder="00.000-000"
                  v-mask="'XX.XXX-XXX'"
                  class="rounded-0"
                  required
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
                  :disabled="disabledLogradouro()"
                  v-model="address.logradouro"
                  placeholder="Passagem Dias"
                  class="rounded-0"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group label="Nº" label-for="numero" class="input-label">
                <b-form-input
                  id="numero"
                  v-model="address.numero"
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
                  v-model="address.complemento"
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
                  disabled
                  v-model="address.cidade"
                  placeholder="Belém"
                  class="rounded-0"
                  required
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
                  disabled
                  v-model="address.estado"
                  placeholder="PA"
                  class="rounded-0"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-button
              block
              class="rounded-0"
              variant="light"
              @click="saveAddredss()"
              >Cadastrar endereço</b-button
            >
          </b-row>
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Alert from "@/components/Alert.vue"
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
        message: 'CEP inválido, por favor, insira um CEP válido. ',
        status: false
      }
    };
  },
  methods: {
    saveAddredss() {
      this.addresses.push(this.address);
      localStorage.setItem("addresses", JSON.stringify(this.addresses))
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
    statusCep() {
      if (this.address.cep === "") {
        return true
      } return false;
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
    "address.cep"() {
      this.error.status = false;
      if(this.address.cep.length === 0) {
        this.clearAll();
      }
      if (this.address.cep.length > 7) {
        let cep = this.address.cep.replace("-", "")
        cep = cep.replace(".", "")
        console.log(cep);
        this.$axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          this.address_by_cep = response.data;
          console.log(this.address_by_cep)
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
        });
      }
    }
  }
};
</script>
<style scoped>
@media (max-width: 1024px) {
  .banner {
    display: block;
  }
}
.home {
  text-align: left;
}
.banner {
  height: 50vh;
  background-image: url("../assets/images/3929712.jpg");
  background-repeat: no-repeat;
  background-size: 500px auto;
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
