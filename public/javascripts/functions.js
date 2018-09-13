function getAbi(cb){
	$.ajax({
		url:'/getAbi',
		dataType:'json',
		success:function(r){
			cb(r);
		},error:function(e){
			alert(eliminarTags(e.responseText));
		}
	})
}
function getContractAddress(cb){
	$.ajax({
		url:'/getContractAddress',
		dataType:'json',
		success:function(r){
			cb(r);
		},error:function(e){
			alert(eliminarTags(e.responseText));
		}
	})
}

function eliminarTags(string){
	return string.replace(/<(?:.|\n)*?>/gm, '');
}



/*--------------------------------------------------*/
function getAddress(cb){
	$.ajax({
		url:'/getAddress',
		dataType:'json',
		success:function(r){
			cb(r.address);
		},error:function(e){
			alert(eliminarTags(e.responseText));
		}
	})
}
function hacerTransaccion(address,netWork){
    enviadas = parseInt($("#enviadas").text())
  	$("#enviadas").text(enviadas+1)
	$.ajax({
      url:'/serialize/'+address+'/'+netWork,
      success:function(e){
      	console.log('-->',e);
      	recibidas = parseInt($("#recibidas").text())
      	$("#recibidas").text(recibidas+1)
      	if (e.error) {
      		$('#responses').append("<b>transaction to: "+address+", result: "+e.error+"</b><br><br>");
      	}else{
      		if (e.result) {
        		$('#responses').append("<b>transaction to: "+address+", result: "+e.result+"</b><br><br>");

      		}else{
      			vacias = parseInt($("#vacias").text())
      			$("#vacias").text(vacias+1)
        		$('#responses').append("<b>transaction to: "+address+", result: Esperando Respuesta</b><br><br>");
      		}
      	}
      }
    })
}