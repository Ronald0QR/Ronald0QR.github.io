const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "qrdrywalldatabase",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

// Configurar CORS
app.use(cors());
app.use(express.json());

// Ruta para obtener el precio de las placas de Drywall
app.get("/precioPlacasDrywall", (req, res) => {
  const query =
    "SELECT precio FROM placa WHERE id = 3";

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results[0]); // Envía el precio como respuesta en formato JSON
  });
});

// Ruta para obtener el precio de las placas de Drywall
app.get("/precioPerfiles", (req, res) => {
  const query =
    "SELECT precio FROM perfilería WHERE id = 1";

  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results[0]); // Envía el precio como respuesta en formato JSON
  });
});

// Ruta para obtener las categorías desde la base de datos
app.get("/tablas", (req, res) => {
  const query = "SHOW TABLES";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las categorías:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      const categorias = result.map(
        (row) => row[`Tables_in_${db.config.database}`]
      );
      res.json({ categorias });
    }
  });
});

app.post("/agregarCategoria", (req, res) => {
  const nuevaCategoria = req.body.nuevaCategoria;

  if (!nuevaCategoria) {
    return res.status(400).json({ error: "Se requiere una nueva categoría." });
  }

  // Asegúrate de limpiar y validar el nombre de la tabla para evitar inyecciones de SQL
  const nombreTabla = nuevaCategoria.replace(/[^a-zA-Z0-9_]/g, "_");

  const sql = `CREATE TABLE IF NOT EXISTS ${nombreTabla} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL, precio FLOAT NOT NULL
  )`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al agregar la nueva categoría:", err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    console.log(`Nueva categoría (tabla) '${nombreTabla}' creada con éxito.`);
    res.status(200).json({ message: "Nueva categoría agregada con éxito." });
  });
});

// Nueva ruta para obtener los productos de una categoría específica
app.get("/productos/:categoria", (req, res) => {
  const categoria = req.params.categoria;

  if (!categoria) {
    res.status(400).send("La categoría no fue especificada");
    return;
  }

  const query = `SELECT * FROM ${categoria}`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(
        `Error al obtener los productos de la categoría ${categoria}:`,
        err
      );
      res.status(500).send("Error interno del servidor");
    } else {
      const productosC = result;
      res.json({ productosC });
    }
  });
});

app.post("/agregarProducto", (req, res) => {
  const { categoria, nombre, precio } = req.body;

  if (!categoria || !nombre || !precio) {
    return res.status(400).json({
      error: "Se requiere la categoría, el nombre y el precio del producto.",
    });
  }

  const nombreTabla = categoria.replace(/[^a-zA-Z0-9_]/g, "_");

  const sql = `INSERT INTO ${nombreTabla} (nombre, precio) VALUES (?, ?)`;
  const values = [nombre, precio];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al agregar el nuevo producto:", err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    console.log(
      `Nuevo producto agregado a la categoría ${categoria} con éxito.`
    );
    res.status(200).json({
      message: "Nuevo producto agregado con éxito.",
      id: result.insertId,
    });
  });
});

//Actualizar producto
app.put("/productos/:categoria/:id", (req, res) => {
  const categoria = req.params.categoria;
  const idProducto = req.params.id;
  const { nombre, precio } = req.body;

  if (!categoria || !nombre || !precio) {
    return res
      .status(400)
      .json({ error: "Categoría, Nombre y precio son campos requeridos." });
  }

  const nombreTabla = categoria.replace(/[^a-zA-Z0-9_]/g, "_");

  const sql = `UPDATE ${nombreTabla} SET nombre = ?, precio = ? WHERE id = ?`;

  db.query(sql, [nombre, precio, idProducto], (err, result) => {
    if (err) {
      console.error("Error al actualizar el producto:", err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    console.log(`Producto con ID ${idProducto} actualizado con éxito.`);
    res.status(200).json({ message: "Producto actualizado con éxito." });
  });
});

// Ruta para eliminar un producto de una categoría específica
app.delete("/productos/:categoria/:id", (req, res) => {
  const categoria = req.params.categoria;
  const idProducto = req.params.id;

  if (!categoria || !idProducto) {
    return res
      .status(400)
      .json({ error: "Categoría e ID de producto son campos requeridos." });
  }

  const nombreTabla = categoria.replace(/[^a-zA-Z0-9_]/g, "_");

  const sql = `DELETE FROM ${nombreTabla} WHERE id = ?`;

  db.query(sql, [idProducto], (err, result) => {
    if (err) {
      console.error("Error al eliminar el producto:", err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    console.log(
      `Producto con ID ${idProducto} eliminado con éxito de la categoría ${categoria}.`
    );
    res.status(200).json({ message: "Producto eliminado con éxito." });
  });
});

// Puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en http://localhost:${PORT}`);
});
