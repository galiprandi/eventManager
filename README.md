# eventManager

> eventManager es una pequeña librería escrita en javascript diseñada para capturar y manejar eventos del DOM y re asignarles funciones definidas por usted. Es simple y poderosa su pesa solo 1.8Kb.

## Puede ver una [demo online](https://galiprandi.github.io/eventManager/).

---

## Modo de uso:

### 1) Importe la librería Javascript en su página, automáticamente se iniciará y revisará los todos los eventos que sucedan en el documento.

```html
<head>
  <script
    src="https://galiprandi.github.io/eventManager/eventManager.js"
    defer
  ></script>
</head>
```

### 2) Capture los eventos que desea manejar. Puede usar cualquier elemento del DOM como se muestra en los siguientes ejemplos.

Los nombres de los eventos llevan un prefijo 'em' para evitar colisiones con otras librerías.

```html
<body emKeyup="handleKeyUp">
  <img emClick="handleClick" src="imagen.jpg" />

  <h1 emClick="handleClick">Este es un título</h1>

  <button emClick="handleClick">Botón de Logging</button>

  <span emClick="handleClick">Texto sencillo</span>
</body>
```

### 3) Defina las funciones y las acciones a realizar en cada evento capturado.

```javascript
<script>
  /**************************************************************
    Puede acceder el evento desde la variable event.
    O al elemento que disparó en evento accediendo a event.target
  **************************************************************/

  function handleClick(){
    alert(`Click en: ${event.target.tagName}`)
    console.log(event)
  }

  function handleKeyUp(){
    if (event.key === "F2") {
      // Hacer algo
    }

  }
</script>
```

También puede disparar más de una función concatenando sus nombres con el separador |. como se muestra en el siguiente ejemplo:

```html
<button emClick="fnUno|fnDos|fnTres">Botón de Logging</button>
```

## ToDo

[ ] Chequear compatibilidad y solucionar posibles errores.

[ ] Agregar funciones

[ ] Traducir la documentación
