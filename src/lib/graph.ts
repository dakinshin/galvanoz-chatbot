import { BotMessage } from './types'

export const graph: BotMessage[] = [
  {
    step: 'welcome',
    type: 'message',
    prompt: 'Здравствуйте! Ответьте на несколько вопросов и я подготовлю для вас экспертное заключение!',
    destinations: [
      {
        formula: () => true,
        nextStep: 'gender'
      }
    ]
  },
  {
    step: 'gender',
    type: 'prompt',
    prompt: 'Укажите пол',
    options: [
      { id: 'male', text: 'Мужчина' },
      { id: 'female', text: 'Женщина' },
    ],
    destinations: [
      {
        formula: () => true,
        nextStep: 'doYouHaveProtesis'
      }
    ]
  },
  {
    step: 'doYouHaveProtesis',
    type: 'prompt',
    prompt: 'В полости рта присутствуют металлосодержащие конструкции (коронки, штифты, штифто-культевые вкладки, амальгамовые пломбы, имлантаты, бюгельные протезы)?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'whenInstalled'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFillSalt'
      }
    ]
  },
  {
    step: 'whenInstalled',
    type: 'prompt',
    prompt: 'Как давно установлены?',
    allowInput: true,
    destinations: [
      {
        formula: () => true,
        nextStep: 'metalicInstallationsAddedRecently'
      }
    ]
  },
  {
    step: 'metalicInstallationsAddedRecently',
    type: 'prompt',
    prompt: 'При последнем протезировании добавлялись новые металлосодержащие конструкции?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: () => true,
        nextStep: 'doYouFillMetallicTaste'
      }
    ]
  },
  {
    step: 'doYouFillMetallicTaste',
    type: 'prompt',
    prompt: 'Присутствует ли металлический вкус или чувство кислоты в полости рта?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'increasedDuringMeal'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFillBurning'
      }
    ]
  },
  {
    step: 'increasedDuringMeal',
    type: 'prompt',
    prompt: 'Металлический вкус усиливается во время еды?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'doYouFillBurning'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'problemsWithStomach'
      }
    ]
  },
  {
    step: 'doYouFillBurning',
    type: 'prompt',
    prompt: 'Присутствует ли жжение в полости рта?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'burningDecreasingDuringMeal'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFeelDryMouth'
      }
    ]
  },
  {
    step: 'doYouFillSalt',
    type: 'prompt',
    prompt: 'Присутствует ли привкус соленого в полости рта?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'recommentSurgeonAdvise' // !
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'headache'
      }
    ]
  },
  {
    step: 'headache',
    type: 'prompt',
    prompt: 'Присутствуют ли неприятные ощущения, боль в горле?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkYourNose'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFillBurning'
      }
    ]
  },
  {
    step: 'recommentSurgeonAdvise',
    type: 'message',
    prompt: 'Рекомендована консультация хирурга и пародонтолога на предмет исключения заболеваний слюнных желез и заболеваний пародонта',
    final: true
  },
  {
    step: 'checkYourNose',
    type: 'message',
    prompt: 'Рекомендована консультация отоларинголога на предмет исключения заболеваний лор-органов',
    final: true
  },
  {
    step: 'burningDecreasingDuringMeal',
    type: 'prompt',
    prompt: 'Жжение проходит во время еды?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkForGlossodynia'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFeelDryMouth'
      }
    ]
  },
  {
    step: 'checkForGlossodynia',
    type: 'message',
    prompt: 'Рекомендована консультация стоматоневролога на предмет исключения глоссодинии',
    final: true
  },
  {
    step: 'doYouFeelDryMouth',
    type: 'prompt',
    prompt: 'Присутствует ли сухость в полости рта?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'doYouHaveDiabetes'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'problemsWithStomach'
      }
    ]
  },
  {
    step: 'problemsWithStomach',
    type: 'prompt',
    prompt: 'Присутствуют симптомы, сопровождающие нарушение работы ЖКТ?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkYourStomach'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFeelSikAndTired'
      }
    ]
  },
  {
    step: 'checkYourStomach',
    type: 'message',
    prompt: 'Рекомендована консультация гастроэнтеролога на предмет исключения гастроэзофагальной рефлюксной болезни и других заболеваний ЖКТ',
    final: true
  },
  {
    step: 'doYouFeelSikAndTired',
    type: 'prompt',
    prompt: 'Ощущаете ли вы раздражительность и усталость?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkForGlossodynia'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'doYouFeelDryMouth'
      }
    ]
  },
  {
    step: 'doYouHaveDiabetes',
    type: 'prompt',
    prompt: 'Есть ли у Вас диабет?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkForCandida'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'areYouTakingAntibiotics'
      }
    ]
  },
  {
    step: 'checkForCandida',
    type: 'message',
    prompt: 'Рекомендовано проведение посева на грибы кандида с индификацией микроорганизмов методом времяпролетной МАСС-спектрометрии и определением чувствительности к антимикотическим препаратам на предмет исключения кандидоза',
    final: true
  },
  {
    step: 'areYouTakingAntibiotics',
    type: 'prompt',
    prompt: 'Принимали ли Вы последние пол года антибиотики, гормональные препараты?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkForCandida'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'whiteCoatingOnTongue'
      }
    ]
  },
  {
    step: 'whiteCoatingOnTongue',
    type: 'prompt',
    prompt: 'Присутствует ли белый налёт на языке?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkForCandida'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'painInJaws'
      }
    ]
  },
  {
    step: 'painInJaws',
    type: 'prompt',
    prompt: 'Беспокоит ли височно-нижнечелюстной сустав (боль при жевании, хруст, щелчки сустава)?',
    options: [
      { id: 'yes', text: 'Да' },
      { id: 'no', text: 'Нет' },
    ],
    destinations: [
      {
        formula: (input: string) => input === 'yes',
        nextStep: 'checkYourJaws'
      },
      {
        formula: (input: string) => input === 'no',
        nextStep: 'checkForGalvanose'
      }
    ]
  },
  {
    step: 'checkYourJaws',
    type: 'message',
    prompt: 'Рекомендована консультация врача стоматолога на предмет исключения заболеваний ВНЧС и гальваноза',
    final: true
  },
  {
    step: 'checkForGalvanose',
    type: 'message',
    prompt: 'Рекомедована консультация врача стоматолога-ортопеда на предмет исключения гальваноза',
    final: true
  },
]
