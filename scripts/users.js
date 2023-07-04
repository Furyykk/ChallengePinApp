db.collection("users")
  .get()
  .then((querySnapshot) => {
    const arrayUsers = [];
    querySnapshot.forEach((doc, index, arr) => {
      let users = Object.assign(doc.data());
      arrayUsers.push(users);
    });

    const quantityUsers = arrayUsers.length;
    let plusAges = 0;
    let plusDesv = 0;

    //Promedio de edades
    arrayUsers.map((item) => {
      plusAges += parseInt(item.age);
    });
    const averageAge = Math.round(plusAges / quantityUsers);

    //Desviacion estandar de edades
    arrayUsers.map((item) => {
      plusDesv += Math.pow(item.age - plusAges / quantityUsers, 2);
    });
    const standardDeviation = Math.round(
      Math.sqrt(plusDesv / (quantityUsers - 1))
    );

    $(".infoGeneral").append(
      '<p class="text">' +
        "El promedio de edad entre los usuarios es de " +
        averageAge +
        " años " +
        "</p>"
    );
    $(".infoGeneral").append(
      '<p class="text">' +
        "La desviacion de edad estandar entre los usuarios es de " +
        standardDeviation +
        " años " +
        "</p>"
    );

    // Listado de usuarios con su Fecha de muerte estimada
    arrayUsers.map((item) => {
      const dateDeath = new Date(item.date);
      dateDeath.setFullYear(dateDeath.getFullYear() + 80); //Fecha de muerte calculada en base a la esperanza de vida

      $(".listUsers").append(
        '<div class="user">' +
          "<p>" +
          item.firstName +
          " " +
          item.lastName +
          ", " +
          item.age +
          " años " +
          "</p>" +
          "<p>" +
          "Fecha de nacimiento " +
          item.date +
          ", " +
          "Fecha aproximada de muerte " +
          dateDeath.toDateString() +
          "</p>" +
          "</div>"
      );
    });
  });
