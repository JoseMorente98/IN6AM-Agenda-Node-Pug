var database = require('./database');
var categoria = {};

categoria.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Categoria",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.select = function(idCategoria, callback) {
  if(database) {
    var sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarCategoria(?)", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarCategoria(?, ?)";
    database.query(sql,
    [data.idCategoria, data.nombre],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

categoria.delete = function(idCategoria, callback) {
  if(database) {
    var sql = "CALL SP_EliminarCategoria(?)";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = categoria;
