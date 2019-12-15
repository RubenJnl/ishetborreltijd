<template>
  <div class="home">
    <Title title="Is het borreltijd?" :paragraph="paragraph"></Title>
    <div class="pb">
      <img src="@/assets/PoweredBy.gif" alt="PoweredBy Giphy" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title.vue';
// import Animation from '@/components/Animation.vue';
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Title,
    // Animation
  },
  data() {
    return {
      paragraph: this.updateParagraph(),
      cheers: this.updateGif()
    }
  },
  methods: {
    updateParagraph() {
      const ja = 'Ja, proost!',
        nee = 'Nee, helaas nog geen borreltijd',
        weekend = 'Nee, maar het is weekend 🎉',
        date = new Date();
      const hour = date.getHours(),
        minute = date.getMinutes(),
        day = date.getDay();
      const paragraph = hour == 15 && minute >= 30 || hour >=16 ? ja : day === 6 || day === 0 ? weekend : nee;

      return paragraph
    },
    updateGif() {
      const date = new Date();
      const hour = date.getHours(),
        minute = date.getMinutes(),
        day = date.getDay();

      const noWork = (hour == 15 && minute >= 30 || hour >=16) || hour <= 2 && (day === 0 || day === 5 || day === 6) ? true : false;
      const weekend = day === 6 || day === 0
      let tag = 'working';
      let context = this;
      if (noWork){
        tag = 'cheers';
      } else if (weekend) {
        tag = 'weekend';
      }
      const fetchObj = {
        type: 'GET',
        url: 'https://api.giphy.com/v1/gifs/search?api_key=pBQwNMPM0LVWZb5ACpUZPthByUY5KQ6o&rating=PG' + '&q=' + tag + '&limit=15',
      };
      axios(fetchObj)
        .then(function (resp) {
          // handle success
          const obj = resp.data;
          let rand = Math.floor(Math.random() * obj.data.length);
          if (day !== 5 && obj.data[rand].title.toLowerCase().indexOf('friday') >= 0){
            rand++;
          }
          if (obj.data[rand] && obj.data[rand].type === 'gif'){
            context.cheers = '"' + obj.data[rand].images.original.url + '"'
          }
        })
        .catch((error) => {
          // console.warning('auctionDetails ERROR', error);
          if (noWork) {
            // return "https://media0.giphy.com/media/8yFGAh0Zzj71K/giphy.gif"
            return "https://media3.giphy.com/media/mFSEfZlTrgX3CD150c/giphy.gif"
          } else {
            // return "https://media2.giphy.com/media/lktRSbK7mCbXAFIxEc/giphy.gif"
            return "https://media1.giphy.com/media/o0vwzuFwCGAFO/giphy.gif"
          }
        });
    }
  },
  watch: {
    cheers: function (cheers) {
      document.documentElement.style.setProperty('--backgroundGif', `url(${cheers})`);
    }
  },
  created() {
    document.documentElement.style.setProperty('--backgroundGif', `url(${this.cheers})`);
  }
};
</script>
