<template>
    <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Designação</th>
                    <th scope="col">Entre em contato</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>

            <tbody v-for="contact in contacts"  :key="contact.id">
                <tr class="table-secondary">
                    <th scope="row">{{ contact.id }}</th>
                    <th scope="row">{{ contact.name }}</th>
                    <th scope="row">{{ contact.email }}</th>
                    <th scope="row">{{ contact.designation }}</th>
                    <th scope="row">{{ contact.contact_no }}</th>
                    <th scope="row">
                        <router-link :to="{ name: 'EditContact', params: { id: contact.id } }">
                            <button class="btn btn-primary btn-sm" >Editar</button>
                        </router-link>
                    </th>
                    <th scope="row">
                        <button class="btn btn-danger btn-sm" @click.prevent="deleteContact(contact.id)">Deletar</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        name: 'ContactList',
        data(){
            return {
                contacts: Array
            }
        },
        created(){
            this.getContacts();
        },
        methods: {
            async getContacts(){
                let url = 'http://127.0.0.1:8000/api/contacts'
                await axios.get(url).then(response => {
                    this.contacts = response.data.contacts;
                    console.log(this.contacts);
                }).catch(error => {
                   console.log(error); 
                });
            },
            async deleteContact(id){
                let url = `http://127.0.0.1:8000/api/delete_contact/${id}`;
                await axios.delete(url).then(response => {
                    if(response.data.code == 200){
                        alert(response.data.message);
                        this.getContacts();
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        mounted(){
            console.log('Componente da lista de contatos montada');
        }
    }
</script>