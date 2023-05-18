import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";


export const transfer_cancellation = async (doc,header,constants) =>{

  let [x,y] = [doc.x,doc.y]
  doc
    .text(`Sub : Anna University – Student Affairs – Cancellation of Transfer order for students – \n         ${header.sub_ug_or_pg} (${header.year}) - Degree Courses - Intimation – Reg.`,x, y)
    .moveDown(1);
  [x,y] = [doc.x,doc.y]
  doc
    .text("Ref  :",x,y,{continued:true})
  doc
    .text(` ${header.Ref}`)
    .text('\n********\n',{align:'center'});

  doc
    .text('I am to enclose the cancellation of transfer order issued by the Directorate of Technical Education, chennai, for the following students (as mentioned in the Annexure), for your perusal and necessary action.', {continued: true,indent:30})
    
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
