<template>
  <link rel="stylesheet" href="https://kit.fontawesome.com/d33fe072ff.js" >

  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Lanches</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lanches</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <div>
          <ion-input type='text' placeholder="Descricao" v-model="lanche.descricao"></ion-input>
          <ion-input type='number' placeholder="Preco" v-model="lanche.preco"></ion-input>
          <ion-button @click="salvar">Salvar Lanche</ion-button>
          <div style="font-size:30px; text-align:center;">CARDÁPIO</div> 
        </div>


        <ion-grid >
          <ion-row class="ion-allign-items-center" v-for="lanche in lista" :key="lanche.id"> 
            <ion-col style="text-align: left">R${{lanche.preco}}</ion-col>
            <ion-col style="background: lightblue;border-radius:4px">{{lanche.descricao}}</ion-col>
            <ion-col size="2"><ion-button color="warning" @click="editar(lanche.id)">Edit</ion-button></ion-col>
            <ion-col size="2"><ion-button color="danger" @click="apagar(lanche.id)">X</ion-button></ion-col>

          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { collection, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonInput
  },
  data(){
    return {
      lanche: {},
      lista : []
    }
  },
  created: async function(){
    const querySnapshot = await getDocs(collection(db, 'lanches'));
    querySnapshot.forEach((doc) => {
      const lanche = { id: doc.id, ...doc.data() };
      this.lista.push(lanche);
    });
  },
  methods: {
    atualizar: async function(){
      this.lista = [];
      this.lanche = {};
      const querySnapshot = await getDocs(collection(db, 'lanches'));
      querySnapshot.forEach((doc) => {
        const lanche = { id: doc.id, ...doc.data() };
        this.lista.push(lanche);
      });
    },
    salvar: async function(){
      try {
        if(this.lanche.id) {
          const lanche = {...this.lanche};
          delete(lanche.id);
          await setDoc(doc(db, 'lanches', this.lanche.id), this.lanche);
        }else{
          const docRef = await addDoc(collection(db, 'lanches'), this.lanche);
          console.log("Document written with ID: ", docRef.id);
        }
        this.atualizar();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    apagar: async function(id){
      await deleteDoc(doc(db, 'lanches', id));
      this.atualizar();
    },
    editar: async function(id){
      const lanche = this.lista.find( (item) => item.id == id );
      this.lanche = { ...lanche};
    }
  }
});
</script>

<style scoped>
#container {
  text-align: start;
  margin: 30px;
}
ion-input {
  border: groove 2px darkblue;
  border-radius: 4px;
  background: lightblue;
}
ion-grid {
  border: dotted 2px darkblue;
  border-radius: 4px;
}
</style>