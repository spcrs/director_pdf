import PDFDocument from "pdfkit-table";
import fs from 'fs'
import fsa from "fs/promises";
import { common_header } from "./common_header.js";
import { transfer_approval } from "./transfer_approval.js";
import { transfer_cancellation } from "./transfer_cancellation.js";
import { transfer_demand } from "./transfer_demand.js";
import { readmission_transfer_demand } from "./readmission_transfer_demand.js";
import { readmission_transfer_approval } from "./readmission_transfer_approval.js";
import { readmission_demand } from "./readmission_demand.js";

let header = {
  type : "readmission_demand",
  letter_no : 'ODD/UG/UG(PT)/PG - TR,RCT/SA2-2/2022-2023',
  date : '09.09.2022',
  to : ["The Dean of Constituent Colleges / Regional Campus /","The Principal of Government / Government Aided / Self-Financing / ","Autonomous Engineering Colleges (Annexure enclosed)."],   // to array
  sub_ug_or_pg : 'UG',
  Ref : 'D.T.E’s Letter No. 22100 / J4 / 2022, dated: 25.08.2022.',  // array
  year : "2021-2022",
  no_of_students : 50,
  copy_to :["The Controller of Examinations, Anna University Chennai – 25","Stock file"],
  odd_or_even : "ODD",
  amount : "2000",
  deadline_date : "23.04.2023"
}

async function read_const(){
  const data = await fsa.readFile("constant_data.json")
  return JSON.parse(data.toString())
}

const constants =await read_const()

const doc = new PDFDocument({size:"A4",margins:{left:50,right:50,top:20,bottom:50}});

doc.pipe(fs.createWriteStream(`generated_pdf/${header.type}.pdf`));
doc.font("font_family/Arial_Bold.TTF");
console.log(constants)
await common_header(doc,header,constants);



let rows = [["1", "V.RAJARAJESHWARI","2000"],["1", "V.RAJARAJESHWARI","4000"]]

if(header.type === 'transfer_approval')
  await transfer_approval(doc,header,constants)
else if(header.type === 'transfer_cancellation')
 await transfer_cancellation(doc,header,constants)
else if(header.type === 'transfer_demand')
 await transfer_demand(doc,header,constants)
else if(header.type === 'readmission_transfer_demand')
 await readmission_transfer_demand(doc,header,constants,rows)
else if(header.type === 'readmission_transfer_approval')
 await readmission_transfer_approval(doc,header,constants,rows)
 else if(header.type === 'readmission_demand')
  await readmission_demand(doc,header,constants,rows)

doc.end()


