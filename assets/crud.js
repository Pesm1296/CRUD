//Evento para crear un nuevo registro
document.getElementById("formulario").addEventListener("submit", crear);

// //Función crear
function crear(e){
    nombreCompleto = document.getElementById("nombreCompleto").value
    correoElectronico = document.getElementById("correoElectronico").value
    noEmpleado = document.getElementById("noEmpleado").value

    let registro = {
        nombreCompleto,
        correoElectronico,
        noEmpleado
    }

    if(localStorage.getItem("Registros") === null){
        let registros = []
        registros.push(registro)
        localStorage.setItem("Registros", JSON.stringify(registros))
    } else{
        let registros = JSON.parse(localStorage.getItem("Registros"))
        registros.push(registro)
        localStorage.setItem("Registros", JSON.stringify(registros))
    }
    leer();
    document.getElementById("formulario").reset();
    console.log("Registro guardado correctamente")
    e.preventDefault()

    alert("Registro añadido correctamente");
}

//Función leer
function leer(){
    let registros = JSON.parse(localStorage.getItem("Registros"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0;i<registros.length;i++){
        let nombreCompleto = registros[i].nombreCompleto
        let correoElectronico = registros[i].correoElectronico
        let noEmpleado = registros[i].noEmpleado

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${nombreCompleto}</td>
            <td>${correoElectronico}</td>
            <td>${noEmpleado}</td>
            <td><button onclick="eliminar('${nombreCompleto}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${nombreCompleto}')" class="btn btn-success">Editar</button></td>
        </tr>
        `
    }
}

// Función "editar"
function editar(nombreCompleto){
    let registros = JSON.parse(localStorage.getItem("Registros"));
    for(let i=0; i<registros.length; i++){
        if(registros[i].nombreCompleto === nombreCompleto){
            document.getElementById("body").innerHTML = `
            <div class="row d-flex justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Editar registro</h2>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <input type="text" id="newNombreCompleto" class="form-control my-3" placeholder="${registros[i].nombreCompleto}">
                            </div>
                            <div class="form-group">
                                <input type="email" id="newCorreoElectronico" class="form-control my-3" placeholder="${registros[i].correoElectronico}">
                            </div>
                            <div class="form-group">
                                <input type="number" id="newNoEmpleado" class="form-control my-3" placeholder="${registros[i].noEmpleado}">
                            </div>
                        </form>
                        <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                        <button class="btn btn-primary" onclick="VistaPrincipal()">Cancelar</button>
                    </div>
                </div>
            `
        }
    }
}

//Función actualizar
function actualizar(i){
    let registros = JSON.parse(localStorage.getItem("Registros"));
    registros[i].nombreCompleto = document.getElementById("newNombreCompleto").value;
    registros[i].correoElectronico = document.getElementById("newCorreoElectronico").value;
    registros[i].noEmpleado = document.getElementById("newNoEmpleado").value;
        localStorage.setItem("Registros",JSON.stringify(registros));
        VistaPrincipal();
        alert("Registro actualizado correctamente");
}

// Función eliminar
function eliminar(nombreCompleto){
    let registros = JSON.parse(localStorage.getItem("Registros"));
    for(let i=0; i<registros.length; i++){
        if(registros[i].nombreCompleto === nombreCompleto){
            registros.splice(i,1);
        }
    }
    localStorage.setItem("Registros", JSON.stringify(registros));
    leer();
    alert("Registro eliminado correctamente");
}

//Función para mostrar la interfaz principal
function VistaPrincipal(){
    document.getElementById("body").innerHTML= ` <div class="row d-flex justify-content-center">
    <div class="col-md-5">
        <div class="card">
            <div class="card-header">
                <h2>Registrar nuevo usuario</h2>
            </div>
            <div class="card-body">
                <form id="formulario">
                    <div class="form-group">
                        <input type="text" id="nombreCompleto" class="form-control my-3" placeholder="Ingresar Nombre completo" autofocus>
                    </div>
                    <div class="form-group">
                        <input type="email" id="correoElectronico" class="form-control my-3" placeholder="Ingresar correo electrónico">
                    </div>
                    <div class="form-group">
                        <input type="number" id="noEmpleado" class="form-control my-3" placeholder="Ingresar No. Empleado">
                    </div>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-8 my-2">
        <table class="table caption-top table-striped">
            <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">No. Empleado</th>
            </tr>
            </thead>
            <tbody id="tbody">
            <tr>
                <td>Pedro</td>
                <td>correo@correo.com</td>
                <td>15975</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>`
leer();
}

leer();