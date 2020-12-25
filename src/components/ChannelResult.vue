<template>
    <v-card
      class="pa-2"
      outlined
      tile
    > 
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="channel.snippet.thumbnails.default.url"
        transition="scale-transition"
        width="40"
      />

      <v-card-title> {{ channel.snippet.channelTitle }}</v-card-title>
      <v-card-text> {{ channel.snippet.description }}</v-card-text>

      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Select
          </v-btn>
        </template>

        <v-card>          
         <v-card-text>Would you like to add all videos from this channel to a playlist?</v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="navigateToVideoList"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>      
    </v-card>
</template>

<script>

export default {
  name: 'Result',
  props: {
    channel: Object,
    accessToken: String,
  },

  data() {
    return {
      selected: false,
      dialog: false,
    };
  },

  methods: {
    navigateToVideoList() {
      this.dialog = false;
      
      this.$router.push({ 
        name: 'channelVideoList', 
        params: { 
          channelId: this.channel.id.channelId,
          accessToken: this.accessToken,
        } 
      });
    },
  }
}

</script>

<style scoped>

button {
  height: 50px;
  border-radius: 3px;
  border: 2px solid lightgray;
  box-shadow: 0 0 10px #eceaea;
  font-size: 25px;  
  color: white;
  padding-left: 10px;
  padding-top: 10px;
  background-color: rgb(11, 242, 126);
}
</style>
