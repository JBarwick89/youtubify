<template>
  <div>
      
  </div>
</template>

<script>

export default {
  name: 'Login',
  props: {

  },

  data: () => ({
    clientId: `454118362518-bpodk3kuniagkh3bas7jdaelsvhqqvfl.apps.googleusercontent.com`, //TODO: replace
  }),

  created() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&include_granted_scopes=true&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FChannelSearch&response_type=token&client_id=${this.clientId}`;

    window.location.href = authUrl;
  },

  methods: {

  },
};
</script>

<style scoped>

</style>