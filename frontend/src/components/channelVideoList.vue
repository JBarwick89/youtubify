<template>
  <div class="container">
    <div class="box">
      <v-container>
        <v-row v-for="upload in uploads" :key="upload.id">
          {{ upload.snippet.title }}
        </v-row>        
      </v-container>
    </div>

    <div class="box">
      <v-container>
        <v-row v-for="playlist in userPlaylists" :key="playlist.id">
          {{ playlist.snippet.title }} 
        </v-row>        
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'channelVideoList',
  props: {
    channelId: String,
    accessToken: String,
  },

  data: () => ({
    apiKey: '',
    uploads: [],
    userPlaylists: [],
  }),

  async created() {
    await this.getApiKey();
    await this.getChannelVideoListData();
    await this.getUserPlaylists();
  },

  methods: {
    async getApiKey() {
      this.apiKey = await axios.get(`${process.env.VUE_APP_BACKEND_ENDPOINT}/apikey`)
      .then(res => {
        return res.data;
      }).catch(error => {
        console.error(error)
      });
    },

    async getChannelVideoListData() {
      const getChannelUploadsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.channelId}&key=${this.apiKey}`;

      const channelUploadsPlaylistId = await axios.get(getChannelUploadsUrl)
      .then(res => {
        return res.data.items[0].contentDetails.relatedPlaylists.uploads;
      }).catch(error => {
        console.error(error)
      });
      
      const getUploadsUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${channelUploadsPlaylistId}&key=${this.apiKey}`;

      const videoIdArray = await axios.get(getUploadsUrl)
      .then(res => {
        return (res.data.items.map(playlistItem => playlistItem.contentDetails.videoId));
      }).catch(error => {
        console.error(error)
      });

      const getVideoDataUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet&id=${videoIdArray.join('%2C')}&key=${this.apiKey}`;
      
      this.uploads = await axios.get(getVideoDataUrl)
      .then(res => {
        return res.data.items;
      }).catch(error => {
        console.error(error)
      });
    },

    async getUserPlaylists() {
      const getUserPlaylistsUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&key=${this.apiKey}&access_token=${this.accessToken}`;
      
      this.userPlaylists = await axios.get(getUserPlaylistsUrl)
        .then(res => {
          return res.data.items;
        }).catch(error => {
          console.log(error)
        });
    },
  },
};
</script>

<style scoped>
  .box {
    display: inline-table;
    border-style: inset;
    border: solid blue;
    padding: 10px;
    margin: 5px;
  }
</style>