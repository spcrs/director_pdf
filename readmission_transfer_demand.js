import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";



export const readmission_transfer_demand = async (doc,header,constants,rows) =>{

  const datas = [{options: { fontSize: 16, separation: true},no : "1",name : "Transfer",amount : constants.transfer_amount},{options: { fontSize: 16, separation: true},no : "2",name : "Transfer cum Readmission",amount : constants.transfer_readmission_amount}]

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
    .text(`With reference to the above, I am to inform that the Transfer / Readmission cum Transfer approval, in respect of students (enclosed in the Annexure), have been accorded by the Directorate of Technical Education, Chennai, for the academic year ${header.year}.\n\n.`, {indent:30})
  [x,y] = [doc.x,doc.y]
  const t = {
    headers: [
      { label: "SI.NO", property: 'no', width: 55, renderer: null,padding: 5 },
        { label: "Name of the approval order", property: 'name', width: 200, renderer: null,padding: 5 }, 
        { label: "Amount (Rs.)", property: 'amount', width: 70, renderer: null }
    ],
      datas,
      prepareRow: (row, indexColumn, indexRow, rectRow) => {
        doc.font("font_family/arial.TTF").fontSize(20);
      }
    };

    await doc.table(t,{x:100,minRowHeight:15});
  
  doc.moveDown(3)
  doc
    .font('font_family/arial.TTF')
    .fontSize(12)
    .text(`In this regard, you are requested to instruct the students to remit the fee through ‘Demand Draft’ drawn in favour of `,50,y+200,{indent:30,continued:true})
    .font('font_family/Arial_Bold.TTF')
    .text(`“The Director, Centre for Student Affairs,  Anna University, Chennai, on or before ${header.deadline_date}".`)  
  
  [x,y] = [doc.x,doc.y]
  doc.font('font_family/arial.TTF')

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

  doc.text("Note : [",{align:"left",continued:true})
    .font("font_family/arial.TTF")
    .text("As per ",{continued:true})
    .font("font_family/Arial_Bold.TTF")
    .text("clause 18.3,",{continued:true})
    .font("font_family/arial.TTF")
    .text("the readmitted students should apply to the Director, Centre for Academic Courses, Anna University, Chennai, for additional course in case of ")
    .font("font_family/Arial_Bold.TTF")
    .text("change in Regulations,",{continued:true})
    .font("font_family/arial.TTF")
    .text(" if any.]");

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
