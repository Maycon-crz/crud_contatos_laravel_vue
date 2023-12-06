<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">

                <div class="alert alert-danger mt-4" v-if="errors.length">
                    <ul class="mb-0">
                        <li v-for="(error, index) in errors" :key="index">
                            {{ error }}
                        </li>
                    </ul>
                </div>

                <form @submit.prevent="updateContact" novalidate>
                    <fieldset>
                        <div class="form-group">
                            <label for="form-label mt-4">Nome</label>
                            <input type="text" class="form-control" v-model="contact.name"
                            placeholder="Digite seu Nome">
                        </div>
                        <div class="form-group">
                            <label for="form-label mt-4">E-mail</label>
                            <input type="email" class="form-control" v-model="contact.email"
                            placeholder="Digite seu E-mail">
                        </div>
                        <div class="form-group">
                            <label for="form-label mt-4">Designação</label>
                            <input type="text" class="form-control" v-model="contact.designation"
                            placeholder="Digite sua Designação">
                        </div>
                        <div class="form-group">
                            <label for="form-label mt-4">Contato</label>
                            <input type="text" class="form-control" v-model="contact.contact_no"
                            v-mask="'(##) #####-####'" placeholder="Digite o Contato">
                        </div>

                        <button class="btn btn-primary mt-4">Editar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        name: 'EditContact',
        data(){
            return{
                contact: {},
                name: '',
                email:'',
                designation: '',
                contact_no: '',
                errors: []
            }
        },
        created(){
            this.getContactById();
        },
        methods:{
            async getContactById(){
                let url = `http://127.0.0.1:8000/api/get_contact/${this.$route.params.id}`;
                await axios.get(url).then(response => {
                    console.log(response);
                    this.contact = response.data;
                })
            },
            async updateContact(){
                this.errors = [];
                if(!this.contact.name){
                    this.errors.push('O nome é necessário')
                }
                if(!this.contact.email){
                    this.errors.push('O email é necessário')
                }
                if(!this.contact.designation){
                    this.errors.push('Designação é necessária')
                }
                if(!this.contact.contact_no){
                    this.errors.push('O número de contato é necessário')
                }

                if(!this.errors.length){
                    let formData = new FormData();
                    formData.append('name', this.contact.name);
                    formData.append('email', this.contact.email);
                    formData.append('designation', this.contact.designation);
                    formData.append('contact_no', this.contact.contact_no);
                    let url = `http://127.0.0.1:8000/api/update_contact/${this.$route.params.id}`;
                    await axios.post(url, formData).then(response => {
                        console.log(response);
                        if(response.status == 200){
                            alert(response.data.message);
                        }else{
                            console.log('error');
                        }
                    }).catch(error => {
                        this.errors.push(error.response)
                    });
                }
            }
        },
        mounted: function (){
            console.log('Componente Editar carregado ...');
        }
    }
</script>