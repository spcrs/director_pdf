import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";



export const readmission_transfer_approval = async (doc,header,constants,rows) =>{

  const datas = [{options: { fontSize: 16, separation: true},no : "1",name : "Transfer",amount : constants.transfer_amount},{options: { fontSize: 16, separation: true},no : "2",name : "Transfer cum Readmission",amount : constants.transfer_readmission_amount}]

  let [x,y] = [doc.x,doc.y]
  doc
    .text('Sub : ',{continued:true})
    .text(`Anna University – Student Affairs – Transfer / Readmission cum Transfer of \nStudents in (Full –Time/ Part-Time) - ${header.sub_ug_or_pg} (${header.year}) - Degree Courses – \nApproval accorded - Reg.`,x,y,{indent:30})
    .moveDown(1);

    // .text(`Sub : Anna University – Student Affairs –Remittance of Transfer fee (${header.year}) – Reg.`, x, y)
  [x,y] = [doc.x,doc.y]
  doc
    .text("Ref  :",x,y,{continued:true})
  doc
    .text(` ${header.Ref}`)
    .text('\n********\n',{align:'center'});

  doc
    .text(`With reference to the above, I am to inform that the approval is accorded for the Transfer / Readmission cum Transfer of `, {indent:30,continued:true})
    .font('font_family/Arial_Bold.TTF')
    .text(`${header.no_of_students} Students`,{continued:true,underline:true})
    .font('font_family/arial.TTF')
    .text(` (as mentioned in the Annexure), in the ${header.odd_or_even} Semester of B.E / B.Tech / B.Arch. (Full-Time / Part - Time) Degree Courses in various Constituent / Regional Campus / Government / Government Aided / Self-Financing / Autonomous Engineering Colleges, for the academic year ${header.year}.`,{underline:false})

  doc.moveDown(3)
  
  doc.text("Yours faithfully\n" ,{align:'right'}); 
  [x,y] = [doc.x,doc.y]

  doc
    .image(constants.img, x+430, y, {
    width: 70,
    height: 60,
    })


  doc.font("font_family/Arial_Bold.TTF");
  doc.text("\n\DIRECTOR     \n\n" ,{align:'right'}); 
  
  [x,y] = [doc.x,doc.y]
 
  doc.font("font_family/Arial_Bold.TTF");

  doc.text("Note : ",{align:"left",continued:true})
    .font("font_family/arial.TTF")
    .text("Approval will be accorded to the students only after the Transfer / Readmission\n  cum Transfer fee received from the students through the college for Transfer \n  Approval.",{indent:30});
  doc.moveDown(1)
  doc.font("font_family/Arial_Bold.TTF")
  doc.text("Encl : Annexure")
    .moveDown(0.5)
  doc.text("Copy to:",{align:"left",underline:true});
  doc.font("font_family/arial.TTF");
  
  let cnt = 1
  for(let i of header.copy_to)
    doc.text(`${cnt++}. ${i}`,{indent:10})
    
}
