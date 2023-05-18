import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";



export const transfer_approval = async (doc,header,constants) =>{

  let [x,y] = [doc.x,doc.y]
  doc
    .text(`Sub : Anna University – Student Affairs – Transfer of students in (Full –Time / Part-Time) -\n         ${header.sub_ug_or_pg} (${header.year}) - Degree Courses – Approval accorded -  Reg.`, x, y)
    .moveDown(1);
  [x,y] = [doc.x,doc.y]
  doc
    .text("Ref  :",x,y,{continued:true})
  doc
    .text(` ${header.Ref}`)
    .text('\n********\n',{align:'center'});

  doc
    .text('With reference to the above, I am to inform that the approval is accorded for the transfer of ', {continued: true,indent:30})
    .font('font_family/Arial_Bold.TTF')
    .text(`${header.no_of_students} students`, {continued: true, underline: true})
    .font('font_family/arial.TTF')
    .text(` (as mentioned in the Annexure), in the ${header.odd_or_even} Semester of B.E / B.Tech / B.Arch. / MBA (Full-Time / Part - Time) Degree Courses in various  Self-Financing / Autonomous Engineering Colleges, for the academic year ${header.year}.`,{indent:30,lineGap:2, underline: false})
  
  doc.moveDown(3);
  
  doc
    .text("Yours faithfully\n" ,{align:'right'}); 
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

  doc.text("Encl : Annexure\n\n");
  doc
    .text("Copy to:",{align:"left",underline:true})
    .moveDown(2);
  doc.font("font_family/arial.TTF");
  
  let cnt = 1
  for(let i of header.copy_to)
    doc.text(`${cnt++}. ${i}`,{indent:10})
    
}
