<script>
    module.exports = {
        data() {
            return {}
        },
        props: [
            'admindata',
            'show'
        ],
        methods: {
            navigate: function(e){
                if (e.target.dataset.show) {
                    e.preventDefault();
                    this.show = e.target.dataset.show;
                }
            },
            alerts: function(e){
                if (e.target.dataset.alert) {
                    e.preventDefault();
                    alert(e.target.dataset.alert);
                }
            },

        }
    }
</script>

<template lang="jade" src="./admin_edit.jade"></template>
