'use client'

import * as pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { format } from 'date-fns'
import checkForCandida from './recommendations/checkForCandida.txt'
import checkForGalvanose from './recommendations/checkForGalvanose.txt'
import checkForGlossodynia from './recommendations/checkForGlossodynia.txt'
import checkYourJaws from './recommendations/checkYourJaws.txt'
import checkYourNose from './recommendations/checkYourNose.txt'
import checkYourStomach from './recommendations/checkYourStomach.txt'
import recommendSurgeonAdvise from './recommendations/recommendSurgeonAdvise.txt'

const genderMap = [
  { gender: 'male', translated: 'Мужчина' },
  { gender: 'female', translated: 'Женщина' }
]

const recommendations = [
  { name: 'checkForCandida', value: checkForCandida },
  { name: 'checkForGalvanose', value: checkForGalvanose },
  { name: 'checkForGlossodynia', value: checkForGlossodynia },
  { name: 'checkYourJaws', value: checkYourJaws },
  { name: 'checkYourNose', value: checkYourNose },
  { name: 'checkYourStomach', value: checkYourStomach },
  { name: 'recommendSurgeonAdvise', value: recommendSurgeonAdvise }
]

// export function generateReport(anamnesisId: number, created: Date, recommendation: string, answers: { question: string, answer: string }[]) {
//   const gender = answers.find(item => item.question === 'gender')?.answer
//   const genderTranslated = genderMap.find(item => item.gender === gender)?.translated ?? '?'

//   const docDefinition: TDocumentDefinitions = {
//     content: [
//       {
//         stack: [
//           {
//             text: 'ЗАКЛЮЧЕНИЕ',
//             color: '#000000',
//             alignment: 'center',
//             fontSize: 20,
//             marginBottom: 20
//           },
//           {
//             text: [
//               { text: 'Дата: ', color: '#000000' },
//               { text: format(created, 'MMM d, yyyy'), color: '#000000' }
//             ],
//             alignment: 'left'
//           },
//           {
//             text: [
//               { text: 'Пол: ' },
//               { text: genderTranslated }
//             ],
//             alignment: 'left',
//             marginBottom: 30
//           },

//           {
//             text: recommendations.find(item => item.name === recommendation)?.value ?? ''
//           }
//         ]
//       }
//     ],
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   pdfMake.createPdf(docDefinition, pdfFonts.vfs as any).download(`Report for anamnesis ${anamnesisId}`)
// }

export async function generateReport3(anamnesisId: number, created: Date, recommendation: string, answers: { question: string, answer: string }[]): Promise<string> {
  const gender = answers.find(item => item.question === 'gender')?.answer
  const genderTranslated = genderMap.find(item => item.gender === gender)?.translated ?? '?'

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        stack: [
          {
            text: 'ЗАКЛЮЧЕНИЕ',
            color: '#000000',
            alignment: 'center',
            fontSize: 20,
            marginBottom: 20
          },
          {
            text: [
              { text: 'Дата: ', color: '#000000' },
              { text: format(created, 'MMM d, yyyy'), color: '#000000' }
            ],
            alignment: 'left'
          },
          {
            text: [
              { text: 'Пол: ' },
              { text: genderTranslated }
            ],
            alignment: 'left',
            marginBottom: 30
          },

          {
            text: recommendations.find(item => item.name === recommendation)?.value ?? ''
          }
        ]
      }
    ],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = pdfMake.createPdf(docDefinition, pdfFonts.vfs as any)

  return new Promise<string>(resolve => {
    doc.getBlob(result => {
      const url = URL.createObjectURL(result)
      resolve(url)
      // resolve(`blob:${URL.parse(url.substring(5))?.pathname.substring(1)}`)
    })
  })
}

// export async function generateReport2(anamnesisId: number, created: Date, recommendation: string, answers: { question: string, answer: string }[]): Promise<string> {
//   const fonts = {
//     Courier: {
//       normal: 'Courier',
//       bold: 'Courier-Bold',
//       italics: 'Courier-Oblique',
//       bolditalics: 'Courier-BoldOblique'
//     },
//     Helvetica: {
//       normal: 'Helvetica',
//       bold: 'Helvetica-Bold',
//       italics: 'Helvetica-Oblique',
//       bolditalics: 'Helvetica-BoldOblique'
//     },
//     Times: {
//       normal: 'Times-Roman',
//       bold: 'Times-Bold',
//       italics: 'Times-Italic',
//       bolditalics: 'Times-BoldItalic'
//     },
//     Symbol: {
//       normal: 'Symbol'
//     },
//     ZapfDingbats: {
//       normal: 'ZapfDingbats'
//     }
//   }

//   // const PdfPrinter = import('pdfmake');
//   const printer = new PdfPrinter(fonts)
//   // const fs = require('fs');

//   const docDefinition = {
//     content: [
//       'First paragraph',
//       'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
//     ],
//     defaultStyle: {
//       font: 'Helvetica'
//     }
//   }

//   const pdfDoc = printer.createPdfKitDocument(docDefinition)
//   // pdfDoc.pipe(fs.createWriteStream('document.pdf'))
//   // pdfDoc.end()

//   const stream = blobStream()
//   pdfDoc.pipe(stream)
//   pdfDoc.end()

//   return new Promise<string>((resolve) => {
//     stream.on('finish', function() {
//       resolve(stream.toBlobURL('application/pdf'))
//     })
//   })
// }