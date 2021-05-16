
const cuard = new Vue({
    el : "#cuard",
    data : {
        users : [],
        user : {
            name : "",
            email : "",
            cell : "",
            location : "",
            gander : "",
            photo : "",
        },
        single_user : {
            name : "",
            email : "",
            cell : "",
            location : "",
            gander : "",
            photo : "",
        },
        edit_user : {
            name : "",
            id : "",
            email : "",
            cell : "",
            location : "",
            gander : "",
            photo : "",
            newPhoto : "",
        },
        search : "",
        ganderMale : "",
        ganderFemale : "",
        location : ""
    },
    methods : {

        //add new user for database
        addNewUser : function(){
            //form validation
            if( this.user.name == "" ||  this.user.email == "" || this.user.cell == "" || this.user.location == "" || this.user.gander == ""){
               alert('all fileds are required!');
            }else{
              
              cuard.user.photo = cuard.$refs.photo.files[0];
                
              let formData = new FormData();

              formData.append('name', this.user.name);
              formData.append('email', this.user.email);
              formData.append('cell', this.user.cell);
              formData.append('location', this.user.location);
              formData.append('gander', this.user.gander);
              formData.append('photo', this.user.photo);

               //axios request
               axios.post('inc/user.php?action=add', formData, {
                    header : {
                        'Content-Type' : 'multipart/form-data'
                    }
            }).then(function(response){
                   cuard.user.name = "",
                   cuard.user.email = "",
                   cuard.user.cell = "",
                   cuard.user.location = "",
                   cuard.user.gander = "",
                   cuard.user.photo = "",
                   alert('Data Added Successfull');
               });
            }
        },

        //get all data form database
        getAllData : function(){
            //axios request
            axios.get('inc/user.php?action=read').then(function(response){
                cuard.users = response.data;
                cuard.getAllData();
            });
        },

        //showSingleUser form Database
        showSingleUser : function(id, event){
            event.preventDefault();
            
            //axios request
            axios.get('inc/user.php?action=show&id=' + id).then(function(response){
                cuard.single_user.name = response.data.name;
                cuard.single_user.email = response.data.email;
                cuard.single_user.cell = response.data.cell;
                cuard.single_user.location = response.data.location;
                cuard.single_user.gander = response.data.gander;
                cuard.single_user.photo = response.data.photo;
            });
        },

        //delete user form Database
        deleteSingleUser : function(id, event){
            event.preventDefault();

            let con = confirm('are you sure');

            if( con == true ){
                //axios request
                axios.get('inc/user.php?action=delete&id=' + id).then(function(response){
                    alert('Data Deleted Successfull');
                }); 
            }else{
                alert('your data is safe');
            }
        },

        //editSingleUser form Database
        editSingleUser : function(id, event){
            event.preventDefault();

            //axios request form user page
            axios.get('inc/user.php?action=edit&id=' + id).then(function(response){
                cuard.edit_user.name = response.data.name;
                cuard.edit_user.id = response.data.id;
                cuard.edit_user.email = response.data.email;
                cuard.edit_user.cell = response.data.cell;
                cuard.edit_user.location = response.data.location;
                cuard.edit_user.gander = response.data.gander;
                cuard.edit_user.photo = response.data.photo;
            });
        },

        // photoUplaod : function(event){
        //     event.preventDefault();

        //     cuard.edit_user.photo = cuard.$refs.newPhoto.files[0];

        // },

        //update all user form Database
        updateSingleUser : function(id, event){
            event.preventDefault();

            let formUpdateData = new FormData();

            formUpdateData.append('name', this.edit_user.name);
            formUpdateData.append('email', this.edit_user.email);
            formUpdateData.append('cell', this.edit_user.cell);
            formUpdateData.append('location', this.edit_user.location);
            formUpdateData.append('gander', this.edit_user.gander);
            // formUpdateData.append('photo', this.edit_user.newPhoto);
            
            //axios request form Database
            axios.post('inc/user.php?action=update&id=' + id, formUpdateData, {
                header : {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(function(response){
                    alert('Data Deleted Successfull!');
            });
        },

        //Search form Database value
        Search : function(){
            let search_text = cuard.search;
            
            //axios request
            axios.get('inc/user.php?action=searchUser&search=' + search_text).then(function(response){
                cuard.users = response.data;
            });
        },


        //GanderSearchMale form Database
        GanderSearchMale : function(){
           let ganderMale = cuard.ganderMale;
           
           //axios request
           axios.get('inc/user.php?action=SearchMale&searchValue=' + ganderMale).then(function(response){
               cuard.users = response.data;
           });
        },

        //GanderSearchFemale form Database
        GanderSearchFemale : function(){
            let ganderFemale = cuard.ganderFemale;
            
            //axios request
            axios.get('inc/user.php?action=SearchFemale&searchValue=' + ganderFemale).then(function(response){
                cuard.users = response.data;
            });
        },

        //LocationSearch form Database
        LocationSearch : function(){
            let location = cuard.location;
            
            //axios request
            axios.get('inc/user.php?action=locationSearch&location=' + location).then(function(response){
                cuard.users = response.data;
            });
        }
    },
    created : function(){
       this.getAllData();
    },
    mounted : function(){

    }
})