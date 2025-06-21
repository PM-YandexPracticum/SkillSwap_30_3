import bookIcon from '../../assets/icons/book.png';
import breifcaseIcon from '../../assets/icons/briefcase.png';
import globalIcon from '../../assets/icons/global.png';
import homeIcon from '../../assets/icons/home.png';
import lifestyleIcon from '../../assets/icons/lifestyle.png';
import paletteIcon from '../../assets/icons/palette.png';

export const categories = [
  {
    category: 'Бизнес и карьера',
    subcategory: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство',
    ],
    icon: breifcaseIcon,
    color: 'EEE7F7',
  },
  {
    category: 'Иностранные языки',
    subcategory: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
    icon: globalIcon,
    color: 'EBE5C5',
  },
  {
    category: 'Дом и уют',
    subcategory: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
    icon: homeIcon,
    color: 'F7EBE5',
  },
  {
    category: 'Творчество и искусство',
    subcategory: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
    icon: paletteIcon,
    color: 'F7E7F2',
  },
  {
    category: 'Образование и развитие',
    subcategory: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
    icon: bookIcon,
    color: 'E7F2F6',
  },
  {
    category: 'Здоровье и лайфстайл',
    subcategory: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
    icon: lifestyleIcon,
    color: 'E9F7E7',
  },
];
