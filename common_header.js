export const common_header = async (doc,header,constants) =>{
 
  let [x,y] = [doc.x,doc.y]
  
  doc.image(constants.img, x, y, {
    width: 70,
    height: 60,
  })
  .text(
    "CENTRE FOR STUDENT AFFAIRS \nANNA UNIVERSITY\nCHENNAI - 600 025\n", x, y+10, {
      align: "center",
    }
  );

  [x,y] = [doc.x,doc.y]
 
  doc.text(`${constants.name}\n${constants.position}`, x, y + 25, {
    align: "left",
  })

  doc.font("font_family/arial.TTF");

  doc
  .text(
    `Ph :   ${constants.phone_no}\nEmail : ${constants.email1}\n${constants.email2}`,
    x, y + 20, {
      align : "right",
    }
  );


  y+=70
  doc
    .moveTo(x, y)
    .lineTo(x + 500, y)
    .lineWidth(1)
    .stroke();
  
  doc 
  .font("font_family/arial.TTF")
  .moveDown(1);
 
  [x,y] = [doc.x,doc.y]

  doc
    .text(`Letter No. ${header.letter_no}`, x, y, {
      align: "left",
    })
    .text(`Date : ${header.date}`, x, y, {
      align: "right",
    });

  doc
    .moveDown(1)
    .text("To");

  for(let i of header.to){
    doc
    .text(`${i}`,{indent:20});
  }

  doc
    .moveDown(2)
    .text("Sir / Madam,")
    .moveDown(1);
}
