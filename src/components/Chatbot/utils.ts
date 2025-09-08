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

export function generateReport(anamnesisId: number, created: Date, recommendation: string, answers: { question: string, answer: string }[]) {
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
  pdfMake.createPdf(docDefinition, pdfFonts.vfs as any).download(`Report for anamnesis ${anamnesisId}`)
}