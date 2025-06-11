function getCookie(name){//function used to get site cookies like the csrf_token
      let cookieValue=null;
      if (document.cookie && document.cookie !==""){
          const cookies=document.cookie.split(";");
          for (let i=0; i<cookies.length; i++){
              const cookie =cookies[i].trim();
              if (cookie.substring(0,name.length+1) === (name + "=")){
                  cookieValue=decodeURIComponent(cookie.substring(name.length + 1));
                  console.log("all");
                  break;
              }
          }
      }
      return cookieValue;
  }
  function message(content){// this function will send ajax message to django backend
    $.ajax(
        {type:'POST',
        url:window.location.href,
        data:JSON.stringify({'content':content}),
        headers:{
            "X-Requested-With":"XMLHttpRequest",
            "X-CSRFToken":getCookie("csrftoken"),
        },
        success:(data) =>{
            console.log(data);
        },
        dataType:'json',
        contentType:'json'
    }
    );
  }