window.addEventListener("load", function(event) {
    //require('materialize-css/dist/js/materialize.js');

    let Vue = require('vue');

    let admin_edit = require('./vue/admin/admin_edit.component');

    new Vue({
        el: '#admin',
        data: {
            adminData: '',
            show: 0,
        },

        created: function() {
            this.loadData();
        },

        components: {
            'admin_edit': admin_edit
        },

        methods: {
            loadData() {

                let url = '/api/data/index';

                fetch(url)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data);
                        return this.adminData = data;
                    })
                    .catch(ex => console.error(ex))
            },

            save() {

                let url = '/api/data/update';
                let data = JSON.stringify(this.adminData);

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
    });

    // var elems = document.querySelectorAll('.collapsible');
    // M.Collapsible.init(elems);

});