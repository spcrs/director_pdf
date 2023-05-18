import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";



export const transfer_demand = async (doc,header,constants) =>{

  let [x,y] = [doc.x,doc.y]
  doc
    .text(`Sub : Anna University – Student Affairs –Remittance of Transfer fee (${header.year}) – Reg.`, x, y)
    .moveDown(1);
  [x,y] = [doc.x,doc.y]
  doc
    .text("Ref  :",x,y,{continued:true})
  doc
    .text(` ${header.Ref}`)
    .text('\n********\n',{align:'center'});

  doc
    .text(`With reference to the above, I am to inform that the Transfer approval, in respect of students (enclosed in the Annexure), have been accorded by the Directorate of Technical Education, Chennai, for the academic year ${header.year}.\n\n`, {indent:30})
    .text(`In this regard, you are requested to instruct the students to remit the Transfer fee of`,{indent:30})
    .font('font_family/Arial_Bold.TTF')
    .text(`Rs.${header.amount}/- `,{continued:true}) 
    .font('font_family/arial.TTF')
    .text(`through Demand Draft drawn in favour of `,{continued:true})
    .font('font_family/Arial_Bold.TTF')
    .text(`“The Director, Centre for Student Affairs,  Anna University, Chennai, on or before ${header.date}`)  
  doc.moveDown(3);
  
  [x,y] = [doc.x,doc.y]

  doc
    .image(constants.img, x+430, y, {
    width: 70,
    height: 60,
    })


  doc.font("font_family/Arial_Bold.TTF");
  doc.text("\n\DIRECTOR     \n\n\n" ,{align:'right'}); 
  
  [x,y] = [doc.x,doc.y]
 
  doc.font("font_family/Arial_Bold.TTF");

  doc.text("Copy to:",{align:"left",underline:true});
  doc.moveDown(1)
  doc.font("font_family/arial.TTF");
  
  let cnt = 1
  for(let i of header.copy_to)
    doc.text(`${cnt++}. ${i}`,{indent:10})
    
}
