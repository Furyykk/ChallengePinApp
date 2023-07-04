$("form").validate({
  rules: {
    firstname: "required",

    lastname: "required",

    age: {
      required: true,
    },
    data: {
      required: true,
    },
  },

  messages: {
    firstname: "Por favor, introduzca su nombre",
    lastname: "Por favor, introduzca su apellido",
    age: "la edad es obligatoria",
    data: "La fecha de nacimiento es obligatoria",
  },

  submitHandler: function (form) {
    db.collection("users")
      .add({
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        age: $("#age").val(),
        date: $("#date").val(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        $(".alert").append(
          '<p class="success">' + "Mensaje enviado correctamente!" + "</p>"
        );
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        $(".alert").append(
          '<p class="success">' + "Hubo un error al enviar el mensaje" + "</p>"
        );
      });
  },
});
