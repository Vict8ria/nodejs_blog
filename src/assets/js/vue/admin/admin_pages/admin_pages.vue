<script>
    module.exports = {
        data() {
            return {
                pages: []
            }
        },
        created: function() {
            this.loadData();
        },

        methods: {
            loadData() {

                let url = '/api/get-pages';

                fetch(url)
                    .then(resp => resp.json())
                    .then(data => {
                        this.pages = data;
                    })
                    .catch(ex => console.error(ex));
            }
        }
    }
</script>

<template lang="jade" src="./admin_pages.jade"></template>
