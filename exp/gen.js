let fs = require("fs");

let fields = ``;

let methods = ``;

fs.readFileSync("erd.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(" "))
  .filter((s) => s.length == 2)
  .forEach(([name, type]) => {
    let Name = name
      .split("_")
      .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
      .join("");
    let fieldName = Name.slice(0, 1).toLowerCase() + Name.slice(1);

    // generate field
    if (name == "id") {
      fields += `
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)`;
    } else {
      fields += `
    @Column(name = "${name}")`;
    }
    fields += `
    private ${type} ${fieldName};
`;

    // generate method
    methods += `
    public ${type} get${Name}(){return ${fieldName};}
    public void set${Name}(${type} ${fieldName}){this.${fieldName} = ${fieldName};}
`;
  });

let code = `
package com.rideLinker.model;

import java.util.List;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="ride")
public class Ride {
${fields}
${methods}
}
`;

fs.writeFileSync("Ride.java", code.trim() + "\n");
