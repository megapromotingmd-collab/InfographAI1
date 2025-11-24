const CONTENT = {
  pricing: {
    pill: { ro: 'Prețuri', en: 'Pricing', ru: 'Цены' },
    title: { ro: 'Planuri transparente', en: 'Transparent plans', ru: 'Прозрачные планы' },
    subtitle: {
      ro: '5 încercări gratuite, apoi abonamente cu cheia ta Gemini sau planuri complete.',
      en: '5 free tries, then BYO Gemini or full plans.',
      ru: '5 проб бесплатно, затем ваш ключ Gemini или полноценные планы.'
    },
    plans: [
      { badge: 'Gratuit', price: '0$', desc: { ro: '5 încercări, fără card', en: '5 tries, no card', ru: '5 попыток, без карты' }, items: { ro: ['5 imagini/seturi demo', 'Acces editor universal', 'Fără obligații'], en: ['5 demo images/sets', 'Universal editor access', 'No commitment'], ru: ['5 демо изображений/сетов', 'Доступ к редактору', 'Без обязательств'] } },
      { badge: 'BYO API', price: '30$/lună', desc: { ro: 'Folosesti cheia ta Gemini', en: 'Use your own Gemini key', ru: 'Используете свой ключ Gemini' }, items: { ro: ['Cheie locală per user', 'Toate modulele incluse', 'Export HD/ZIP'], en: ['Local key per user', 'All modules included', 'HD/ZIP export'], ru: ['Локальный ключ на пользователя', 'Все модули включены', 'HD/ZIP экспорт'] } },
      { badge: 'Pro', price: '99$/lună', desc: { ro: 'Cheie inclusă + prioritate', en: 'Key included + priority', ru: 'Ключ включён + приоритет' }, items: { ro: ['Seturi nelimitate', 'Prioritate generare', 'Suport rapid'], en: ['Unlimited sets', 'Priority generation', 'Fast support'], ru: ['Безлимит сетов', 'Приоритет генерации', 'Быстрая поддержка'] } },
      { badge: 'White-label', price: '1000$/lună', desc: { ro: 'Brand propriu + API', en: 'Your brand + API', ru: 'Ваш бренд + API' }, items: { ro: ['White-label UI', 'SLA dedicat', 'Account manager'], en: ['White-label UI', 'Dedicated SLA', 'Account manager'], ru: ['White-label UI', 'Выделенный SLA', 'Аккаунт-менеджер'] } }
    ]
  },
  'galerie-seturi': {
    pill: { ro: 'Galerie', en: 'Gallery', ru: 'Галерея' },
    title: { ro: 'Seturi complete (15 scene)', en: 'Complete sets (15 scenes)', ru: 'Полные сеты (15 сцен)' },
    subtitle: { ro: 'Marketing, educațional, pitch, branding — consistență vizuală.', en: 'Marketing, education, pitch, branding — consistent visuals.', ru: 'Маркетинг, образование, питч, брендинг — единый стиль.' },
    sections: [
      { title: { ro: 'Marketing', en: 'Marketing', ru: 'Маркетинг' }, text: { ro: 'Campanii sociale, 4:5 și 9:16', en: 'Social campaigns, 4:5 & 9:16', ru: 'Соцкампании, 4:5 и 9:16' } },
      { title: { ro: 'Educațional', en: 'Educational', ru: 'Обучение' }, text: { ro: 'Povești pentru copii, ton blând', en: 'Kids stories, soft tone', ru: 'Детские истории, мягкий тон' } },
      { title: { ro: 'Pitch Deck', en: 'Pitch Deck', ru: 'Pitch Deck' }, text: { ro: 'Slides cu 1.5 anchor', en: 'Slides with 1.5 anchor', ru: 'Слайды с якорем 1.5' } },
      { title: { ro: 'Branding', en: 'Branding', ru: 'Брендинг' }, text: { ro: 'Logo/paletă/moodboard aplicate în set', en: 'Logo/palette/moodboard applied', ru: 'Лого/палитра/мудборд применены' } }
    ]
  },
  'studiu-caz-marketing': {
    pill: { ro: 'Studiu de caz', en: 'Case study', ru: 'Кейс' },
    title: { ro: 'Campanie socială', en: 'Social campaign', ru: 'Соцкампания' },
    subtitle: { ro: '15 scene coerente, fără drift.', en: '15 coherent scenes, no drift.', ru: '15 сцен без дрейфа.' },
    sections: [
      { title: { ro: 'Context', en: 'Context', ru: 'Контекст' }, text: { ro: 'Brand social media, personaje recurente.', en: 'Social brand, recurring characters.', ru: 'Соцбренд, повторяющиеся персонажи.' } },
      { title: { ro: 'Metodă', en: 'Method', ru: 'Метод' }, list: { ro: ['Sheet 1.5 cu paletă', 'Delay 60s + Auto-Retry', 'Editor universal pentru retuș'], en: ['Sheet 1.5 with palette', '60s delay + auto-retry', 'Universal editor for touch-ups'], ru: ['Sheet 1.5 с палитрой', 'Задержка 60с + повтор', 'Универсальный редактор для правок'] } },
      { title: { ro: 'Rezultat', en: 'Result', ru: 'Результат' }, text: { ro: 'Formate 4:5, 9:16, imagini aliniate.', en: '4:5, 9:16 formats, aligned visuals.', ru: 'Форматы 4:5, 9:16, единый стиль.' } }
    ]
  },
  'studiu-caz-educational': {
    pill: { ro: 'Studiu de caz', en: 'Case study', ru: 'Кейс' },
    title: { ro: 'Carte pentru copii', en: 'Kids storybook', ru: 'Детская книга' },
    subtitle: { ro: 'Ton prietenos, consistență de personaj.', en: 'Friendly tone, character consistency.', ru: 'Дружелюбный тон, единый персонаж.' },
    sections: [
      { title: { ro: 'Brief', en: 'Brief', ru: 'Бриф' }, text: { ro: '15 scene, vârste 5–8 ani.', en: '15 scenes, ages 5–8.', ru: '15 сцен, 5–8 лет.' } },
      { title: { ro: 'Metodă', en: 'Method', ru: 'Метод' }, list: { ro: ['Sheet 1.5 pentru față/haine', 'Formate 3:4, 4:5', 'Editor pentru expresii/culori'], en: ['Sheet 1.5 for face/clothes', '3:4, 4:5 formats', 'Editor for expressions/colors'], ru: ['Sheet 1.5 для лица/одежды', 'Форматы 3:4, 4:5', 'Редактор для выражений/цветов'] } },
      { title: { ro: 'Rezultat', en: 'Result', ru: 'Результат' }, text: { ro: 'Scene calde, fără elemente dure.', en: 'Warm scenes, no harsh elements.', ru: 'Тёплые сцены, без жёстких деталей.' } }
    ]
  },
  'studiu-caz-pitch': {
    pill: { ro: 'Studiu de caz', en: 'Case study', ru: 'Кейс' },
    title: { ro: 'Pitch deck consistent', en: 'Consistent pitch deck', ru: 'Последовательный питч' },
    subtitle: { ro: 'Sketch Builder + 1.5 anchor.', en: 'Sketch Builder + 1.5 anchor.', ru: 'Sketch Builder + якорь 1.5.' },
    sections: [
      { title: { ro: 'Pași', en: 'Steps', ru: 'Шаги' }, list: { ro: ['Layout cu Sketch Builder', 'Sheet 1.5 (brand)', 'Delay 60s, Auto-Retry', 'Retuș cu editor universal'], en: ['Layout via Sketch Builder', 'Sheet 1.5 (brand)', '60s delay, auto-retry', 'Touch-up with universal editor'], ru: ['Макет через Sketch Builder', 'Sheet 1.5 (бренд)', 'Задержка 60с, ретраи', 'Правки через редактор'] } },
      { title: { ro: 'Rezultat', en: 'Result', ru: 'Результат' }, text: { ro: 'Culori brand, imagini aliniate pe slide-uri.', en: 'Brand colors, aligned visuals across slides.', ru: 'Брендовые цвета, единые изображения по слайдам.' } }
    ]
  },
  'studiu-caz-branding': {
    pill: { ro: 'Studiu de caz', en: 'Case study', ru: 'Кейс' },
    title: { ro: 'Branding complet', en: 'Complete branding', ru: 'Полный брендинг' },
    subtitle: { ro: 'Brief → overview → logo/paletă/moodboard.', en: 'Brief → overview → logo/palette/moodboard.', ru: 'Бриф → обзор → лого/палитра/мудборд.' },
    sections: [
      { title: { ro: 'Brief', en: 'Brief', ru: 'Бриф' }, text: { ro: 'Nume, industrie, public, valori, ton, culori.', en: 'Name, industry, audience, values, tone, colors.', ru: 'Название, индустрия, аудитория, ценности, тон, цвета.' } },
      { title: { ro: 'Generare', en: 'Generation', ru: 'Генерация' }, list: { ro: ['Overview textual', 'Logo concepts', 'Paletă principală/extinsă', 'Moodboard & aplicații'], en: ['Textual overview', 'Logo concepts', 'Primary/extended palette', 'Moodboard & applications'], ru: ['Текстовый обзор', 'Концепты лого', 'Основная/расширенная палитра', 'Мудборд и применения'] } },
      { title: { ro: 'Editare', en: 'Editing', ru: 'Правка' }, text: { ro: 'Editor universal pentru retuș local, fără drift.', en: 'Universal editor for local tweaks, no drift.', ru: 'Универсальный редактор для правок без дрейфа.' } }
    ]
  },
  faq: {
    pill: { ro: 'FAQ', en: 'FAQ', ru: 'FAQ' },
    title: { ro: 'Întrebări frecvente', en: 'Frequently asked questions', ru: 'Частые вопросы' },
    subtitle: { ro: 'Cheie Gemini, seturi, editor, consistență.', en: 'Gemini key, sets, editor, consistency.', ru: 'Ключ Gemini, сеты, редактор, консистентность.' },
    sections: [
      { title: { ro: 'Cheia Gemini', en: 'Gemini key', ru: 'Ключ Gemini' }, text: { ro: 'Setezi în Project Hub; prioritate: local > AI Studio > env.', en: 'Set in Project Hub; priority: local > AI Studio > env.', ru: 'Настройка в Project Hub; приоритет: local > AI Studio > env.' } },
      { title: { ro: 'Sheet 1.5', en: 'Sheet 1.5', ru: 'Sheet 1.5' }, text: { ro: 'Ancoră vizuală cu paletă/texture.', en: 'Visual anchor with palette/texture.', ru: 'Якорь с палитрой/текстурами.' } },
      { title: { ro: 'Editor', en: 'Editor', ru: 'Редактор' }, text: { ro: 'Desenezi/scrii pe imagine; AI modifică doar zona marcată.', en: 'Draw/write on image; AI edits only marked area.', ru: 'Рисуете/пишете; ИИ меняет только отмеченную зону.' } },
      { title: { ro: 'Drift', en: 'Drift', ru: 'Дрейф' }, text: { ro: 'Folosește 1.5 + delay 60s + Auto-Retry.', en: 'Use 1.5 + 60s delay + Auto-Retry.', ru: 'Используйте 1.5 + задержка 60с + авто-повторы.' } }
    ]
  },
  'ghid-consistenta': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Consistență absolută', en: 'Absolute consistency', ru: 'Абсолютная консистентность' },
    subtitle: { ro: 'Sheet 1.5, Zero Tolerance, Delay 60s, Auto-Retry.', en: 'Sheet 1.5, Zero Tolerance, 60s delay, Auto-Retry.', ru: 'Sheet 1.5, Zero Tolerance, задержка 60с, Auto-Retry.' },
    sections: [
      { title: { ro: 'Sheet 1.5', en: 'Sheet 1.5', ru: 'Sheet 1.5' }, text: { ro: 'Panou DNA: paletă, material, lumină.', en: 'DNA panel: palette, material, light.', ru: 'DNA панель: палитра, материал, свет.' } },
      { title: { ro: 'Batch control', en: 'Batch control', ru: 'Контроль батча' }, text: { ro: 'Delay 60s + Auto-Retry pentru stabilitate.', en: '60s delay + Auto-Retry for stability.', ru: 'Задержка 60с + Auto-Retry для стабильности.' } },
      { title: { ro: 'Editor', en: 'Editor', ru: 'Редактор' }, text: { ro: 'Retuș local fără a schimba stilul global.', en: 'Local tweaks without changing global style.', ru: 'Локальные правки без смены стиля.' } }
    ]
  },
  'ghid-editor': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Editor universal', en: 'Universal editor', ru: 'Универсальный редактор' },
    subtitle: { ro: 'Desen + text pe imagine, aceeași componentă peste tot.', en: 'Draw + text on image, one component everywhere.', ru: 'Рисование + текст, один компонент везде.' },
    sections: [
      { title: { ro: 'Flux', en: 'Flow', ru: 'Процесс' }, text: { ro: 'Click → fullscreen → modul editare → salvezi versiune nouă.', en: 'Click → fullscreen → edit mode → save new version.', ru: 'Клик → fullscreen → режим редактирования → сохранить новую версию.' } },
      { title: { ro: 'Reguli', en: 'Rules', ru: 'Правила' }, list: { ro: ['Modifici doar zona marcată', 'Nu schimbi stilul/identitatea', 'Nu lași adnotări în rezultat'], en: ['Edit only marked area', 'Don’t change style/identity', 'Remove annotations in final'], ru: ['Править только отмеченное', 'Не менять стиль/идентичность', 'Аннотаций в финале нет'] } }
    ]
  },
  'ghid-storyboard': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Storyboard SET/SCENE', en: 'Storyboard SET/SCENE', ru: 'Storyboard SET/SCENE' },
    subtitle: { ro: 'Structură clară pentru 15 scene.', en: 'Clear structure for 15 scenes.', ru: 'Чёткая структура для 15 сцен.' },
    sections: [
      { title: { ro: 'Format', en: 'Format', ru: 'Формат' }, text: { ro: 'SET cu context global; SCENE numerotate, descrieri scurte.', en: 'SET with global context; SCENES numbered, concise.', ru: 'SET с общим контекстом; SCENE с номерами и краткими описаниями.' } },
      { title: { ro: 'Bune practici', en: 'Best practices', ru: 'Практики' }, list: { ro: ['Include ton/epocă/lumină în SET', 'Evită contradicții între scene', 'Folosește 1.5 ca referință'], en: ['Add tone/era/light in SET', 'Avoid contradictions between scenes', 'Use 1.5 as reference'], ru: ['Добавляйте тон/эпоху/свет в SET', 'Без противоречий между сценами', 'Используйте 1.5 как референс'] } }
    ]
  },
  'ghid-pitch': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Pitch deck AI', en: 'AI pitch deck', ru: 'AI pitch deck' },
    subtitle: { ro: 'Structură, Sketch Builder, consistență.', en: 'Structure, Sketch Builder, consistency.', ru: 'Структура, Sketch Builder, консистентность.' },
    sections: [
      { title: { ro: 'Structură', en: 'Structure', ru: 'Структура' }, text: { ro: 'Problemă, Soluție, Tracțiune, Model, Roadmap, Echipa, Ask.', en: 'Problem, Solution, Traction, Model, Roadmap, Team, Ask.', ru: 'Проблема, Решение, Тракшн, Модель, Roadmap, Команда, Ask.' } },
      { title: { ro: 'Sketch Builder', en: 'Sketch Builder', ru: 'Sketch Builder' }, text: { ro: 'Desenezi cutii + notițe; AI respectă layout-ul.', en: 'Draw boxes + notes; AI respects layout.', ru: 'Рисуете блоки и заметки; ИИ соблюдает макет.' } },
      { title: { ro: 'Consistență', en: 'Consistency', ru: 'Консистентность' }, text: { ro: 'Sheet 1.5 brand, delay 60s, Auto-Retry, editor universal.', en: 'Brand 1.5, 60s delay, Auto-Retry, universal editor.', ru: 'Бренд 1.5, задержка 60с, Auto-Retry, редактор.' } }
    ]
  },
  'ghid-carte-copii': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Cărți pentru copii', en: 'Kids books', ru: 'Детские книги' },
    subtitle: { ro: 'Ton prietenos, stil blând, consistență.', en: 'Friendly tone, soft style, consistency.', ru: 'Дружелюбный тон, мягкий стиль, консистентность.' },
    sections: [
      { title: { ro: 'Brief', en: 'Brief', ru: 'Бриф' }, text: { ro: 'Vârstă, preferințe, ton, stil, SET/SCENE.', en: 'Age, preferences, tone, style, SET/SCENE.', ru: 'Возраст, предпочтения, тон, стиль, SET/SCENE.' } },
      { title: { ro: 'Siguranță', en: 'Safety', ru: 'Безопасность' }, text: { ro: 'Evită teme dure; folosește stiluri prietenoase (watercolor, storybook).', en: 'Avoid harsh themes; use friendly styles (watercolor, storybook).', ru: 'Избегайте жёстких тем; дружелюбные стили (watercolor, storybook).' } },
      { title: { ro: 'Editare', en: 'Editing', ru: 'Правка' }, text: { ro: 'Corectezi expresii/culori în editor fără drift.', en: 'Fix expressions/colors in editor without drift.', ru: 'Правки выражений/цветов без дрейфа.' } }
    ]
  },
  'ghid-branding': {
    pill: { ro: 'Ghid', en: 'Guide', ru: 'Гид' },
    title: { ro: 'Branding & Design Kit', en: 'Branding & Design Kit', ru: 'Branding & Design Kit' },
    subtitle: { ro: 'Brief → overview → logo/paletă/moodboard/aplicații.', en: 'Brief → overview → logo/palette/moodboard/applications.', ru: 'Бриф → обзор → лого/палитра/мудборд/применения.' },
    sections: [
      { title: { ro: 'Brief', en: 'Brief', ru: 'Бриф' }, text: { ro: 'Nume, industrie, public, valori, ton, culori, referințe.', en: 'Name, industry, audience, values, tone, colors, references.', ru: 'Название, индустрия, аудитория, ценности, тон, цвета, референсы.' } },
      { title: { ro: 'Asset-uri', en: 'Assets', ru: 'Активы' }, list: { ro: ['Overview textual', 'Logo concepts', 'Paletă principală/extinsă', 'Moodboard, mock-uri aplicații'], en: ['Text overview', 'Logo concepts', 'Primary/extended palette', 'Moodboard, mock applications'], ru: ['Текстовый обзор', 'Концепты лого', 'Основная/расширенная палитра', 'Мудборд, мокапы'] } },
      { title: { ro: 'Editare', en: 'Editing', ru: 'Правка' }, text: { ro: 'Editor universal pentru retușuri locale.', en: 'Universal editor for local tweaks.', ru: 'Универсальный редактор для локальных правок.' } }
    ]
  },
  'pentru-agentii': {
    pill: { ro: 'Use case', en: 'Use case', ru: 'Кейс' },
    title: { ro: 'Pentru agenții', en: 'For agencies', ru: 'Для агентств' },
    subtitle: { ro: 'Multi-proiect, brand kit, pitch, storyboard.', en: 'Multi-project, brand kit, pitch, storyboard.', ru: 'Мультипроект, бренд-кит, питч, сториборд.' },
    sections: [
      { title: { ro: 'Hub', en: 'Hub', ru: 'Хаб' }, text: { ro: 'Project Hub: template-uri, cheie per user.', en: 'Project Hub: templates, key per user.', ru: 'Project Hub: шаблоны, ключ на пользователя.' } },
      { title: { ro: 'Brand Kit', en: 'Brand Kit', ru: 'Brand Kit' }, text: { ro: 'Brief + asset-uri editabile.', en: 'Brief + editable assets.', ru: 'Бриф + редактируемые активы.' } },
      { title: { ro: 'Pitch & Storyboard', en: 'Pitch & Storyboard', ru: 'Pitch & Storyboard' }, text: { ro: 'Sketch Builder + SET/SCENE + 1.5.', en: 'Sketch Builder + SET/SCENE + 1.5.', ru: 'Sketch Builder + SET/SCENE + 1.5.' } }
    ]
  },
  'pentru-educatori': {
    pill: { ro: 'Use case', en: 'Use case', ru: 'Кейс' },
    title: { ro: 'Pentru educatori', en: 'For educators', ru: 'Для педагогов' },
    subtitle: { ro: 'Storybooks, materiale vizuale sigure.', en: 'Storybooks, safe visuals.', ru: 'Сторибуки, безопасные визуалы.' },
    sections: [
      { title: { ro: 'Povești', en: 'Stories', ru: 'Истории' }, text: { ro: 'Stiluri prietenoase, ton blând.', en: 'Friendly styles, soft tone.', ru: 'Дружелюбные стили, мягкий тон.' } },
      { title: { ro: 'Materiale lecție', en: 'Lesson materials', ru: 'Материалы уроков' }, text: { ro: 'Formate 4:3/16:9 pentru clase.', en: '4:3/16:9 formats for class.', ru: 'Форматы 4:3/16:9 для уроков.' } },
      { title: { ro: 'Editare', en: 'Editing', ru: 'Правка' }, text: { ro: 'Retuș local în editor universal.', en: 'Local edits in universal editor.', ru: 'Локальные правки в редакторе.' } }
    ]
  },
  'pentru-startupuri': {
    pill: { ro: 'Use case', en: 'Use case', ru: 'Кейс' },
    title: { ro: 'Pentru startup-uri', en: 'For startups', ru: 'Для стартапов' },
    subtitle: { ro: 'Pitch + branding + social bundle.', en: 'Pitch + branding + social bundle.', ru: 'Pitch + брендинг + соцпакет.' },
    sections: [
      { title: { ro: 'Pitch deck', en: 'Pitch deck', ru: 'Pitch deck' }, text: { ro: 'Sketch Builder + 1.5 + delay.', en: 'Sketch Builder + 1.5 + delay.', ru: 'Sketch Builder + 1.5 + задержка.' } },
      { title: { ro: 'Brand kit', en: 'Brand kit', ru: 'Brand kit' }, text: { ro: 'Logo/paletă/moodboard aplicate.', en: 'Logo/palette/moodboard applied.', ru: 'Лого/палитра/мудборд применены.' } },
      { title: { ro: 'Social', en: 'Social', ru: 'Соцсети' }, text: { ro: '1:1, 4:5, 9:16 + CTA.', en: '1:1, 4:5, 9:16 + CTA.', ru: '1:1, 4:5, 9:16 + CTA.' } }
    ]
  },
  'pentru-creatorii': {
    pill: { ro: 'Use case', en: 'Use case', ru: 'Кейс' },
    title: { ro: 'Pentru creatori', en: 'For creators', ru: 'Для креаторов' },
    subtitle: { ro: 'Storytelling, covers, brand personal.', en: 'Storytelling, covers, personal brand.', ru: 'Сторителлинг, обложки, личный бренд.' },
    sections: [
      { title: { ro: 'Storytelling', en: 'Storytelling', ru: 'Сторителлинг' }, text: { ro: 'SET/SCENE, stil unic, 1.5.', en: 'SET/SCENE, unique style, 1.5.', ru: 'SET/SCENE, уникальный стиль, 1.5.' } },
      { title: { ro: 'Social bundle', en: 'Social bundle', ru: 'Соцпакет' }, text: { ro: 'Formate multiple + ZIP.', en: 'Multiple formats + ZIP.', ru: 'Мультиформаты + ZIP.' } },
      { title: { ro: 'Brand personal', en: 'Personal brand', ru: 'Личный бренд' }, text: { ro: 'Paletă + moodboard + aplicații simple.', en: 'Palette + moodboard + simple apps.', ru: 'Палитра + мудборд + простые применения.' } }
    ]
  },
  'roadmap-changelog': {
    pill: { ro: 'Roadmap', en: 'Roadmap', ru: 'Roadmap' },
    title: { ro: 'Roadmap & Changelog', en: 'Roadmap & Changelog', ru: 'Roadmap & Changelog' },
    subtitle: { ro: 'Lansat, În lucru, Planificat.', en: 'Released, In progress, Planned.', ru: 'Релизы, В работе, План.' },
    sections: [
      { title: { ro: 'Lansat', en: 'Released', ru: 'Релизы' }, list: { ro: ['Editor universal', 'Sheet 1.5 + delay 60s', 'Project Hub + cheie per user', 'Brand Kit nou'], en: ['Universal editor', 'Sheet 1.5 + 60s delay', 'Project Hub + per-user key', 'New Brand Kit'], ru: ['Универсальный редактор', 'Sheet 1.5 + задержка 60с', 'Project Hub + ключ на пользователя', 'Новый Brand Kit'] } },
      { title: { ro: 'În lucru', en: 'In progress', ru: 'В работе' }, list: { ro: ['Galerii publice extinse', 'Documentație SEO'], en: ['Extended public galleries', 'SEO docs'], ru: ['Расширенные галереи', 'SEO документация'] } },
      { title: { ro: 'Planificat', en: 'Planned', ru: 'План' }, list: { ro: ['API public generare', 'Template-uri noi pitch/storybook'], en: ['Public generation API', 'New pitch/storybook templates'], ru: ['Публичный API генерации', 'Новые шаблоны pitch/storybook'] } }
    ]
  },
  'status-sistem': {
    pill: { ro: 'Status', en: 'Status', ru: 'Статус' },
    title: { ro: 'Status Sistem', en: 'System Status', ru: 'Статус системы' },
    subtitle: { ro: 'Uptime, componente, contacte suport.', en: 'Uptime, components, support.', ru: 'Аптайм, компоненты, поддержка.' },
    sections: [
      { title: { ro: 'Generare imagini', en: 'Image generation', ru: 'Генерация изображений' }, text: { ro: 'Online, monitorizare latențe.', en: 'Online, latency monitored.', ru: 'Онлайн, мониторинг задержек.' } },
      { title: { ro: 'Sheet 1.5', en: 'Sheet 1.5', ru: 'Sheet 1.5' }, text: { ro: 'Online, 2K output.', en: 'Online, 2K output.', ru: 'Онлайн, 2K вывод.' } },
      { title: { ro: 'Editor universal', en: 'Universal editor', ru: 'Универсальный редактор' }, text: { ro: 'Online, salvare versiuni.', en: 'Online, version save.', ru: 'Онлайн, сохранение версий.' } },
      { title: { ro: 'Project Hub', en: 'Project Hub', ru: 'Project Hub' }, text: { ro: 'Online, cheie per user.', en: 'Online, per-user key.', ru: 'Онлайн, ключ на пользователя.' } }
    ]
  },
  'suport-contact': {
    pill: { ro: 'Suport', en: 'Support', ru: 'Поддержка' },
    title: { ro: 'Contactează-ne', en: 'Contact us', ru: 'Свяжитесь с нами' },
    subtitle: { ro: 'Întrebări despre generare, chei, fluxuri.', en: 'Questions on generation, keys, flows.', ru: 'Вопросы по генерации, ключам, потокам.' },
    sections: [
      { title: { ro: 'Email', en: 'Email', ru: 'Email' }, text: { ro: 'hello@infographai.com', en: 'hello@infographai.com', ru: 'hello@infographai.com' } },
      { title: { ro: 'Status', en: 'Status', ru: 'Статус' }, text: { ro: 'Vezi pagina Status Sistem.', en: 'See System Status page.', ru: 'Смотрите страницу статуса.' } },
      { title: { ro: 'FAQ', en: 'FAQ', ru: 'FAQ' }, text: { ro: 'Vezi pagina FAQ pentru detalii.', en: 'See FAQ page.', ru: 'Смотрите FAQ.' } }
    ]
  },
  blog: {
    pill: { ro: 'Blog', en: 'Blog', ru: 'Блог' },
    title: { ro: 'Articole și ghiduri', en: 'Articles & guides', ru: 'Статьи и гайды' },
    subtitle: { ro: 'Storyboard, branding, pitch, editor.', en: 'Storyboard, branding, pitch, editor.', ru: 'Storyboard, брендинг, pitch, редактор.' },
    sections: [
      { title: { ro: 'Sheet 1.5', en: 'Sheet 1.5', ru: 'Sheet 1.5' }, text: { ro: 'Ancoră vizuală pentru consistență.', en: 'Visual anchor for consistency.', ru: 'Визуальный якорь консистентности.' } },
      { title: { ro: 'Editor universal', en: 'Universal editor', ru: 'Универсальный редактор' }, text: { ro: 'Desenezi/scrii; AI editează local.', en: 'Draw/write; AI edits locally.', ru: 'Рисуете/пишете; ИИ правит локально.' } },
      { title: { ro: 'Sketch Builder', en: 'Sketch Builder', ru: 'Sketch Builder' }, text: { ro: 'Layout pentru pitch-uri.', en: 'Layout for pitches.', ru: 'Макет для питчей.' } }
    ]
  },
  'blog-template': {
    pill: { ro: 'Articol', en: 'Article', ru: 'Статья' },
    title: { ro: 'Titlu SEO', en: 'SEO Title', ru: 'SEO Заголовок' },
    subtitle: { ro: 'Meta descriere scurtă despre subiect.', en: 'Short meta description.', ru: 'Краткое описание.' },
    sections: [
      { title: { ro: 'Introducere', en: 'Intro', ru: 'Введение' }, text: { ro: 'Paragraf introductiv.', en: 'Intro paragraph.', ru: 'Вступительный абзац.' } },
      { title: { ro: 'Beneficii', en: 'Benefits', ru: 'Преимущества' }, list: { ro: ['Beneficiu 1', 'Beneficiu 2', 'Beneficiu 3'], en: ['Benefit 1', 'Benefit 2', 'Benefit 3'], ru: ['Преимущество 1', 'Преимущество 2', 'Преимущество 3'] } }
    ]
  },
  'politica-confidentialitate': {
    pill: { ro: 'Legal', en: 'Legal', ru: 'Право' },
    title: { ro: 'Politica de Confidențialitate', en: 'Privacy Policy', ru: 'Политика конфиденциальности' },
    subtitle: { ro: 'Date și imagini gestionate responsabil.', en: 'Data and images handled responsibly.', ru: 'Данные и изображения обрабатываются ответственно.' },
    sections: [
      { title: { ro: 'Date personale', en: 'Personal data', ru: 'Персональные данные' }, text: { ro: 'Nu vindem sau partajăm fără consimțământ.', en: 'We do not sell/share without consent.', ru: 'Не продаём и не делимся без согласия.' } },
      { title: { ro: 'Imagini', en: 'Images', ru: 'Изображения' }, text: { ro: 'Originalele nu sunt distruse; versiunile se salvează separat.', en: 'Originals kept; versions saved separately.', ru: 'Оригиналы сохраняются; версии отдельно.' } },
      { title: { ro: 'Cheie Gemini', en: 'Gemini key', ru: 'Ключ Gemini' }, text: { ro: 'Salvată local în browser (localStorage).', en: 'Stored locally in browser.', ru: 'Хранится локально в браузере.' } }
    ]
  },
  'termeni-conditii': {
    pill: { ro: 'Legal', en: 'Legal', ru: 'Право' },
    title: { ro: 'Termeni și Condiții', en: 'Terms & Conditions', ru: 'Условия' },
    subtitle: { ro: 'Utilizarea platformei InfographAI.', en: 'Use of InfographAI platform.', ru: 'Использование платформы InfographAI.' },
    sections: [
      { title: { ro: 'Conținut', en: 'Content', ru: 'Контент' }, text: { ro: 'Userii sunt responsabili de materialele încărcate.', en: 'Users are responsible for uploaded material.', ru: 'Пользователи ответственны за загружаемый контент.' } },
      { title: { ro: 'Limitări', en: 'Limits', ru: 'Ограничения' }, text: { ro: 'Fără materiale ilegale sau ofensatoare.', en: 'No illegal or offensive material.', ru: 'Запрещён незаконный/оскорбительный контент.' } },
      { title: { ro: 'Planuri', en: 'Plans', ru: 'Планы' }, text: { ro: 'Planurile pot fi ajustate și anunțate.', en: 'Plans may change with notice.', ru: 'Планы могут меняться с уведомлением.' } }
    ]
  },
  'acces-api': {
    pill: { ro: 'API', en: 'API', ru: 'API' },
    title: { ro: 'Acces API & Integrări', en: 'API Access & Integrations', ru: 'Доступ API и интеграции' },
    subtitle: { ro: 'Cheie per user, AI Studio, env.', en: 'Per-user key, AI Studio, env.', ru: 'Ключ на пользователя, AI Studio, env.' },
    sections: [
      { title: { ro: 'Prioritate chei', en: 'Key priority', ru: 'Приоритет ключей' }, text: { ro: 'Local > AI Studio > env.', en: 'Local > AI Studio > env.', ru: 'Local > AI Studio > env.' } },
      { title: { ro: 'Stocare', en: 'Storage', ru: 'Хранение' }, text: { ro: 'LocalStorage, nu se trimite la server.', en: 'LocalStorage, not sent to server.', ru: 'LocalStorage, не отправляется на сервер.' } },
      { title: { ro: 'Planuri', en: 'Plans', ru: 'Планы' }, text: { ro: 'BYO API la 30$/lună, Pro/White-label disponibile.', en: 'BYO API at $30/mo, Pro/White-label available.', ru: 'BYO API $30/мес, Pro/White-label доступны.' } }
    ]
  },
  'onboarding-rapid': {
    pill: { ro: 'Onboarding', en: 'Onboarding', ru: 'Онбординг' },
    title: { ro: '3 pași rapizi', en: '3 quick steps', ru: '3 быстрых шага' },
    subtitle: { ro: 'Setezi cheia, generezi, editezi.', en: 'Set key, generate, edit.', ru: 'Настрой ключ, генерируй, редактируй.' },
    sections: [
      { title: { ro: '1. Cheie', en: '1. Key', ru: '1. Ключ' }, text: { ro: 'Project Hub → Gemini API.', en: 'Project Hub → Gemini API.', ru: 'Project Hub → Gemini API.' } },
      { title: { ro: '2. Brief', en: '2. Brief', ru: '2. Бриф' }, text: { ro: 'Alege modul: storyboard, pitch, book, brand.', en: 'Choose module: storyboard, pitch, book, brand.', ru: 'Выберите модуль: storyboard, pitch, book, brand.' } },
      { title: { ro: '3. Editare', en: '3. Edit', ru: '3. Правка' }, text: { ro: 'Viewer universal pentru retuș local.', en: 'Universal viewer for local edits.', ru: 'Универсальный viewer для правок.' } }
    ]
  },
  'galerie-stiluri-extinsa': {
    pill: { ro: 'Stiluri', en: 'Styles', ru: 'Стили' },
    title: { ro: '20+ Stiluri Artistice', en: '20+ Artistic Styles', ru: '20+ художественных стилей' },
    subtitle: { ro: 'Photorealistic, Anime, 3D, Clay, Watercolor, Comic, Vector, Oil, Storybook etc.', en: 'Photorealistic, Anime, 3D, Clay, Watercolor, Comic, Vector, Oil, Storybook etc.', ru: 'Фотореализм, Аниме, 3D, Clay, Акварель, Комикс, Вектор, Масло, Storybook и др.' },
    sections: [
      { title: { ro: 'Realistic/3D', en: 'Realistic/3D', ru: 'Реализм/3D' }, text: { ro: 'Photorealistic, 3D Render, Claymation.', en: 'Photorealistic, 3D Render, Claymation.', ru: 'Фотореализм, 3D Render, Claymation.' } },
      { title: { ro: 'Ilustrație', en: 'Illustration', ru: 'Иллюстрация' }, text: { ro: 'Anime, Comic, Watercolor, Storybook.', en: 'Anime, Comic, Watercolor, Storybook.', ru: 'Anime, Comic, Watercolor, Storybook.' } },
      { title: { ro: 'Vector/Minimal', en: 'Vector/Minimal', ru: 'Вектор/Минимал' }, text: { ro: 'Vector clean, Flat, Minimal.', en: 'Vector clean, Flat, Minimal.', ru: 'Vector clean, Flat, Minimal.' } }
    ]
  },
  'design-tokens': {
    pill: { ro: 'Design', en: 'Design', ru: 'Дизайн' },
    title: { ro: 'Design Tokens (descrieri)', en: 'Design tokens (descriptions)', ru: 'Design tokens (описания)' },
    subtitle: { ro: 'Palete, butoane, carduri, badges — descriere stil.', en: 'Palettes, buttons, cards, badges — style description.', ru: 'Палитры, кнопки, карточки, бейджи — описание стиля.' },
    sections: [
      { title: { ro: 'Paletă', en: 'Palette', ru: 'Палитра' }, text: { ro: 'Bg #0A0A0A, text #F5F5F0, accent #C15F3C/#D4785A, bordură #262625.', en: 'Bg #0A0A0A, text #F5F5F0, accent #C15F3C/#D4785A, border #262625.', ru: 'Bg #0A0A0A, текст #F5F5F0, акцент #C15F3C/#D4785A, бордюр #262625.' } },
      { title: { ro: 'Buton', en: 'Button', ru: 'Кнопка' }, text: { ro: 'Pill, accent, beam/glow la hover.', en: 'Pill, accent, beam/glow on hover.', ru: 'Pill, акцент, beam/glow при hover.' } },
      { title: { ro: 'Card glass', en: 'Glass card', ru: 'Glass card' }, text: { ro: 'Fond semitransparent, blur, border fin.', en: 'Semi-transparent background, blur, thin border.', ru: 'Полупрозрачный фон, blur, тонкая рамка.' } }
    ]
  },
  'exemple-social': {
    pill: { ro: 'Exemple', en: 'Examples', ru: 'Примеры' },
    title: { ro: 'Social Media', en: 'Social media', ru: 'Соцсети' },
    subtitle: { ro: 'Formate 1:1, 4:5, 9:16 cu CTA.', en: 'Formats 1:1, 4:5, 9:16 with CTA.', ru: 'Форматы 1:1, 4:5, 9:16 с CTA.' },
    sections: [
      { title: { ro: '1:1', en: '1:1', ru: '1:1' }, text: { ro: 'Postări feed, text minimal.', en: 'Feed posts, minimal text.', ru: 'Посты в ленте, минимум текста.' } },
      { title: { ro: '4:5', en: '4:5', ru: '4:5' }, text: { ro: 'Portret IG, vizibilitate mare.', en: 'IG portrait, high visibility.', ru: 'IG портрет, высокая видимость.' } },
      { title: { ro: '9:16', en: '9:16', ru: '9:16' }, text: { ro: 'Stories/Reels cu spațiu CTA.', en: 'Stories/Reels with CTA space.', ru: 'Stories/Reels с зоной CTA.' } }
    ]
  },
  'exemple-slide-pitch': {
    pill: { ro: 'Exemple', en: 'Examples', ru: 'Примеры' },
    title: { ro: 'Slide-uri Pitch', en: 'Pitch slides', ru: 'Слайды Pitch' },
    subtitle: { ro: 'Problemă, Soluție, Tracțiune, Model, Roadmap.', en: 'Problem, Solution, Traction, Model, Roadmap.', ru: 'Проблема, Решение, Тракшн, Модель, Roadmap.' },
    sections: [
      { title: { ro: 'Problemă', en: 'Problem', ru: 'Проблема' }, text: { ro: 'Text concis + imagine brand.', en: 'Concise text + brand image.', ru: 'Краткий текст + брендовая картинка.' } },
      { title: { ro: 'Soluție', en: 'Solution', ru: 'Решение' }, text: { ro: 'Vizual clar, respectă paleta.', en: 'Clear visual, keep palette.', ru: 'Чёткий визуал, палитра соблюдена.' } },
      { title: { ro: 'Tracțiune', en: 'Traction', ru: 'Тракшн' }, text: { ro: 'Grafice lizibile, editabile.', en: 'Legible charts, editable.', ru: 'Читаемые графики, редактируемые.' } }
    ]
  },
  'exemple-storybook': {
    pill: { ro: 'Exemple', en: 'Examples', ru: 'Примеры' },
    title: { ro: 'Storybook', en: 'Storybook', ru: 'Storybook' },
    subtitle: { ro: 'Scene prietenoase, consistență de personaj.', en: 'Friendly scenes, character consistency.', ru: 'Дружелюбные сцены, консистентный персонаж.' },
    sections: [
      { title: { ro: 'Scene 1-5', en: 'Scenes 1-5', ru: 'Сцены 1-5' }, text: { ro: 'Introducere, context.', en: 'Intro, context.', ru: 'Введение, контекст.' } },
      { title: { ro: 'Scene 6-10', en: 'Scenes 6-10', ru: 'Сцены 6-10' }, text: { ro: 'Acțiune, ton blând.', en: 'Action, soft tone.', ru: 'Действие, мягкий тон.' } },
      { title: { ro: 'Scene 11-15', en: 'Scenes 11-15', ru: 'Сцены 11-15' }, text: { ro: 'Rezolvare, final prietenos.', en: 'Resolution, friendly end.', ru: 'Развязка, дружелюбный финал.' } }
    ]
  }
};

const PAGE_META = (key, lang = 'ro') => {
  const d = CONTENT[key];
  if (!d) return { title: 'InfographAI', desc: 'Vizual AI' };
  return {
    title: `${d.title?.[lang] || 'InfographAI'} — InfographAI`,
    desc: d.subtitle?.[lang] || 'Consistență vizuală cu AI.'
  };
};

function renderPage() {
  const body = document.body;
  const pageKey = body.dataset.page;
  const langDefault = 'ro';
  const state = { lang: langDefault };
  const data = CONTENT[pageKey];
  if (!data) {
    document.body.innerHTML = '<main style="max-width:800px;margin:40px auto;color:#fff;">Pagina nu are conținut definit.</main>';
    return;
  }

  // set meta title/description
  const meta = PAGE_META(pageKey, langDefault);
  document.title = meta.title;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = meta.desc;

  const root = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'header';
  const pill = document.createElement('span');
  pill.className = 'pill';
  pill.textContent = data.pill[langDefault];
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = data.title[langDefault];
  const subtitle = document.createElement('div');
  subtitle.className = 'subtitle';
  subtitle.textContent = data.subtitle[langDefault];
  const langSwitch = document.createElement('div');
  langSwitch.className = 'lang-switch';
  ['ro','en','ru'].forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn' + (l===langDefault ? ' active' : '');
    btn.textContent = l.toUpperCase();
    btn.onclick = () => {
      state.lang = l;
      pill.textContent = data.pill[l];
      title.textContent = data.title[l];
      subtitle.textContent = data.subtitle[l];
      const metaNow = PAGE_META(pageKey, l);
      document.title = metaNow.title;
      metaDesc.content = metaNow.desc;
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        el.textContent = (data.sections || []).find(s => s.title[langDefault] === key)?.title[l] || key;
      });
      document.querySelectorAll('[data-i18n-text]').forEach(el => {
        const key = el.dataset.i18nText;
        const sec = (data.sections || []).find(s => s.text && s.text[langDefault] === key);
        if (sec) el.textContent = sec.text[l];
      });
      document.querySelectorAll('[data-i18n-list]').forEach(el => {
        const key = el.dataset.i18nList;
        const sec = (data.sections || []).find(s => s.list && s.list[langDefault] && s.list[langDefault].join('|') === key);
        if (sec) {
          el.innerHTML = '';
          sec.list[l].forEach(item => { const li=document.createElement('li'); li.textContent=item; el.appendChild(li); });
        }
      });
      if (data.plans) {
        document.querySelectorAll('[data-plan-badge]').forEach((el,i)=>{el.textContent=data.plans[i].badge;});
        document.querySelectorAll('[data-plan-price]').forEach((el,i)=>{el.textContent=data.plans[i].price;});
        document.querySelectorAll('[data-plan-desc]').forEach((el,i)=>{el.textContent=data.plans[i].desc[l];});
        document.querySelectorAll('[data-plan-list]').forEach((el,i)=>{el.innerHTML='';data.plans[i].items[l].forEach(item=>{const li=document.createElement('li');li.textContent=item;el.appendChild(li);});});
      }
    };
    langSwitch.appendChild(btn);
  });
  header.append(pill,title,subtitle,langSwitch);
  root.appendChild(header);

  if (data.plans) {
    const plansWrap = document.createElement('div');
    plansWrap.className = 'plans';
    data.plans.forEach(plan => {
      const div = document.createElement('div');
      div.className = 'plan';
      const b = document.createElement('div'); b.className='badge'; b.dataset.planBadge='true'; b.textContent=plan.badge; div.appendChild(b);
      const h = document.createElement('h2'); h.dataset.planPrice='true'; h.textContent=plan.price; div.appendChild(h);
      const p = document.createElement('p'); p.className='subtitle'; p.dataset.planDesc='true'; p.textContent=plan.desc[langDefault]; div.appendChild(p);
      const ul = document.createElement('ul'); ul.className='list'; ul.dataset.planList='true'; plan.items[langDefault].forEach(item=>{const li=document.createElement('li'); li.textContent=item; ul.appendChild(li);}); div.appendChild(ul);
      const btn = document.createElement('a'); btn.className='btn'; btn.href='#'; btn.textContent='Selectează'; div.appendChild(btn);
      plansWrap.appendChild(div);
    });
    root.appendChild(plansWrap);
  }

  if (data.sections) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    data.sections.forEach(sec => {
      const card = document.createElement('div'); card.className='card';
      const h = document.createElement('h3'); h.dataset.i18nTitle = sec.title[langDefault]; h.textContent = sec.title[langDefault]; card.appendChild(h);
      if (sec.text) { const p = document.createElement('p'); p.dataset.i18nText = sec.text[langDefault]; p.textContent = sec.text[langDefault]; card.appendChild(p); }
      if (sec.list) { const ul = document.createElement('ul'); ul.className='list'; ul.dataset.i18nList = sec.list[langDefault].join('|'); sec.list[langDefault].forEach(item=>{const li=document.createElement('li'); li.textContent=item; ul.appendChild(li);}); card.appendChild(ul); }
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  const footer = document.createElement('footer');
  footer.textContent = 'InfographAI — consistent visuals with your Gemini key. RO/EN/RU ready.';
  root.appendChild(footer);

  document.body.innerHTML = '';
  document.body.appendChild(root);
}

document.addEventListener('DOMContentLoaded', renderPage);
