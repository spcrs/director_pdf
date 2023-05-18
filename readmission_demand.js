import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";



export const readmission_demand = async (doc,header,constants,rows) =>{


  let [x,y] = [doc.x,doc.y]
  doc
    .text(`Sub : Anna University – Student Affairs – Remittance of Readmission fee (${header.year}) – Reg.`, x, y)
    .moveDown(1);
  [x,y] = [doc.x,doc.y]
  doc
    .text("Ref  :",x,y,{continued:true})
  doc
    .text(` ${header.Ref}`)
    .text('\n********\n',{align:'center'});

  doc
    .text(`With reference to the above, I am to inform that the Readmission approval, in respect of the following student has been accorded by the Directorate of Technical Education, Chennai, for the academic year ${header.year}.`, {indent:30})
  [x,y] = [doc.x,doc.y]
  doc
    .text(`In this regard, you are requested to instruct the student to remit the Readmission fee through ‘Online’`,{indent:30,continued:true})
    .font('font_family/Arial_Bold.TTF')
    .text(`on or before ${header.deadline_date}.`)
    .moveDown(1)  
  
  const t = {
    headers: [
      { label: "SI.NO", property: 'no', width: 55, renderer: null,padding: 5 },
        { label: "NAME", property: 'name', width: 100, renderer: null,padding: 5 }, 
        { label: "REG. No.", property: 'regno', width: 100, renderer: null,padding: 5 }, 
        { label: "SEM", property: 'sem', width: 100, renderer: null,padding: 5 }, 
        { label: "Branch", property: 'branch', width: 100, renderer: null,padding: 5 }, 
        { label: "AMOUNT (Rs.)", property: 'amount', width: 70, renderer: null }
    ],
    rows,
      // datas,
      prepareRow: (row, indexColumn, indexRow, rectRow) => {
        doc.font("font_family/arial.TTF").fontSize(20);
      }
    };

    await doc.table(t,{minRowHeight:15});
  
  
  [x,y] = [doc.x,doc.y]
  doc.font('font_family/arial.TTF')
    doc.fontSize(12)
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

 
    
}
