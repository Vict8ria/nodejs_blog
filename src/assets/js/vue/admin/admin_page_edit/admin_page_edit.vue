<script>
    module.exports = {
        data() {
            return {
                pageData: {}
            }
        },
        created: function() {
            this.loadData();
        },
        props: [
          "pageName"
        ],
        methods: {
            loadData() {
                let url = '/api/data?page=index';

                fetch(url)
                    .then(resp => resp.json())
                    .then(data => {
                        this.pageData = data;
                        console.log(data);
                    })
                    .catch(ex => console.error(ex))
            },

            save() {

                let url = '/api/data/update?page=index';
                let data = JSON.stringify(this.pageData);

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                })
                    .then(resp => {
                        if(resp.status == 200){
                            alert("Your changes has been saved");
                        } else {
                            alert("Error, your changes not have been saved");
                        }

                        console.log(resp);

                        return resp;
                    })
            }

        }
    }
</script>

<template lang="jade" src="./admin_page_edit.jade"></template>
