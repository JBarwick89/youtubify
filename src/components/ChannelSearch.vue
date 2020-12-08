<template>
  <div id="searchArea">
    <input 
      name="searchBar" 
      id="searchBar" 
      v-model="channelsSearchQuery"
    >

    <button 
      type="button" 
      @click="searchChannels"
      :loading="loading"
    >Search</button>

    <div id="resultsArea">
      <div class="loading" v-if="loading">
        Searching...
      </div>
      <div class="loading" v-else-if="channelResults.length">
        Results! {{ channelResults.data.items }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChannelSearch',
  props: {
    msg: String
  },

  data() {
    return {
      apiKey: 'AIzaSyDqNu_Q-Tcy7qrxxGVyp5ofO-HJpfwmx_s',
      channelResults: [],
      channelsSearchQuery: '',
      loading: false,

    };
  },

  created() {
    // this.initGoogleAPI();
  },

  mounted() {
    // this.importExternalScripts();
  },
  
  // watch: {
  //   addressSearch: _.debounce(function(addr) { this.getAddresses(addr) }, 500)
  // },

  methods: {
    async searchChannels() {
      this.loading = true;

      const channelsSearchUrl = `https://cors-anywhere.herokuapp.com/https://youtube.googleapis.com/youtube/v3/search?
        part=snippet%2CcontentDetails
        &q=${this.channelsSearchQuery}
        &type=channel
        &key=${this.apiKey}
        &maxResults=10`;

      axios
        .get(channelsSearchUrl)
        .then(channelsSearchResults => {
          this.channelResults = channelsSearchResults;
          console.log(this.channelResults);
          this.loading = false;
        }).catch(error => {
          console.log(error)
        });
    },

    initGoogleAPI() {
      // const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      // const googleChannelVideos = `https://www.googleapis.com/youtube/v3/channels?id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${this.apiKey}`

      // axios.get(
      //       `https://www.googleapis.com/youtube/v3/channels?id=${channelsSearchResults.data.items[0].id.channelId}
      //       &part=contentDetails
      //       &key=${this.apiKey}`
      //     )
      //   .then(channelsResult => {
      //     const channelUploadedVideosPlaylistId = channelsResult.data.items[0].contentDetails.relatedPlaylists.uploads;
      //     return axios.get(
      //       `https://youtube.googleapis.com/youtube/v3/playlistItems?
      //       part=snippet%2CcontentDetails%2Cstatus
      //       &playlistId=${channelUploadedVideosPlaylistId}
      //       &key=${this.apiKey}
      //       &maxResults=50`
      //     );
      //   }).then(uploadedVideosList => {
      //     console.log(uploadedVideosList);
      //   })
      //   .catch(error => console.log(error));
    },
  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
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
  height: 55px;
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
