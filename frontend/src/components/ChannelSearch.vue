<template>
  <div id="searchArea">
    <input 
      name="searchBar" 
      id="searchBar" 
      v-model="channelsSearchQuery"
      @keyup.enter="searchChannels"
    >

    <v-btn
      type="button" 
      @click="searchChannels"
      :loading="loading"
    >Search</v-btn>

    <div id="resultsArea">
      <div class="loading" v-if="loading">
        Searching...
      </div>

      <div v-else-if="channelResults.length">
          <v-container class="grey lighten-5">

            <v-row v-for="channel in channelResults" :key="channel.id.channelId">
              <ChannelResult :channel="channel" :accessToken="accessToken"/>
            </v-row>        
          </v-container>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import ChannelResult from './ChannelResult';

  export default {
    name: 'ChannelSearch',
    
    components: {
      ChannelResult,
    },

    props: {
      msg: String
    },

    data: () => ({
 // TODO: replace
      channelResults: [],
      channelsSearchQuery: '',
      loading: false,
      playlistSelected: false,
      accessToken: '',
    }),

    created() {
      // this is hacky. clean the url params somehow
      this.accessToken = this.$route.fullPath.substring(this.$route.fullPath.indexOf('access_token')+13, this.$route.fullPath.indexOf('&'));
    },

    methods: {
      async searchChannels() {
        this.loading = true;
        const channelsSearchUrl = `http://localhost:3000?q=${this.channelsSearchQuery}`;
        // const channelsSearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=&key=${this.apiKey}&type=channel&maxResults=10`;        
        axios.get(channelsSearchUrl)
          .then(channelsSearchResults => {  
            this.channelResults = channelsSearchResults.data.items;
            this.loading = false;
          }).catch(error => {
            console.log(error);
          });
      },
    }
  }

</script>

<style scoped>
input {
  width: 50%;
  position: relative;
  height: 40px;
  border-radius: 3px;
  border: 2px solid lightgray;
  box-shadow: 0 0 10px #eceaea;
  font-size: 25px;
  padding-left: 10px;
  padding-top: 10px;
  cursor: text;  
}

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
