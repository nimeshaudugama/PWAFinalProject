
console.log(window)

const notificatioButton = document.getElementById('notificationbtn')
const showButton = document.getElementById('showButton')
const form_title = document.getElementById('titile')
const form_body = document.getElementById('body')
if ('Notification' in window && 'serviceWorker' in navigator){
    console.log('Notification exist')
    // notificatioButton.addEventListener('click',() =>{
        document.addEventListener("DOMContentLoaded", function() {
        console.log('Permisson:' , Notification.permission);
        switch(Notification.permission){
            case 'default':
                requestPermission();
                
                break;

            case 'granted':
                displayNotification();  
                
                break;
            
            case 'denied':
                notificationNotAllowed();
               
                break;

        }
    })
}

else {
    notificationNotAllowed();
}

notificatioButton.addEventListener('click',() =>{
    console.log('Permisson:' , Notification.permission);
    // switch(Notification.permission){
    //     case 'default':
    //         requestPermission();
            
    //         break;

    //     case 'granted':
    //         displayNotification();  
            
    //         break;
        
    //     case 'denied':
    //         notificationNotAllowed();
           
    //         break;

    // if (Notification.permission == 'granted'){
    //     form_title.disabled = false;
    //     form_body.disabled = false;
    //   notificatioButton.disabled =true;


    // }else {
        console.log('Authorization upon button click')
        Notification.requestPermission()
        .then((permission) =>{
            console.log('user selected :',permission)
            if (Notification.permission == 'granted'){
             
                    form_title.disabled = false;
                    form_body.disabled = false;
                  notificatioButton.disabled =true;
                
            }
        })
    //}
})

showButton.addEventListener('click', () => {

    if (form_title.value === "") {
        const titlecheck = document.getElementById('titile-check');
        titlecheck.textContent = 'Title is Mandatory';
        titlecheck.style.color = 'red'; 
        titlecheck.style.fontWeight = 'bold';
        return;
    }

    showNotification()


})



function requestPermission(){
    console.log ('Requesting Permission')
    form_title.disabled = true;
    form_body.disabled = true;
}

function displayNotification(){
    console.log('permission granted')
    notificatioButton.disabled =true;
   

}

function notificationNotAllowed(){
    console.log('Notification Not Allowed')
    form_title.disabled = true;
    form_body.disabled = true;

}

if ('actions' in Notification.prototype) {
    console.log('Browser supports displaying actions in notifications');
  } else {
    console.log('Browser does not support displaying actions in notifications');
  }
  

function showNotification(){

    let title = form_title.value;
    let body = form_body.value;

    const options = {
        body : title +"\n"+ body,
        icon : '/images/Thank-You.png',
        image : '/images/Thank-You.png',
        actions : [

            {
                action: 'confirm',
                title : 'Agree',
                icon: '/images/image.png'
            },
            {
                action: 'cancel',
                title : 'Disagree',
                icon: '/images/image.png'
            },
        ]
    };
    navigator.serviceWorker.ready
    .then((registration) =>{
        registration.showNotification('Subscribed',options)
   
 

})

}